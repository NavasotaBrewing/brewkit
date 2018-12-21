function generateChart(thermo) {
  // Starting values
  data = [
    {
      type: 'sv',
      time: moment().format('hh:mm:ss'),
      temp: 50
    },
    {
      type: 'pv',
      time: moment().format('hh:mm:ss'),
      temp: 50
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

