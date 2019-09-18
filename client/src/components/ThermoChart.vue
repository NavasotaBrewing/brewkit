<template>
  <div id="thermoChart">
    <div v-if="thermo.state == 1" class="uk-label uk-label-success">Heater is on</div>
    <div v-if="thermo.state == 0" class="uk-label uk-label-danger">Heater is off</div>
    <div class="uk-label">Current: {{ thermo.pv }}</div>
    <div class="uk-label uk-background-secondary">Target: {{ thermo.sv }}</div>

    <div id="thermoChartContainer" class="uk-height-medium">
      <canvas v-show="chart" class="thermo-chart" :id="thermo.id + 'Chart'"></canvas>
    </div>

    <!-- New SV Form -->
    <div class="uk-margin">
      <button @click="thermo.state = !thermo.state" class="uk-button enactor uk-button-primary">
        <i class="fa fa-power-off" aria-hidden="true"></i>&nbsp;Power
      </button>
      <div class="uk-inline">
        <a class="uk-form-icon uk-form-icon-flip" @click="setSv" uk-icon="icon: check"></a>
        <input
          v-model="newSv"
          :id="'newSv' + thermo.id"
          class="uk-input"
          @keydown.enter="setSv"
          type="text"
          placeholder="New SV"
        >
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Chart from 'chart.js'
export default {
  props: ["thermo"],
  data: function() {
    return {
      chart: false,
      newSv: ""
    };
  },
  methods: {
    registerChart() {
      this.chart = this.generateChart(this.thermo);
    },

    generateChart(thermo) {
      let el = document.getElementById(thermo.id + 'Chart')
      let ctx = el.getContext('2d')

      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: [moment.unix(moment().unix()).format('hh:mm:ss')],
          datasets: [{
            label: 'Target',
            data: [200],
            borderColor: 'rgba(0, 0, 0, 1)',
            spanGaps: true,
            borderWidth: 2
          }, {
            label: 'Current',
            data: [0],
            backgroundColor: 'rgba(37, 144, 242, 0.2)',
            borderColor: 'rgba(37, 144, 242, 1)',
            spanGaps: true,
            borderWidth: 2
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [{
              ticks:  {
                beginAtZero: true
              }
            }]
          }
        }
      })
    },

    updateChart() {
      // Current time in hh:mm:ss format
      let now = moment.unix(moment().unix()).format("hh:mm:ss");
      // Push time onto x axis
      this.chart.data.labels.push(now);

      let datasets = this.chart.data.datasets;
      if (this.chart.data.labels.length > 10) {
        this.chart.data.labels.shift();
      }

      datasets.forEach(s => {
        if (s.data.length > 10) {
          s.data.shift();
        }

        if (s.label == "Target") {
          s.data.push(this.thermo.sv);
        } else {
          s.data.push(this.thermo.pv);
        }
      });
      this.chart.update();
    },

    setSv() {
      this.thermo.sv = this.newSv;
      this.newSv = "";
      this.$emit("new-sv");
    }
  },
  mounted() {
    this.registerChart();
    this.chartUpdater = setInterval(() => {
      this.updateChart();
    }, 3000);
  }
};
</script>
