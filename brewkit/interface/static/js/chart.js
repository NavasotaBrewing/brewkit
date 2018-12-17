var data = [{
  x: 0,
  y: 40,
  type: 'pv'
}, {
  x: 10,
  y: 10,
  type: 'pv'
}, {
  x: 12,
  y: 20,
  type: 'pv'
}, {
  x: 20,
  y: 20,
  type: 'pv'
}, {
  x: 30,
  y: 0,
  type: 'pv'
}, {
  x: 40,
  y: 10,
  type: 'pv'
}, {
  x: 42,
  y: 0,
  type: 'pv'
}, {
  x: 50,
  y: 20,
  type: 'pv'
}, {
  x: 0,
  y: 173,
  type: 'sv'
}, {
  x: 10,
  y: 173,
  type: 'sv'
}, {
  x: 12,
  y: 173,
  type: 'sv'
}, {
  x: 20,
  y: 173,
  type: 'sv'
}, {
  x: 30,
  y: 173,
  type: 'sv'
}, {
  x: 40,
  y: 140,
  type: 'sv'
}, {
  x: 42,
  y: 140,
  type: 'sv'
}, {
  x: 50,
  y: 140,
  type: 'sv'
}];

var chart = new Taucharts.Chart({
  guide: {
    interpolate: 'linear',
    x: { nice: true },
    y: { min: 50, max: 230, nice: true },
    color: {
      brewer: { 'pv': '#1D87F0', 'sv': '#222222' }
    }
  },
  data: data,
  type: 'line',
  x: 'x',
  y: 'y',
  color: 'type',
});
chart.renderTo('#thermoChart')

var chart2 = new Taucharts.Chart({
  guide: {
    interpolate: 'linear',
    x: { nice: true },
    y: { min: 50, max: 230, nice: true },
    color: {
      brewer: { 'pv': '#1D87F0', 'sv': '#222222' }
    }
  },
  data: data,
  type: 'line',
  x: 'x',
  y: 'y',
  color: 'type',
});

chart2.renderTo('#thermoChart2')
