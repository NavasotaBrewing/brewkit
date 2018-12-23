test_proc = {
  name: "first proc",
  id: guid(),
  steps: [
    {
      index: 0,
      tools: {
        delay: {
          minutes: '',
          seconds: ''
        },
      },
      name: 'Start',
      id: guid(),
      comments: 'Just the first step.',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    }
  ]
}


let p = new Vue({
  el: '#procedures',
  components: {
    'main-navbar': NavBarComponent,
  },
  data: {
    procSelect: '',
    config: {},
    procs: [test_proc],
    proc: test_proc,
    activeStep: {},
    showTitleInput: false,
    showCommentsInput: false
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
      if (id == '') {
        this.proc = {}
      }
      this.proc = this.procs.filter(p => p.id == id)[0]
    },

    saveProc() {
      console.log('saved')
    },

    addStep() {
      prevStep = JSON.parse(JSON.stringify(this.proc.steps[this.proc.steps.length - 1]));
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
  }
})
