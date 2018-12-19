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
  methods: {
    toast(message, status='primary') {
      UIkit.notification({ message: message, status: status, pos: 'bottom-left', timeout: 3000 })
    },

    testSlack() {
      sendInSlack('It works!', this.config.slackWebhook)
      x.toast('Message sent, did you get it?')
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
        this.toast('All fields need to be filled', 'danger');
        return;
      }
      copy = Object.assign(this.newDevice);
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
    }
  }
})
