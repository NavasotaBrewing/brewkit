let p = new Vue({
  el: '#procedures',
  components: {
    'main-navbar': NavBarComponent,
  },
  data: {
    procSelect: '',
    config: {},
    procs: [],
    proc: {},
    activeStep: {},
    showTitleInput: false,
    showCommentsInput: false,
    newProcName: '',
  },
  methods: {
    selectConfig(config) {
      this.config = config
    },

    activateStepCard() {
      activeClass = 'uk-background-primary uk-light'
      $('.step-card').removeClass(activeClass);
      $('#' + this.activeStep.id + 'Card').addClass(activeClass);
    },

    selectStep(step) {
      this.activeStep = step;
      setTimeout(() => {
        this.activateStepCard();
        $('#stepTitleInput').focus();
      }, 100);
    },

    selectProc(id) {
      if (id == "") {
        this.proc = {}
        return;
      }
      this.proc = this.procs.filter(p => p.id == id)[0]
    },

    saveProc() {
      if (!this.proc.id) {
        this.proc = {
          name: this.newProcName,
          id: guid(),
          steps: []
        }
      }
      $.ajax('/save_proc', {
        type: 'POST',
        data: JSON.stringify(this.proc),
        contentType: 'application/json',
        success: function(response) {
          console.log(response);
        }
      })
    },

    addStep() {
      if (this.proc.steps.length > 0) {
        prevStep = JSON.parse(JSON.stringify(this.proc.steps[this.proc.steps.length - 1]));
      } else {
        prevStep = {
          index: -1,
          config: this.config,
        }
      }
      step = {
        index: prevStep.index + 1,
        tools: {
          delay: {
            minutes: '',
            seconds: ''
          },
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
        stepId = card.id.slice(0, 36)
        this.proc.steps.forEach(step => {
          if (step.id == stepId) {
            step.index = index;
          }
        });
      })

    },
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

    $.get('/get_procs', (procs) => {
      this.procs = JSON.parse(procs);
    })
  }
})
