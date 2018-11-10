TempChartComponent = Vue.component('temp-chart', {
  // Note: temps are stored on the chart object, NOT the thermo object
  props: ['thermo'],
  data() {
    return {
      // This is for performance enhancement
      showChart: true,
      updateInterval: 20
    }
  },
  mounted() {
    this.init();
    this.updater = setInterval(() => {
      this.updateThermo(this.thermo);
    }, this.updateInterval * 1000);
  },
  watch: {
    updateInterval: function () {
      clearInterval(this.updater);
      if (this.updateInterval == 0) {
        return;
      }
      this.updater = setInterval(() => {
        this.updateThermo(this.thermo);
      }, this.updateInterval * 1000)
    }
  },
  methods: {
    init() {
      this.chart = this.newChart('thermo' + this.thermo.address + 'Chart')
      this.updateThermo(this.thermo);
    },
    updateThermo(thermo) {
      axios.post('/thermo-temps', {
        thermo: this.thermo
      }).then(response => {
        // Add the returned data
        this.addData(this.chart, response.data);
      }).catch(error => {
        console.log(error);
      })
    },
    newChart(elementId) {
      // Returns a new Chart (Chart.js)
      el = document.getElementById(elementId)
      var ctx = el.getContext('2d');

      var chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: 'Current Temp',
              data: [],
              tempType: 'pv',
              backgroundColor: colors.invisible,
              borderColor: colors.redBorder,
              borderWidth: 2
            },
            {
              label: 'Target Temp',
              data: [],
              tempType: 'sv',
              backgroundColor: colors.invisible,
              borderColor: colors.blueBorder,
              borderWidth: 2
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }],
            xAxes: [{
              type: 'time',
              time: {
                displayFormats: {
                  'millisecond': 'hh:mm',
                  'second': 'hh:mm',
                  'minute': 'hh:mm',
                  'hour': 'hh:mm',
                  'day': 'hh:mm',
                  'week': 'hh:mm',
                  'month': 'hh:mm',
                  'quarter': 'hh:mm',
                  'year': 'hh:mm',
                }
              }
            }]
          },
          elements: {
            line: {
              tension: 0.1
            }
          }
        }
      });
      return chart;
    },
    addData(chart, data) {
      chart.data.datasets.forEach((dataset) => {
        if (dataset.data.length > 0) {
          dataset.data = dataset.data.slice(Math.max(dataset.data.length - 20, 0))
        }
        if (dataset.tempType == 'pv') {
          dataset.data.push(data.new_pv);
        }

        if (dataset.tempType == 'sv') {
          dataset.data.push(data.new_sv);
        }
      });
      chart.update();
      this.$forceUpdate();
    },
    current(tempType) {
      // This is ungodly
      // Get's the latest PV
      try {
        data = this.chart.data.datasets.filter(x => x.tempType == tempType)[0].data;
        return data[data.length - 1]['y'];
      } catch (error) {
        return '';
      }

    }
  },
  template: `
    <div class="mdl-card colored-card--bluegrey full-width mdl-shadow--2dp">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">{{ thermo.name }}</h2>
      </div>
      <div class="mdl-card__supporting-text">
      <div class="mdl-grid">
        <div class="mdl-cell--6-col mdl-cell--2-col-phone mdl-cell--2-col-tablet">
          <temp-reading label="Current" :value="current('pv')"></temp-reading>
        </div>
        <div class="mdl-cell--6-col mdl-cell--2-col-phone mdl-cell--2-col-tablet">
          <temp-reading label="Target" :value="current('sv')"></temp-reading>
        </div>
        </div>
        <template class="mdl-cell mdl-cell--hide-phone">
          <div class="temp-chart-container">
            <canvas :id="'thermo' + thermo.address + 'Chart'"></canvas>
          </div>
          <h6>Update Interval</h6>
          <input :id="'updateIntervalvalSlider' + thermo.address" v-model="updateInterval" class= "mdl-slider mdl-js-slider" type="range" min="0" max="20" value="2" tabindex="0" >
          <div class="mdl-tooltip mdl-tooltip--large mdl-tooltip--top" :for="'updateIntervalvalSlider' + thermo.address">
            {{ updateInterval }} seconds
          </div>
        </template>
      </div>
      <div class="mdl-card__menu">
        <button class="mdl-button mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons thermo-power-button">power_settings_new</i>
        </button>
      </div>
    </div>
  `
});

