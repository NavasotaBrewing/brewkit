let x = new Vue({
  el: '#dashboard',
  data: {
    config: {
      controllers: {
        'STR116': [],
        'STR008': [],
        'OmegaCN7500': []
      },
      devices: {
        'onOff': [],
        'divert': [],
        'variable': [],
        'pump': [],
        'thermostat': [],
      }
    },
    stateUpdator: null,
  },
  components: {
    'temp-chart': TempChartComponent,
    'main-header': MainHeaderComponent,
    'drawer': DrawerComponent,
    'timer': TimerComponent,
    'devices': AllDevicesTabs,
    'slack': SlackCard
  },
  methods: {
    setState() {

    }
  },

  mounted() {
  },
  updated: function() {
    // This is a fix for MDL
    this.$nextTick(function () {
      componentHandler.upgradeDom();
    });
  }
})
