import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'uikit/dist/css/uikit.css';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

require("uikit");

Vue.config.productionTip = false

import api from '@/api.js';
import axios from 'axios';

new Vue({
    router,
    data() {
        return {
            config: {},
            notifications: [],
            updateLoopHandle: null,
            writeWaiting: false,
            requestOut: false
        }
    },
    async mounted() {
        // This is just for dev
        // Gets the first config in the db and sets it as active
        // this.config = (await api.getConfigurations())[0];
        window.api = api;
        window.r = this;

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
        device(id) {
            return this.devices().find(dev => dev.id == id) || {};
        },

        devices() {
            if (this.config.RTUs == undefined) return [];

            let devices = [];

            this.config.RTUs.forEach(rtu => {
                rtu.devices.forEach(device => {
                    devices.push(device);
                });
            });

            return devices;
        },

        RTUs() {
            // RTUs, or [] as a default
            return this.config['RTUs'] || [];
        },

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

        update(mode = "Read") {
            if (this.config == {}) {
                // this.notify("No configuration selected, can't update", "danger");
                return;
            }

            let master_addr = this.config.masterAddr;

            // If the mode is write then set it, 'Read' is the default value provided by prepareConfig()
            this.config.mode = mode;
            // Set default values for anything that might be null
            this.config = this.prepareConfig(this.config);

            console.log("Updating with mode: " + mode);

            // Send it to the master
            this.requestOut = true;
            axios
                .post(`http://${master_addr}/configuration`, this.config, {
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
                })
                .catch((err) => {
                    console.log(err);
                    this.requestOut = false;
                });
        },
    },
    render: h => h(App)
}).$mount('#app')
