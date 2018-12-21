let x = new Vue({
  el: '#dashboard',
  data: {
    user: {},
    configSelected: false,
    charts: [],
    config: {
      devices: []
    },
    configurationSelect: null,
    slackMessage: '',
    configs: [],
    timerInput: '',
    timer: null,
    sendWhenDone: false
  },
  components: {
    'main-navbar': NavBarComponent,
  },
  methods: {
    update() {
      socket.emit('update', this.config, (response) => {
        this.config = JSON.parse(response.replace(/\'/g, '"'));
      });
      this.refreshCharts();
    },

    enact() {
      socket.emit('enact', this.config, (response) => {
        this.update();
      });
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
      this.timerWatcher = setInterval(() => {
        if (moment().unix() * 1000 >= this.timer.date) {
          if (this.sendWhenDone) {
            if (this.slackMessage) {
              this.sendSlackMessage();
            }
          }
          clearInterval(this.timerWatcher)
        }
      }, 5000);
    },

    inputToISO(str) {
      // Takes an input like 02:34:31 and converts it to an ISO 8601 date with that time added to the current time
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
      UIkit.notification({ message: message, status: 'success', pos: 'bottom-left', timeout: 3000})
    },

    setSv(thermo) {
      newSv = parseFloat($('#newSv' + thermo.id).val());
      if (newSv < 999 && newSv > 1) {
        thermo.sv = newSv;
        this.enact();
      }

      return false;
    },

    sendSlackMessage() {
      sendInSlack(this.slackMessage, this.config.slackWebhook);
      this.showToast('Message Sent');
      this.slackMessage = ''
    },

    registerEnactors() {
      this.enactors = $('.enactor')
      this.enactors.on('click', () => {
        this.enact();
      })
    },

    refreshCharts() {
      this.charts.forEach(chart => {
        thermo = this.thermos.filter(t => t.id == chart.thermoId)[0];
        data = chart.getData();
        if (data.length >= 40) {
          data.shift()
          data.shift()
        }
        data.push({ type: 'sv', time: moment().format('hh:mm:ss'), temp: thermo.sv})
        data.push({ type: 'pv', time: moment().format('hh:mm:ss'), temp: thermo.pv})
        // Random numbers as a demo
        // data.push({ type: 'sv', time: moment().format('hh:mm:ss'), temp: Math.random() * 200})
        // data.push({ type: 'pv', time: moment().format('hh:mm:ss'), temp: Math.random() * 200})
        chart.setData(data)
      });
    },

    registerThermoCharts() {
      this.unregisterOldCharts();
      this.config.devices.filter(d => d.type == 'thermostat').forEach(thermo => {
        chart = generateChart(thermo)

        this.charts.push(chart)

        chart.renderTo('#' + thermo.id + 'Chart');
      });
    },

    unregisterOldCharts() {
      this.charts.forEach(chart => {
        chart.destroy();
      });
      this.charts = [];
    },

    selectConfig(config) {
      this.config = config;
      Vue.nextTick()
        .then(() => {
          this.registerEnactors();
          this.registerThermoCharts();
        })

      this.update();
      this.configUpdater = setInterval(() => {
        this.update();
      }, 3000);
    }
  },
  watch: {

  },
  computed: {
    done: function () {
      if (!this.timer) return true;
      if (this.timer.date <= moment().unix() * 1000) {
        return true;
      }
      return false;
    },
    valves: function () {
      valves = this.config.devices.filter(d => d.type != 'thermostat')
      return valves
    },
    thermos: function () {
      return this.config.devices.filter(d => d.type == 'thermostat')
    }
  },
  mounted() {
    this.user = JSON.parse(Cookies.get('user'))
  }
})