TempReading = Vue.component('temp-reading', {
  props: ['label', 'value'],
  template: `
    <div class="temp-reading">
      <div class="temp-reading-label mdl-card__title-text">
        {{ label }}
      </div>
      <div class="mdl-card__title-text">
        {{ value }}˚F
      </div>
    </div>
  `
});

MainHeaderComponent = Vue.component('main-header', {
  props: ['title'],
  data() {
    return {
      // Don't delete this
      componentName: 'main-header',
      configs: [],
      configurationSelect: '',
    }
  },
  methods: {
  },
  watch: {
    configurationSelect: function () {
      if (configurationSelect != '') {
        this.$emit('select-config', this.configs.filter(x => x.name == this.configurationSelect)[0]);
      }
    }
  },
  mounted() {
    socket.emit('get_configurations', function (response) {
      for (let i = 0; i < x.$children.length; i++) {
        const child = x.$children[i];
        if (child.componentName == 'main-header') {
          child.configs = JSON.parse(response)
          break;
        }
      }
    });
  },
  template: `
    <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{ title }}</span>
        <div class="mdl-layout-spacer"></div>
        <div id="configurationSelectContainer" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <select v-model="configurationSelect" class="mdl-textfield__input" id="configurationSelect" name="configurationSelect">
            <option v-for="config in configs" :value="config.name">{{ config.name }}</option>
          </select>
          <label class="mdl-textfield__label" for="configurationSelect">Configuration</label>
        </div>
      </div>
    </header>
  `
})

DrawerComponent = Vue.component('drawer', {
  template: `
  <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
    <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
      <a class="mdl-navigation__link" href="/dashboard">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Dashboard</a>
      <a class="mdl-navigation__link" href="/configure">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">build</i>Configure</a>
      <a class="mdl-navigation__link" href="/procedures">
        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">sort</i>Procedures</a>
    </nav>
  </div>
  `
})

