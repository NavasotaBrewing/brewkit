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
    configs: [],
    timerInput: ''
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

    stopTimer() {
      UIkit.countdown($('#timerCountdown')).stop();

    },

    startTimer() {
      date = this.inputToISO(this.timerInput);
      this.timer = UIkit.countdown($('#timerCountdown'), {date: date});
      this.timer.start();
      this.timerInput = ''
    },

    inputToISO(str) {
      times = str.split(':')
      hours = parseInt(times[0])
      minutes = parseInt(times[1])
      seconds = parseInt(times[2])

      now = moment().unix()
      now += hours * 3600
      now += minutes * 60
      now += seconds

      iso = moment(now * 1000).format()
      console.log(iso)
      return iso
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

