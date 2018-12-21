test_proc = {
  name: "first proc",
  id: guid(),
  steps: [
    {
      index: 0,
      name: 'Start',
      id: guid(),
      comments: 'Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. Just the first step. ',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 1,
      name: 'First Step',
      id: guid(),
      comments: 'Closes the HLT Valve',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 2,
      name: 'Set sparge temp',
      id: guid(),
      comments: 'Sets the sparge temp to 173',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 0,
      name: 'Start',
      id: guid(),
      comments: 'Just the first step',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 1,
      name: 'First Step',
      id: guid(),
      comments: 'Closes the HLT Valve',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 2,
      name: 'Set sparge temp',
      id: guid(),
      comments: 'Sets the sparge temp to 173',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 0,
      name: 'Start',
      id: guid(),
      comments: 'Just the first step',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 1,
      name: 'First Step',
      id: guid(),
      comments: 'Closes the HLT Valve',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 2,
      name: 'Set sparge temp',
      id: guid(),
      comments: 'Sets the sparge temp to 173',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 0,
      name: 'Start',
      id: guid(),
      comments: 'Just the first step',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 1,
      name: 'First Step',
      id: guid(),
      comments: 'Closes the HLT Valve',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 2,
      name: 'Set sparge temp',
      id: guid(),
      comments: 'Sets the sparge temp to 173',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 0,
      name: 'Start',
      id: guid(),
      comments: 'Just the first step',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 1,
      name: 'First Step',
      id: guid(),
      comments: 'Closes the HLT Valve',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    },
    {
      index: 2,
      name: 'Set sparge temp',
      id: guid(),
      comments: 'Sets the sparge temp to 173',
      config: JSON.parse('{"id":"k2gweii8hwerwktt1birnb","name":"Complete","slackWebhook":"https://hooks.slack.com/services/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","slackChannel":"@luke","devices":[{"name":"HLT Valve","controller_address":"2","state":1,"address":"0","type":"onOff","id":"kebi2wrtr1tiw8ikbghwen","states":{"0":"Closed","1":"Open"}},{"name":"HLT Divert","controller_address":"2","state":0,"address":"1","type":"divert","id":"iwieb81ktkbwrwi2nrehgt","states":{"0":"Boil","1":"Mash"}},{"name":"RIMS Divert","controller_address":"2","state":1,"address":"2","type":"divert","id":"gwbnkreerk8iwi12withbt","states":{"0":"Boil","1":"RIMS"}},{"name":"RIMS Pump","controller_address":"2","state":1,"address":"3","type":"pump","id":"rwtiebb2iwwtikk1nreg8h","states":{"0":"Off","1":"On"}},{"name":"RIMS Thermostat","controller_address":"1","state":0,"address":"","type":"thermostat","id":"kwn8ehikir1riwgwtteb2b","states":{"0":"Off","1":"On"},"sv":150,"pv":112.8}]}')
    }
  ]
}


let proc = new Vue({
  el: '#procedures',
  components: {
    'main-navbar': NavBarComponent,
  },
  data: {
    procSelect: '',
    procs: [test_proc],
    proc: test_proc,
    step: {}
  },
  methods: {
    selectConfig(config) {
      this.config = config
    },

    activateStepCard(step) {
      activeClass = 'uk-background-primary uk-light'
      $('.step-card').removeClass(activeClass);
      $('#' + step.id + 'Card').addClass(activeClass);
    },

    selectStep(step) {
      this.step = step;
      this.activateStepCard(step);
    },

    selectProc(id) {
      if (id == '') {
        this.proc = {}
      }
      this.proc = this.procs.filter(p => p.id == id)[0]
    },

    saveProc() {
      console.log('saved')
    }
  },
  watch: {
    procSelect: function() {
      this.selectProc(this.procSelect);
    }
  }
})