TimerComponent = Vue.component('timer', {
  data() {
    return {
      sendWhenDone: false,
      timer: null,
      timeRemaining: 'Done.',
      overflow: '',
      overflowTimer: null,
      shaking: false,
      hourInput: '',
      minuteInput: '',
      secondInput: '',
    }
  },
  computed: {
    timerInput: function () {
      // r/badcode
      times = [this.hourInput, this.minuteInput, this.secondInput];
      timeString = '';
      times.forEach(time => {
        if (time.length == 1) {
          timeString += '0' + time;
        } else if (time.length == 2) {
          timeString += time;
        } else if (time.length > 2) {
          timeString += time.substr(0, 2);
        } else {
          timeString += '00';
        }
      });
      timeString = timeString.substr(0, 4) + ':' + timeString.substr(4);
      timeString = timeString.substr(0, 2) + ':' + timeString.substr(2);

      return timeString;
    }
  },
  mounted() {
    this.timer = new Tock({
      countdown: true,
      interval: 1000,
      callback: this.tick,
      complete: this.timerDone,
    });
  },
  methods: {
    resetInputs() {
      this.hourInput = '';
      this.minuteInput = '';
      this.secondInput = '';
    },
    startTimer() {
      if (this.timerInput == '00:00:00') {
        this.resetInputs();
        return;
      }
      this.timer.start(this.timerInput);
      this.resetInputs();
    },
    pauseTimer() {
      if (this.timeRemaining == 'Done.') {
        return false;
      }
      times = this.timeRemaining.split(':');
      this.hourInput = times[0]
      this.minuteInput = times[1]
      this.secondInput = times[2]
      this.timer.stop();
    },
    resetTimer() {
      if (this.overflowTimer) {
        this.overflowTimer.stop();
        this.overflow = '';
      }
      this.timer.stop()
      this.timeRemaining = 'Done.';
      this.resetInputs();
    },
    timerDone() {
      this.$emit('timer-finish', this.sendWhenDone);
      this.shaking = true;
      this.overflowTimer = new Tock({
        callback: this.overflowTick
      });
      this.overflowTimer.start();
    },
    tick() {
      // Tick of the timer (Tock callback)
      this.timeRemaining = this.timer.msToTimecode(this.timer.lap());
    },
    overflowTick() {
      this.overflow = "+" + this.overflowTimer.msToTimecode(this.overflowTimer.lap());
    }
  },

  template: `
    <div class="full-width mdl-card mdl-shadow--2dp" @mouseover="shaking = false" :class="{ 'shake shake-constant': shaking, }">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text ">
          {{ timeRemaining }}
        </h2>
        <div class="mdl-layout-spacer"></div>
        <h2 class="mdl-card__title-text ">
          {{ overflow }}
        </h2>
      </div>
      <div class="mdl-card__supporting-text">
        <div class="mdl-grid">
          <div class= "timerInputCell mdl-cell--3-col">
            <div class="timer-input-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input @keydown.enter="startTimer" v-model="hourInput" class="mdl-textfield__input" pattern="-?[0-9]*(\.[0-9]+)?" type="text" id="hourInput">
              <label class="mdl-textfield__label" for="hourInput">Hours</label>
              <span class="mdl-textfield__error">Needs to be a number</span>
            </div>
          </div>
          <div class="timerInputCell mdl-cell--3-col">
            <div class="timerInputCell timer-input-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input @keydown.enter="startTimer" v-model="minuteInput" class="mdl-textfield__input" pattern="-?[0-9]*(\.[0-9]+)?" type="text" id="minuteInput">
              <label class="mdl-textfield__label" for="minuteInput">Minutes</label>
              <span class="mdl-textfield__error">Needs to be a number</span>
            </div>
          </div>
          <div class="timerInputCell mdl-cell--3-col">
            <div class="timerInputCell timer-input-field mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input @keydown.enter="startTimer" v-model="secondInput" class="mdl-textfield__input" pattern="-?[0-9]*(\.[0-9]+)?" type="text" id="secondInput">
              <label class="mdl-textfield__label" for="secondInput">Seconds</label>
              <span class="mdl-textfield__error">Needs to be a number</span>
            </div>
          </div>
        </div>
      </div>
        <div class="mdl-card__actions mdl-card--border">
          <a @click="startTimer" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">play_arrow</i>
          </a>
          <a @click="pauseTimer" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">pause</i>
          </a>
          <a @click="resetTimer" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
            Clear
          </a>
        </div>
      </div>
    `
})

