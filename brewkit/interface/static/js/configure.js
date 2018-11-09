// This is responsible for creating a new configuration from scratch and sending it to flask to be saved
// It can also load a previous configuration, edit it, and save it.
// In the data section:
//     configurations: The previously saved configurations created by the user.
//     configuration:  The current loaded configuration. This is gradually changed as the user adds/removes devices and controllers.
//     newController:  A temporary controller model, created from a form on the page. Once the user hits 'add', this is pushed onto the current configuration and then cleared.
//     The other variables with the name 'new' and then the device name function the same way as 'newController'
//     These devices are 'newOnOff', 'newDivert', 'newVariable', 'newPump', and 'newThermo'
if (!socket) {
  console.error('Error: need to require socketio before custom js')
}

var x = new Vue({
  el: '#configure',
  data: {
    // These are the old ones
    configurations: [],
    configurationSelect: 'create',
    // This is the current one
    configuration: {
      name: '',
      slackWebhook: '',
      slackChannel: '',
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
        'thermostat': []
      },
    },
    newController: {
      name: '',
      address: ''
    },
    newOnOff: {
      "name": "",
      "type": "onOff",
      "address": "",
      "controller_address": '',
      "state": ''
    },
    newDivert: {
      "name": "",
      "type": "divert",
      "address": '',
      "controller_address": '',
      "states": {
        "0": "",
        "1": ""
      },
      "state": ''
    },
    newVariable: {
      "name": "",
      "type": "variable",
      "address": '',
      "controller_address": '',
      "state": ''
    },
    newPump: {
      "name": "",
      "type": "pump",
      "address": '',
      "controller_address": '',
      "state": ''
    },
    newThermo: {
      "name": "",
      "type": "thermostat",
      "address": '',
      "controller_address": '',
      "pv": 0,
      "sv": 0,
      "state": 0
    }

  },

  methods: {
    deviceType(type) {
      // Returns an array of devices of a certain type
      // This looks stupid but it's for backwards compatibility
      return this.configuration.devices[type];
    },
    controllerType(type) {
      // returns an array of controllers of a certain type
      // This looks stupid but it's for backwards compatibility
      return this.configuration.controllers[type]
    },

    addController() {
      // Pushes new controller onto the configuration model and clears newController
      if (!this.validate(this.newController)) {
        return false;
      }

      console.log(this.configuration.controllers)
      this.configuration.controllers[this.newController.type].push(this.newController);

      this.newController = {
        name: '',
        address: ''
      }
    },

    removeController(con) {
      this.configuration.controllers[con.type] = this.configuration.controllers[con.type].filter(x => x.name != con.name);
    },

    removeDevice(dev) {
      this.configuration.devices[dev.type] = this.configuration.devices[dev.type].filter(x => x.name != dev.name);
    },

    validate(item) {
      delete item['state']
      for (let key in item) {
        var value = item[key];
        if (value.length == 0) {
          this.validation_message = "Validation failed. Make sure all the fields are filled.";
          return false;
        }
      }
      return true;
    },

    addDevice(type) {
      if (type == 'onOff') {
        if (!this.validate(this.newOnOff)) {
          return false;
        }
        this.configuration.devices[type].push(this.newOnOff);
        this.newOnOff = {
          "name": "",
          "type": "onOff",
          "address": "",
          "controller_address": '',
          "state": ''
        }
      }

      if (type == 'divert') {
        if (!this.validate(this.newDivert)) {
          return false
        }
        this.configuration.devices[type].push(this.newDivert);
        this.newDivert = {
          "name": "",
          "type": "divert",
          "address": '',
          "controller_address": '',
          "states": {
            "0": "",
            "1": ""
          },
          "state": ''
        }
      }

      if (type == 'variable') {
        if (!this.validate(this.newVariable)) {
          return false
        }
        this.configuration.devices[type].push(this.newVariable);
        this.newVariable = {
          "name": "",
          "type": "variable",
          "address": '',
          "controller_address": '',
          "state": ''
        }
      }

      if (type == 'pump') {
        if (!this.validate(this.newPump)) {
          return false
        }
        this.configuration.devices[type].push(this.newPump);
        this.newPump = {
          "name": "",
          "type": "pump",
          "address": '',
          "controller_address": '',
          "state": ''
        }
      }

      if (type == 'thermostat') {
        if (!this.validate(this.newThermo)) {
          return false
        }
        this.configuration.devices[type].push(this.newThermo);
        this.newThermo = {
          "name": "",
          "type": "thermostat",
          "address": '',
          "controller_address": '',
          "pv": 0,
          "sv": 0,
          "state": 0
        }
      }
    },

    controllerNameByAddress(adr) {
      controllers = Object.values(this.configuration.controllers);
      var flat = [].concat.apply([], controllers);
      con = flat.filter(x => x.address == adr)[0];
      if (con) {
        return con.name;
      }
      return '';
    },

    saveConfiguration() {
      socket.emit('save_configuration', this.configuration, function(message) {
        console.log(message);
      });
    },

    getSavedConfigurations() {
      socket.emit('get_configurations', function(configs) {
        x.configurations = JSON.parse(configs);
      });
    },

    testSlack() {
      // Sends a message to make sure the slack webhook is correct
      // TODO: Migrate to socketio
      const options = {
        text: "Slack works",
      };

      axios.post(this.configuration.slackWebhook, JSON.stringify(options))
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  computed: {
    allControllers: function() {
      // Returns a flat array of every controller
      controllers = Object.values(this.configuration.controllers);
      var flat = [].concat.apply([], controllers);
      return flat;
    },
    allDevices: function() {
      // Returns a flat array of every controller
      devices = Object.values(this.configuration.devices);
      var flat = [].concat.apply([], devices);
      return flat;
    },
  },

  mounted() {
    // This checks 'dirty' mdl-textfields and fixes if necessary every 500 ms. Just a patch.
    this.getSavedConfigurations();

    window.setInterval(function() {
      var nodeList = document.querySelectorAll('.mdl-textfield');

      Array.prototype.forEach.call(nodeList, function (elem) {
        elem.MaterialTextfield.checkDirty();
      });
    }, 500)
  },

  watch: {
    configurationSelect: function () {
      // Load Configuration from select box
      if (this.configurationSelect != 'create') {
        this.configuration = this.configurations.filter(x => x.name == this.configurationSelect)[0];
      } else {
        this.configuration = {
          name: '',
          slackWebhook: '',
          controllers: [],
          devices: []
        }
      }
    }
  },
  updated: function () {
    this.$nextTick(function () {
      componentHandler.upgradeDom();
    });
  }
})
