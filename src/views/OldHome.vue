<template>
  <div class="home">
    <!-- <button @click="update('Read')" class="uk-button uk-button-primary">Update</button> -->
    <!-- <button @click="update('Write')" class="uk-button uk-button-default">Write</button> -->
    <!-- Tools -->
    <div class="uk-section">
      <div class="uk-container">
        <div uk-grid class="uk-grid-column-small">
          <div class="uk-width-1-2@m">
            <Timer />
          </div>
          <div class="uk-width-1-2@m">
            <Slack v-if="config.id" :channel="config.slackChannel" :webhook="config.slackWebhook" />
          </div>
        </div>
      </div>
    </div>

    <!-- Devices -->
    <div v-if="devices().length > 0" class="uk-section-muted">
      <div class="uk-container uk-margin-top uk-padding">
        <div v-for="rtu in config.RTUs" :key="rtu.id" uk-filter="target: #deviceFilter">
          <h3>{{ rtu.name }}</h3>
          <ul class="uk-subnav uk-subnav-pill">
            <li uk-filter-control=".device" class="uk-active">
              <a href="#">All</a>
            </li>
            <li uk-filter-control=".tag-STR1">
              <a href="#">Relays</a>
            </li>
            <li uk-filter-control=".tag-Omega">
              <a href="#">PIDs</a>
            </li>
          </ul>

          <ul
            id="deviceFilter"
            class="uk-child-width-1-3@s uk-child-width-1-4@l"
            uk-grid="masonry: true"
          >
            <!-- Device Loop -->
            <li
              v-for="device in rtu.devices"
              :key="device.id"
              class="device"
              :class="'tag-' + device.driver"
            >
              <div class="uk-card uk-card-default uk-card-body">
                <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
                  <div>
                    <dl>
                      <dt>{{ device.name }}</dt>
                      <span
                        @click="device.state = 'On'"
                        v-if="device.state == 'Off'"
                        class="cursor enactor uk-label label-danger"
                      >{{ device.state }}</span>
                      <span
                        @click="device.state = 'Off'"
                        v-else
                        class="cursor enactor uk-label label-primary"
                      >{{ device.state }}</span>
                    </dl>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Thermo graphs -->
    <div v-if="thermos().length > 0" class="uk-section">
      <div class="uk-container">
        <div uk-grid>

          <div class="uk-width-auto@m">
            <ul class="uk-tab-left" uk-tab="connect: #component-tab-left; animation: uk-animation-fade">
              <li v-for="thermo in thermos()" :key="thermo.id">
                <a href="#">{{ thermo.name }}</a>
              </li>
            </ul>
          </div>

          <div class="uk-width-expand@m">
            <ul id="component-tab-left" class="uk-switcher">
              <li v-for="thermo in thermos()" :key="thermo.id">

                <div class="uk-margin">
                  <p class="uk-text-lead">
                    Current: {{ thermo.pv }} &deg;F &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Target: {{ thermo.sv }} &deg;F
                  </p>
                </div>
                <div class="uk-margin">
                  <input :id="'newSV' + thermo.id" placeholder="Set SV" type="text" class="uk-input uk-form-width-medium">
                  <button class="uk-button enactor uk-button-primary">Set</button>
                </div>

                <ThermoChart :thermo="thermo"></ThermoChart>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

import Timer from "@/components/Timer.vue";
import Slack from "@/components/Slack.vue";
import ThermoChart from "@/components/ThermoChart.vue";

import api from "@/api.js";

export default {
  name: "home",
  components: {
    Timer,
    Slack,
    ThermoChart
  },

  data() {
    return {
      config: {},
      writeWaiting: false,
    };
  },

  async mounted() {
    window.home = this;
    window.api = api;
    // This is just for dev
    this.config = (await api.getConfigurations())[0];
    window.config = this.config;

    this.update();
    setInterval(() => {
      if (this.writeWaiting) {
        this.update("Write");
        this.writeWaiting = false;
      } else {
        this.update("Read");
      }
    }, 5000);

    this.registerEnactors();
  },

  methods: {
    notify(msg, status = "") {
      this.$parent.notify(msg, status);
    },

    thermos() {
      let devices = this.devices();

      let thermos = devices.filter(d => d.driver == "Omega");
      return thermos;
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

    registerEnactors() {
      setTimeout(() => {
        let enactors = document.querySelectorAll(".enactor");
        enactors.forEach(en => {
          en.addEventListener("click", () => {
            // this.update("Write");
            this.writeWaiting = true;
          });
        });
      }, 0);
    },

    prepareConfig(config) {
      config.mode = config.mode || "Read";
      config.RTUs.forEach(rtu => {
        rtu.devices.forEach(device => {
          device.addr = parseInt(device.addr) || 0;
          device.controller_addr = parseInt(device.controller_addr) || 0;
          device.pv = parseFloat(device.pv) || 0.0;
          device.sv = parseFloat(device.sv) || 0.0;
          device.state = device.state || "Off";

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
        this.notify("No configuration selected, can't update", "danger");
        return;
      }

      let master_addr = this.config.masterAddr;

      // If the mode is write then set it, 'Read' is the default value provided by prepareConfig()
      this.config.mode = mode;
      // Set default values for anything that might be null
      this.config = this.prepareConfig(this.config);

      console.log("Updating with mode: " + mode);

      // Send it to the master
      axios
        .post("http://" + master_addr + "/configuration", this.config, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
          // console.log(resp);
          this.config = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