SlackCard = Vue.component('slack', {
  props: ['webhook', 'channel'],
  data() {
    return {
      slackMessage: '',
      sendWhenDone: false,
    }
  },
  watch: {
    sendWhenDone: function() {
      this.$emit('send-when-done', this.sendWhenDone);
    }
  },
  methods: {
    sendSlackMessage(checked = true) {
      // Checked is the checkbox in the timer
      if (!checked) return;

      if (this.slackMessage == '') {
        return false;
      }

      const options = {
        text: this.slackMessage,
      };

      axios.post(this.webhook, JSON.stringify(options))
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

      this.slackMessage = '';
    },
    openSlack() {
      window.open('https://navasotabrewing.slack.com/', '_blank');
    },
  },
  template: `
    <div class="full-width mdl-card mdl-shadow--2dp">
      <div id="slackCardTitle" class="mdl-card__title">
        <h2 class="mdl-card__title-text">Slack</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <p v-show="channel" class="info">Posting to:
          <code>{{ channel }}</code>
        </p>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <textarea :disabled="!webhook" v-model="slackMessage" class="mdl-textfield__input" type="text" rows="3" id="slackMessage"></textarea>
          <label v-if="webhook" class="mdl-textfield__label" for="slackMessage">Slack Message</label>
          <label v-else class="mdl-textfield__label" for="slackMessage">Select a configuration first</label>
        </div>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a @click="sendSlackMessage" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">send</i>
          Send
        </a>
      </div>
      <div class="mdl-card__menu">
        <button id="slackLink" @click="openSlack" class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"></button>
        <div class="mdl-tooltip mdl-tooltip--large mdl-tooltip--left" for="slackLink">
          navasotabrewing.slack.com
        </div>
      </div>
    </div>
  `
})

ToolItemList = Vue.component('tool-item-list', {
  props: ['tools'],
  template: `
    <table class="mdl-data-table full-width mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Item</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tool in tools" @click="$emit('clicked', Object.assign(tool))">
          <td class="mdl-data-table__cell--non-numeric">{{ tool.name }}</td>
          <td>{{ tool.proc_desc }}</td>
        </tr>
      </tbody>
    </table>
  `
})

ThermoInput = Vue.component('thermo-input', {
  props: ['thermo'],
  methods: {
    id() {
      return this.thermo.controller_address + '-' + this.thermo.address;
    }
  },
  template: `
    <div style="width: 200px" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input v-model="thermo.newTemp" class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" :id="id(thermo) + 'NewTemp'">
      <label class="mdl-textfield__label" :for="id(thermo) + 'NewTemp'">New Temp</label>
      <span class="mdl-textfield__error">Needs to be a number</span>
    </div>
  `
})

ToolInput = Vue.component('tool-input', {
  props: ['tool'],
  methods: {
    id() {
      return this.tool.id + 'Input';
    },
  },
  // This pattern on the input is a nightmare
  template: `
    <div style="width: 200px" v-if="tool.name != 'Wait'" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input v-model="tool.value" :pattern="tool.name == 'Sleep' ? '\\\\d\\\\d:\\\\d\\\\d:\\\\d\\\\d' : '.+'" class="mdl-textfield__input" type="text" :id="id">
      <label class="mdl-textfield__label" :for="id">Value</label>
      <span class="mdl-textfield__error">Needs to be in the format 00:00:00</span>
    </div>
  `
});

OnOffState = Vue.component('on-off-state', {
  props: ['device', 'id', 'modifiable'],
  computed: {
    newState() {
      return this.device.newState;
    }
  },
  watch: {
    newState() {
      this.$emit('update', this.device)
    }
  },
  template: `
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" :for="id">
      <input v-model="device.newState" :disabled="!modifiable" type="checkbox" :id="id" class="mdl-switch__input" checked>
    </label>
  `
})

DivertState = Vue.component('divert-state', {
  props: ['device', 'id', 'modifiable'],
  computed: {
    newState() {
      return this.device.newState;
    }
  },
  watch: {
    newState() {
      this.$emit('update', this.device)
    }
  },
  template: `
    <div style="width: 75px;" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <select v-model="device.newState" :disabled="!modifiable" class="mdl-textfield__input" :id="id">
        <option value="0">{{ device.states[0] }}</option>
        <option value="1">{{ device.states[1] }}</option>
      </select>
      <label class="mdl-textfield__label" :for="id">Location</label>
    </div>
  `
})

