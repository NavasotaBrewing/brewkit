import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'uikit/dist/css/uikit.css';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

require("uikit");

Vue.config.productionTip = false;

import axios from 'axios';

new Vue({
    router,

    data() {
        return {
            config: {},
            notifications: [],
            updateLoopHandle: null,
            writeWaiting: false,
            requestOut: false,
            statusMsg: "Welcome to Brewkit",
        }
    },

    async mounted() {
        // update loop
        this.updateLoopHandle = setInterval(() => {
            if (this.config.id != undefined) {
                if (this.writeWaiting) {
                    this.update('Write');
                    this.writeWaiting = false;
                } else {
                    this.update('Read');
                }
            }
        }, 4000);
    },

    methods: {
        notify(msg, status = '') {
            // This has to live on App instead of here because
            // it requires refs to DOM elements.
            this.$children[0].notify(msg, status);
        },

        // Returns a device by id, else {}. Looks under all RTUs.
        device(id) {
            return this.devices().find(dev => dev.id == id) || {};
        },

        // Returns all devices, flattened.
        devices() {
            if (this.config.RTUs == undefined) return [];

            let devices = [];

            this.config.RTUs.forEach(rtu => {
                devices.push(rtu.devices);
            });

            return devices.flat();
        },

        // Returns all RTUs, else []
        RTUs() {
            // RTUs, or [] as a default
            return this.config['RTUs'] || [];
        },

        // Ensures all config properties have the correct default values
        // to prevent accessing undefined keys.
        prepareConfig(config) {
            config.mode = config.mode || "Read";
            config.RTUs.forEach(rtu => {
                rtu.devices.forEach(device => {
                    device.addr = parseInt(device.addr) || 0;
                    device.controller_addr = parseInt(device.controller_addr) || 0;
                    device.pv = parseFloat(device.pv) || -1.0;
                    // We set sv to negative one so it won't just override whatever is
                    // already set on the Omega when the config is updated the first time.
                    device.sv = parseFloat(device.sv) || -1.0;
                    device.state = device.state || "Off";

                    // Capture this at the last possible moment to avoid collisions.
                    if (device.driver == "Omega") {
                        let new_sv = document.querySelector("#newSV" + device.id);
                        if (new_sv) {
                            if (config.mode == "Write") {
                                device.sv = parseFloat(new_sv.value) || device.sv;
                                new_sv.value = "";
                            }
                        }
                    }

                });
            });

            return config;
        },

        // Sends the configuration to the master API from brewdrivers.
        // Updates the configuration to match the one returned from the API.
        update(mode = "Read") {
            if (this.config == {}) {
                this.notify("No configuration selected, can't update", "danger");
                return;
            }

            let masterAddr = this.config.masterAddr;

            // If the mode is write then set it, 'Read' is the default value provided by prepareConfig()
            this.config.mode = mode;
            // Set default values for anything that might be null
            this.config = this.prepareConfig(this.config);

            console.log("Updating with mode: " + mode);

            // Send it to the master
            this.requestOut = true;
            this.statusMsg = "Request Out...";
            axios
                .post(`http://${masterAddr}/model`, this.config, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((resp) => {
                    // console.log(resp);
                    // I despise the next ~10 lines of code
                    for (let rtu_index = 0; rtu_index < resp.data.RTUs.length; rtu_index++) {
                        let rtu = resp.data.RTUs[rtu_index];
                        for (let device_index = 0; device_index < rtu.devices.length; device_index++) {
                            const device = rtu.devices[device_index];
                            this.config.RTUs[rtu_index].devices[device_index].state = device.state;
                            this.config.RTUs[rtu_index].devices[device_index].pv = device.pv;
                            this.config.RTUs[rtu_index].devices[device_index].sv = device.sv;
                        }
                    }
                    // We don't just want to do this:
                    // this.config = resp.data;
                    // Because then every time the config is updated (frequently), a new object would be
                    // loaded into memory, and all the Vue components that use the devices in the config
                    // would have to rebind to them. This way, we only update the state, not the whole object.
                    this.requestOut = false;
                    this.statusMsg = "Request returned OK.";
                })
                .catch((_err) => {
                    // console.log(err);
                    console.error("The master API is not responding (tried at %s). Is it running?", masterAddr);
                    this.requestOut = false;
                    this.statusMsg = "Request Error: see console.";
                });
        },

        testMasterConnection(masterAddr) {
            axios.get("http://" + masterAddr + "/running")
            .then(response => {
              console.log(response);
              if (response.data.running) {
                  this.notify("Master API running", "success");
                  return true;
              }
            })
            .catch(error => {
              console.log(error);
              this.notify("Error occurred. Incorrect address or master API is not running", "danger");
              return false;
            });
          }
    },
    render: h => h(App)
}).$mount('#app')
