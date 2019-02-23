<template>
  <div id="mobileThermoChart">
    <div id="chartContainer">
      <canvas v-show="chart" :id="thermo.id + 'MobileChart'"></canvas>
    </div>
    <button @click="thermo.state = Math.abs(thermo.state - 1)" class="uk-button uk-button-small enactor uk-button-primary">Power</button>
    <div class="uk-label" :class="{ 'uk-label-success': thermo.state, 'uk-label-danger': !thermo.state}">
      Heater: {{ thermo.states[thermo.state ? 1 : 0] }}
    </div>
    <div class="uk-label uk-background-primary">
      Current: {{ thermo.pv }}
    </div>
    <div class="uk-label uk-background-secondary">
      Target: {{ thermo.sv }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileThermoChart',
  props: ['thermo'],
  data: function() {
    return {
      chart: null,
      updater: null
    }
  },
  methods: {
    generateChart(thermo) {
      let ctx = document.getElementById(thermo.id + "MobileChart").getContext("2d");
      let data = {
        labels: ["Temperature"],
        datasets: [
          {
            label: "Current",
            data: [50],
            backgroundColor: 'rgba(37, 144, 242, 0.2)'
          },
          {
            label: "Target",
            data: [50],
            borderColor: 'rgba(0, 0, 0, 0.6)',
          }
        ]
      };

      this.chart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              barPercentage: 1
            }]
          },
        }
      });
    },

    updateChart() {
      this.chart.data.datasets.forEach(set => {
        if (set.label == 'Current') {
          set.data = [this.thermo.pv]
        } else {
          set.data = [this.thermo.sv]
        }
      });
      this.chart.update();
    },
  },
  mounted() {
    this.generateChart(this.thermo);
    this.updater = setInterval(() => {
      this.updateChart()
    }, 3000);
  }
}
</script>

<style>
  #chartContainer {
    height: 350px;
  }
</style>
