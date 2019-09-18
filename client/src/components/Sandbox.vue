<template>
  <div id="sandbox">
    <div class="uk-container">

    </div>
  </div>
</template>

<script>
export default {
  name: "sandbox",
  data: function() {
    return {
      chart: null
    };
  },
  mounted() {
    this.generateChart();
  },
  methods: {
    generateChart() {
      let ctx = document.getElementById("chart").getContext("2d");
      let data = {
        labels: ["Target"],
        datasets: [
          {
            label: "PV",
            data: [50],
            backgroundColor: 'rgba(37, 144, 242, 0.2)'
          },
          {
            label: "SV",
            data: [50],
            borderColor: 'rgba(0, 0, 0, 0.6)',
          }
        ]
      };


      this.chart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
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
    }
  }
};
</script>
