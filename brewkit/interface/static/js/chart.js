function generateChart(thermo) {
  data = [{ type: 'sv', time: moment().format('hh:mm:ss'), temp: thermo.sv }, { type: 'pv', time: moment().format('hh:mm:ss'), temp: thermo.pv }]
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
          // weight will be displayed as                // Person Weight: 50
          time: { label: "Time" },
          temp: {
            label: "Temperature",
            format: function (temp) {
              return (temp + " ˚F");                   // Person Height: 160 cm
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

  chart.theroId = thermo.id
  return chart
}