VariableState = Vue.component('variable-state', {
  props: ['device', 'id', 'modifiable'],
  computed: {
    newState() {
      return this.device.newState;
    }
  },
  watch: {
    newState() {
      this.$emit('update', this.device)
    }
  },
  template: `
    <div class="mdl-textfield variable-valve-state mdl-js-textfield mdl-textfield--floating-label">
      <input v-model="device.newState" :disabled="!modifiable" class="mdl-textfield__input" pattern="-?[0-9]*(\.[0-9]+)?" type="tel" :id="id">
      <label class="mdl-textfield__label" :for="id">State (%)</label>
      <span class="mdl-textfield__error">Needs to be a number</span>
    </div>
  `
})

DeviceState = Vue.component('device-state', {
  props: ['device', 'id', 'modifiable'],
  template: `
    <div>
      <on-off-state   @update="$emit('update', $event)" v-if="device.type == 'onOff'"      :id="id" :modifiable="modifiable" :device="device"></on-off-state>
      <divert-state   @update="$emit('update', $event)" v-if="device.type == 'divert'"     :id="id" :modifiable="modifiable" :device="device"></divert-state>
      <variable-state @update="$emit('update', $event)" v-if="device.type == 'variable'"   :id="id" :modifiable="modifiable" :device="device"></variable-state>
      <on-off-state   @update="$emit('update', $event)" v-if="device.type == 'pump'"       :id="id" :modifiable="modifiable" :device="device"></on-off-state>
    </div>
  `
})

DeviceControlTable = Vue.component('device-control-table', {
  props: ['devices', 'modifiable'],
  methods: {
    id(device) {
      return device.controller_address + '-' + device.address + 'State'
    },
    clicked(device) {
      if (!this.modifiable) {
        this.$emit('clicked', device)
      }
    }
  },
  template: `
    <table class="mdl-data-table full-width mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">Name</th>
          <th v-if="modifiable" class="mdl-data-table__cell--non-numeric">State</th>
          <th v-if="modifiable" class="mdl-data-table__cell--non-numeric">New State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" @click="clicked(device)">
          <td class="mdl-data-table__cell--non-numeric device-table-label">{{ device.name }}</td>
          <td v-if="modifiable" class="mdl-data-table__cell--non-numeric device-table-label">
            {{ device.states[device.state] }}
          </td>
          <td v-if="modifiable" class="mdl-data-table__cell--non-numeric">
            <device-state @update="$emit('update', $event)" :id="id(device)" :modifiable="modifiable" :device="device"></device-state>
          </td>
        </tr>
      </tbody>
    </table>
  `
})

AllDevicesTabs = Vue.component('devices', {
  props: ['devices', 'modifiable'],
  template: `
    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
      <div class="mdl-tabs__tab-bar">
        <a href="#OnOff-panel" class="mdl-tabs__tab is-active">On/Off</a>
        <a href="#divert-panel" class="mdl-tabs__tab">Diverts</a>
        <a href="#variable-panel" class="mdl-tabs__tab">Variables</a>
        <a href="#pump-panel" class="mdl-tabs__tab">Pumps</a>
      </div>
      <br>
      <div class="mdl-tabs__panel is-active" id="OnOff-panel">
        <device-control-table @clicked="$emit('clicked', $event)" @update="$emit('update', $event)" :modifiable="modifiable" :devices="devices.onOff"></device-control-table>
      </div>
      <div class="mdl-tabs__panel" id="divert-panel">
        <device-control-table @clicked="$emit('clicked', $event)" @update="$emit('update', $event)" :modifiable="modifiable" :devices="devices.divert"></device-control-table>
      </div>
      <div class="mdl-tabs__panel" id="variable-panel">
        <device-control-table @clicked="$emit('clicked', $event)" @update="$emit('update', $event)" :modifiable="modifiable" :devices="devices.variable"></device-control-table>
      </div>
      <div class="mdl-tabs__panel" id="pump-panel">
        <device-control-table @clicked="$emit('clicked', $event)" @update="$emit('update', $event)" :modifiable="modifiable" :devices="devices.pump"></device-control-table>
      </div>
    </div>
  `
})
