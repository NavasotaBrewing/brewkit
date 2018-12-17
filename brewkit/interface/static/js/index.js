let x = new Vue({
  el: '#dashboard',
  data: {
    config: {
      controllers: {
        'STR116': [],
        'STR008': [],
        'OmegaCN7500': []
      },
      devices: {
        'onOff': [],
        'divert': [],
        'variable': [],
        'pump': [],
        'thermostat': [],
      }
    },
    configurationSelect: null,
    slackMessage: '',
    configs: []
  },
  methods: {
    update() {
      socket.emit('update', this.config, function (response) {
        console.log('updated')
        x.config = JSON.parse(response.replace(/\'/g, '"'));
      });
    },

    enact() {
      socket.emit('enact', this.config, function (response) {
        console.log('enacted');
      });
    },

    showToast(message) {
      UIkit.notification({ message: message, status: 'success', pos: 'bottom-left', timeout: 50000000})
    },

    sendSlackMessage() {
      sendInSlack(this.slackMessage, this.config.slackWebhook);
      x.slackMessage = ''
    }
  },
  watch: {
    configurationSelect: function () {
      if (this.configurationSelect != 'Select a Configuration') {
        this.config = this.configs.filter(x => x.name == this.configurationSelect)[0];
      } else {
        this.config = []
      }
    }
  },
  mounted() {
    socket.emit('get_configurations', function (configs) {
      x.configs = JSON.parse(configs);
    });
  },
  updated: function() {
  }
})

