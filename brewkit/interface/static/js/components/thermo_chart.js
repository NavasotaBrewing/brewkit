var ThermoChartComponent = Vue.component('thermo-chart', {
  props: {
    thermo: {
      type: Object,
      required: true
    },
    'height': {
      type: String,
      default: 'uk-height-medium',
      validator: function (val) {
        return ['uk-height-small', 'uk-height-medium', 'uk-height-large'].indexOf(val) !== -1
      }
    },
    'update-interval': {
      type: Number,
      required: false,
      validator: function (val) {
        return (1000 < val && val < 10000)
      },
    }
  },
  data: function () {
    return {
      chart: false
    }
  },
  methods: {
    setSv() {
      newSv = parseFloat($('#newSv' + this.thermo.id).val())
      if (newSv > 0 && newSv < 999) {
        this.thermo.sv = newSv;
      }
    },
    registerChart() {
      this.chart = generateChart(this.thermo);
      this.chart.renderTo('#' + this.thermo.id + 'Chart');
    },
    updateChart() {
      data = this.chart.getData();
      if (data.length >= 40) {
        data.shift()
        data.shift()
      }
      data.push({ type: 'sv', time: moment().format('hh:mm:ss'), temp: this.thermo.sv })
      data.push({ type: 'pv', time: moment().format('hh:mm:ss'), temp: this.thermo.pv })
      // data.push({ type: 'sv', time: moment().format('hh:mm:ss'), temp: Math.random() * 200})
      // data.push({ type: 'pv', time: moment().format('hh:mm:ss'), temp: Math.random() * 200})
      this.chart.setData(data)
    }
  },
  mounted() {
    this.registerChart();
    this.chartUpdator = setInterval(() => {
      this.updateChart();
    }, this.updateInterval);
  },
  template: `
  <div :class="height">
    <div v-if="thermo.state == 1" class="uk-label uk-label-success">Heater is on</div>
    <div v-if="thermo.state == 0" class="uk-label uk-label-danger">Heater is off</div>
    <div class="uk-label">Current: {{ thermo.pv }}</div>
    <div class="uk-label uk-background-secondary">Target: {{ thermo.sv }}</div>

    <div v-show="chart" :id="thermo.id + 'Chart'" style="height: 100%; width: 100%"></div>

    <!-- New SV Form -->
    <div class="uk-margin">
      <button @click="thermo.state = !thermo.state" class="uk-button enactor uk-button-primary"><i class="fa fa-power-off"
          aria-hidden="true"></i>&nbsp;Power</button>
      <div class="uk-inline">
        <a class="uk-form-icon uk-form-icon-flip enactor" uk-icon="icon: check"></a>
        <input :id="'newSv' + thermo.id" class="uk-input" type="text" placeholder="New SV">
      </div>
    </div>
  </div>
  `
})


function generateChart(thermo) {
  now = moment().unix() - 8

  // Starting values
  data = [
    {
      type: 'sv',
      time: moment.unix(now).format('hh:mm:ss'),
      temp: 200
    },
    {
      type: 'pv',
      time: moment.unix(now).format('hh:mm:ss'),
      temp: 0
    },
    {
      type: 'sv',
      time: moment.unix(now + 4).format('hh:mm:ss'),
      temp: 100
    },
    {
      type: 'pv',
      time: moment.unix(now + 4).format('hh:mm:ss'),
      temp: 100
    },
    {
      type: 'sv',
      time: moment.unix(now + 8).format('hh:mm:ss'),
      temp: 0
    },
    {
      type: 'pv',
      time: moment.unix(now + 8).format('hh:mm:ss'),
      temp: 200
    }
  ]
  config = {
    guide: {
      interpolate: 'smooth-keep-extremum',
      showGridLines: 'xy',
      x: {
        padding: 20,
        label: 'Time'
      },
      y: { label: 'Temperature (F)', min: 50, max: 230 },
      showGridlines: 'x',
      color: {
        brewer: { 'pv': '#1D87F0', 'sv': '#222222' }
      }
    },
    plugins: [
      Taucharts.api.plugins.get('tooltip')({
        fields: ['time', 'temp'],
        formatters: {
          time: { label: "Time" },
          temp: {
            label: "Temperature",
            format: function (temp) {
              return (temp + " ˚F");
            }
          }
        }
      })
    ],
    data: data,
    type: 'line',
    x: 'time',
    y: 'temp',
    color: 'type',
  }

  chart = new Taucharts.Chart(config)

  chart.thermoId = thermo.id
  return chart
}

