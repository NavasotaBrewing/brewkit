user = Cookies.get('user')
if (user != 'admin') {
  console.log("authentication failed")
  location = 'login.html'
}

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
    toastCallback: function() {},
    message: ''
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
    update() {
      socket.emit('update', this.config, function (response) {
        x.config = JSON.parse(response.replace(/\'/g, '"'));
      });
    },

    enact() {
      socket.emit('enact', this.config, function (response) {
        console.log(response);
      });
    },

    showToast(message, callback) {
      this.message = message;
      if (callback) {
        this.toastCallback = callback;
      }
      if (this.message == '') {
        // Deactivate
        $('#snackbar').removeClass('mdl-snackbar--active')
      } else {
        // Activate
        $('#snackbar').addClass('mdl-snackbar--active')
        setTimeout(function () {
          this.message = ''
          $('#snackbar').removeClass('mdl-snackbar--active')
          this.toastCallback = function () { };
        }, 4000);
      }
    },


    setState(event) {
      console.log('somethings updated');
      console.log(event)
    },
    allDevices: function () {
      // Returns a flat array of every controller
      devices = Object.values(this.config.devices);
      var flat = [].concat.apply([], devices);
      return flat;
    },
  },
  watch: {
    config: {
      handler: function () {
        this.enact();
      },
      deep: true
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

