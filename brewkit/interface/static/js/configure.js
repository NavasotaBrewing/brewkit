let x = new Vue({
  el: '#configure',
  data: {
    config: {
      devices: []
    },
    newDevice: {
      type: '',
      name: '',
      address: '',
      controller_address: '',
      states: {
        '0': '',
        '1': ''
      },
      state: 0
    }
  },
  components: {
    'main-navbar': NavBarComponent
  },
  methods: {
    testSlack() {
      sendInSlack('It works!', this.config.slackWebhook)
      x.toast('Message sent, did you get it?')
    },

    generateId() {
      return 'brewingwithbrewkit2k18'.split('').sort(function () { return 0.5 - Math.random() }).join('');
    },

    validateDevice() {
      // r/badcode
      if (this.newDevice.name == "" || this.newDevice.type == "") {
        return false
      } else if (this.newDevice.address == '' && this.newDevice.type != 'thermostat') {
        return false;
      } else if (this.newDevice.controller_address == '') {
        return false;
      } else if (this.newDevice.states[0] == '' || this.newDevice.states[1] == '') {
        return false
      }
      return true;
    },

    addDevice() {
      if (!this.validateDevice()) {
        toast('All fields need to be filled', 'danger');
        return;
      }
      copy = Object.assign(this.newDevice);
      copy.id = this.generateId();
      this.config.devices.push(copy);
      this.newDevice = {
        type: '',
        name: '',
        address: '',
        controller_address: '',
        states: {
          '0': '',
          '1': ''
        },
        state: 0
      }
      this.saveConfiguration();
    },

    removeDevice(device) {
      this.config.devices = this.config.devices.filter(d => d.id != device.id)
    },

    saveConfiguration() {
      if (!this.config.name || this.config.name == '') {
        toast('Configuration needs a name', 'danger')
        return;
      }
      this.$refs.NavBar.configs.push(this.config)
      socket.emit('save_configuration', this.config, (response) => {
        toast(response);
      });
    },

    deleteConfiguration() {
      if (confirm("Are you sure? This can't be undone.")) {
        socket.emit('delete_configuration', this.config, (response) => {
          toast(response);
        });
        // Clear the deleted one out of the navbar
        this.$refs.NavBar.configs = this.$refs.NavBar.configs.filter(c => c.id != this.config.id)
        this.config = {devices: []}
      }
    },

    registerSavers() {
      // Some inputs will save the config when they lose focus
      $('.saverInput').on('focusout', () => {
        console.log('lost focus')
        this.saveConfiguration();
      });
    }
  },
  mounted() {
    this.config.id = this.generateId();
    this.registerSavers();
  },
  watch: {
    config: {
      handler() {
        if (!this.config.id) {
          this.config.id = this.generateId();
        }
      },
      deep: true
    }
  }
})
