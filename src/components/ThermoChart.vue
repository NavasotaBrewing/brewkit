<template>
  <div id="thermoChart">
    <canvas :id="chartId()"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: ["thermo"],
  data: function() {
    return {
      chart: {}
    };
  },

  mounted() {
    this.registerChart();
    this.updateChart();

    setInterval(() => {
      this.updateChart();
    }, 2000);

    window.chart = this;
  },

  methods: {
    chartId() {
      return "ThermoChart" + this.thermo.id;
    },

    now() {
      return new Date().toTimeString().split(' ')[0];
    },

    updateChart() {
      let limit = 10;

      let labels = this.chart.data.labels;
      this.chart.data.labels.push(this.now());
      if (labels.length == limit) {
        labels.shift();
      }
      this.chart.data.datasets.forEach(set => {
        if (set.data.length == limit) {
          set.data.shift();
        }

        if (set.label == "Process Value") {
          // set.data.push(this.thermo.pv);
          set.data.push(Math.random() * 100);
        }

        if (set.label == "Setpoint Value") {
          // set.data.push(this.thermo.sv);
          set.data.push(Math.random() * 100);
        }
      });

      this.chart.update();
    },

    registerChart() {
      var ctx = document.getElementById(this.chartId()).getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [this.now()],
          datasets: [
            {
              data: [100],
              label: "Process Value",
              borderColor: "#3e95cd",
              fill: false
            },
            {
              data: [100],
              label: "Setpoint Value",
              borderColor: "#8e5ea2",
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 3,
          title: {
            display: true,
            text: "Temperatures (F)"
          },
          scales: {
            yAxes: [
              {
                display: true,
                ticks: {
                  suggestedMin: 0,
                }
              }
            ]
          }
        }
      });
      this.chart = myChart;
    }
  }
};
</script>
