let p = new Vue({
  el: '#procedures',
  components: {
    'main-navbar': NavBarComponent,
  },
  data: {
    // Id of the selected proc
    procSelect: '',
    // All the configs
    configs: [],
    // All the procs
    procs: [],
    // Current active Proc
    proc: {},
    // Active step, one of  this.proc.steps
    activeStep: {},
    // Show title input
    showTitleInput: false,
    // Show comment input
    showCommentsInput: false,
    // New proc name
    newProcName: '',
  },
  methods: {
    activateStepCard() {
      activeClass = 'uk-background-primary uk-light'
      $('.step-card').removeClass(activeClass);
      $('#' + this.activeStep.id + 'Card').addClass(activeClass);
    },

    selectStep(step) {
      this.activeStep = step;
      this.$nextTick(() => {
        this.activateStepCard();
        $('#stepTitleInput').focus();
      })
    },

    selectProc(id) {
      if (id == "") {
        this.proc = {}
        return;
      }
      this.proc = this.procs.filter(p => p.id == id)[0]
      this.$nextTick(() => {
        this.proc.steps = this.proc.steps.sort(function(x, y) {return x.index - y.index})
      })
    },

    validateNewProc() {
      if (this.newProcName.length < 1) {
        toast('Enter a procedure name', 'danger')
        return false
      }

      if (!this.proc.baseConfig || this.proc.baseConfig == {}) {
        toast('Select a base configuration', 'danger')
        return false;
      }
      return true;
    },

    emptyProc() {
      if (!this.validateNewProc()) {
        return false;
      }
      return {
        name: this.newProcName,
        baseConfig: this.proc.baseConfig,
        id: guid(),
        steps: []
      }
    },

    saveProc() {
      if (this.proc.id) {
        // Update
        proc = this.proc;
      } else {
        // Save new
        proc = this.emptyProc();
        console.log(proc)
        if (!proc) return;
        this.procs.push(proc)
      }

      $.ajax('/save_proc', {
        type: 'POST',
        data: JSON.stringify(proc),
        contentType: 'application/json',
        success: (response) => {
          toast(response)
          this.proc = proc;
        }
      })
    },

    addStep() {
      if (this.proc.steps.length > 0) {
        prevStep = JSON.parse(JSON.stringify(this.proc.steps[this.proc.steps.length - 1]));
      } else {
        prevStep = {
          index: -1,
          config: this.proc.baseConfig,
        }
      }
      step = {
        index: prevStep.index + 1,
        tools: {
          delay: {
            minutes: '',
            seconds: ''
          },
          slack: {
            message: ''
          },
          watch: {
            thermo: ''
          }
        },
        name: '',
        id: guid(),
        comments: '',
        config: prevStep.config
      };

      this.proc.steps.push(step);

      this.showCommentsInput = true;
      this.showTitleInput = true;

      this.selectStep(step);
    },

    reindex() {
      cards = this.sortable.children()
      cards.each((index, card) => {
        stepId = card.id.slice(0, 36);
        this.proc.steps.forEach(step => {
          if (step.id == stepId) {
            step.index = index;
          }
        });
      });
      this.proc.steps = this.proc.steps.sort(function(x, y) {return x.index > y.index})

    },

    removeStep(step) {
      this.proc.steps = this.proc.steps.filter(s => s.id != step.id)
      this.activeStep = {};
    },

    deleteProc() {
      if (confirm("Are you sure? This can't be undone")) {
        $.ajax('/delete_proc', {
          type: 'POST',
          data: JSON.stringify(this.proc.id),
          contentType: 'application/json',
          success: function(response) {
            toast(response)
          }
        })
        this.procs = this.procs.filter(p => p.id != this.proc.id);
        this.activeStep = {}
        this.proc = {};
        this.procSelect = ''
      }
    }
  },
  computed: {
    procedureSelected: function() {
      if (this.proc.id) return true;
      return false;
    }
  },
  watch: {
    procSelect: function() {
      this.selectProc(this.procSelect);
    }
  },
  mounted() {
    this.sortable = $('#stepCardColumn').on('moved', () => {
      this.reindex();
    })

    socket.emit('get_configurations', (configs) => {
      this.configs = JSON.parse(configs);
    });


    $.get('/get_procs', (procs) => {
      this.procs = JSON.parse(procs);
    })
  }
})
