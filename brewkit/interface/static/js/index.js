let x = new Vue({
  el: '#dashboard',
  data: {
    user: {},
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
    timerInput: '',
    timer: null
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
      this.timer.stop();
      this.timer.date = moment().unix() * 1000;
    },

    prepInput() {
      if (this.timerInput == '') {
        return '00:00:00';
      }

      if (this.timerInput.length <= 2) {
        return "00:" + this.timerInput + ":00"
      }

      if (this.timerInput.length <= 5) {
       return "00:" + this.timerInput;
      }


      return this.timerInput;
    },

    startTimer() {
      input = this.prepInput();
      date = this.inputToISO(input);
      this.timer = UIkit.countdown($('#timerCountdown'), {date: date});
      this.timer.start();
      this.timerInput = ''
    },

    inputToISO(str) {
      // Takes an input like 02:34:31 and converts it to an ISO 8601 date with that time added to the current time
      console.log(str)
      times = str.split(':')
      hours = parseInt(times[0])
      minutes = parseInt(times[1])
      seconds = parseInt(times[2])

      now = moment().unix()
      now += hours * 3600
      now += minutes * 60
      now += seconds

      iso = moment(now * 1000).format()
      return iso
    },

    showToast(message) {
      UIkit.notification({ message: message, status: 'success', pos: 'bottom-left', timeout: 50000000})
    },

    sendSlackMessage() {
      sendInSlack(this.slackMessage, this.config.slackWebhook);
      this.showToast('Message Sent');
      x.slackMessage = ''
    }
  },
  computed: {
    done: function () {
      if (!this.timer) return true;
      if (this.timer.date <= moment().unix() * 1000) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    // this.config = navbar.config
    this.user = JSON.parse(Cookies.get('user'))
  }
})

