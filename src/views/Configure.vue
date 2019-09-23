<template>
  <div>
    <!-- Create config confirmation (hidden) -->
    <Confirmation
      @confirm="createConfig"
      :title="'Create a Configuration'"
      :yText="'Create'"
      ref="createConfigConfirmation">
      <div class="uk-inline">
        <input
          type="text"
          v-model="newConfigName"
          :class="{ 'uk-form-danger': !configNameUnique }"
          placeholder="Name"
          class="uk-input"
        />
      </div>
    </Confirmation>

    <!-- Create config confirmation show button -->
    <button
      @click="showCreateConfigConfirmation"
      id="createConfigButton"
      class="uk-button uk-button-large button-primary">Create
    </button>

    <!-- Config select and details -->
    <div class="uk-container">
      <div uk-grid>


        <!-- Select config -->
        <div class="uk-width-1-3@m">
          <!-- Select config card -->
          <Card
            id="selectConfigCard"
            class="uk-margin-top"
            :type="'primary'"
            :title="'Select a Configuration'"
          >
            <!-- Select config -->
            <div class="uk-margin">
              <select id="configSelect" v-model="configSelect" class="uk-select">
                <option value="-1" disabled>-- Select a Configuration --</option>
                <option v-for="c in configs" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>

            <!-- Save button -->
            <div class="uk-margin">
              <button
                @click="updateConfig"
                v-show="config.id != undefined"
                class="uk-button button-margin button-primary"
              >Save</button>
            </div>
          </Card>
        </div>

        <!-- Config details -->
        <div v-if="config.id" class="uk-width-2-3@s">
          <Card id="configDetailsCard" class="uk-margin-top">
            <!-- Name -->
            <div class="uk-margin">
              <!-- <label for="configNameInput" class="uk-text-uppercase uk-text-lead">Name</label> -->
              <input
                type="text"
                id="configNameInput"
                placeholder="Configuration Name"
                v-model="config.name"
                class="uk-input"
              />
            </div>
            <!-- Description -->
            <div class="uk-margin">
              <textarea
                placeholder="Description"
                v-model="config.description"
                id="configDescInput"
                cols="20"
                rows="3"
                class="uk-textarea"
              ></textarea>
            </div>
            <!-- <hr> -->
            <!-- Slack -->
            <div uk-grid>
              <div class="uk-width-2-3@s">
                <div class="uk-inline uk-width-1-1">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    uk-tooltip="You can register a webhook on your slack channel's page. This is optional."
                    uk-icon="info"/>
                  <input
                    class="uk-input slack-input"
                    id="slackWebhookInput"
                    v-model="config.slackWebhook"
                    type="text"
                    placeholder="Slack Webhook"/>
                </div>
              </div>
              <div class="uk-width-1-3@s">
                <div class="uk-inline">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    uk-tooltip="For display purposes only"
                    uk-icon="icon: info"
                  ></a>
                  <input
                    class="uk-input slack-input"
                    v-model="config.slackChannel"
                    type="text"
                    placeholder="Slack Channel"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>


    <!-- RTU section -->
    <div v-if="config.id" class="uk-section-muted uk-margin-top">
      <div class="uk-container">
        <div uk-grid>

          <!-- Add RTU card -->
          <div class="uk-width-1-3@m uk-margin-top uk-margin-bottom">
            <Card :type="'secondary'" :title="'New RTU'">

              <div class="uk-margin">
                <label for="newRTUName">Name</label>
                <input type="text" v-model="newRTU.name" id="newRTUName" placeholder="Name" class="uk-input">
              </div>

              <div class="uk-margin">
                <label for="newRTULocation">Location</label>
                <input type="text" class="uk-input" v-model="newRTU.location" placeholder="Location" id="newRTULocation">
              </div>

              <div class="uk-margin">
                <label for="newRTUIPV4">Address</label>
                <input type="text" class="uk-input" v-model="newRTU.ipv4" placeholder="Address" id="newRTUIPV4">
              </div>

              <div class="uk-margin">
                <button @click="addRTU" class="uk-button button-secondary">Add</button>
              </div>

            </Card>
          </div>

          <!-- All RTUs -->
          <div class="uk-width-2-3@m uk-margin-top uk-margin-bottom">
            <div class="uk-child-width-1-3@m" uk-grid>
              <div v-for="rtu in config.RTUs" :key="rtu.id">
                <RTU @remove="config.RTUs = config.RTUs.filter(r => r.id != $event)" :rtu="rtu"></RTU>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Device Section -->
    <div class="uk-section uk-margin-top">
      <div class="uk-container">
        <div uk-grid>
          <!-- New Device Card -->
          <div class="uk-width-1-3@m">

            <Card :title="'New Device'" :type="'tertiary'">

              <div class="uk-margin">
                <label for="newDeviceDriver">Driver</label>
                <select name="driver" id="newDeviceDriver" v-model="newDevice.driver" class="uk-select">
                  <option value="" disabled>-- Driver --</option>
                  <option value="STR1">STR1</option>
                  <option value="Omega">Omega</option>
                </select>
              </div>

              <div class="uk-margin">
                <label for="newDeviceRTU">RTU</label>
                <select v-model="newDevice.rtu" id="newDeviceRTU" class="uk-select">
                  <option value="" disabled>-- RTU --</option>
                  <option v-for="rtu in config.RTUs" :key="rtu.id" :value="rtu.id">{{ rtu.name }}</option>
                </select>
              </div>

              <div class="uk-margin">
                <label for="newDeviceName">Name</label>
                <input type="text" v-model="newDevice.name" placeholder="Name" class="uk-input" id="newDeviceName">
              </div>

              <div v-if="newDevice.driver == 'STR1'" class="uk-margin">
                <label for="newDeviceAddr">Address</label>
                <input type="text" v-model="newDevice.addr" placeholder="Address" class="uk-input" id="newDeviceAddr">
              </div>

              <div class="uk-margin">
                <label for="newDeviceControllerAddr">Controller Address</label>
                <input type="text" v-model="newDevice.controller_addr" placeholder="Controller Address" class="uk-input" id="newDeviceControllerAddr">
              </div>

              <div class="uk-margin">
                <button @click="addDevice" class="uk-button button-tertiary">Add</button>
              </div>

            </Card>

          </div>

          <!-- All Devices -->
          <div class="uk-width-2-3@m">
            <div v-for="rtu in config.RTUs" :key="rtu.id" uk-grid>

              <div class="uk-width-1-3@m" v-for="device in rtu.devices" :key="device.id">
                <Device :device="device"></Device>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/api";

import Card from "@/components/Card.vue";
import Confirmation from "@/components/Confirmation.vue";
import RTU from '@/components/RTU.vue';
import Device from '@/components/Device.vue';
import Slack from '@/slack.js';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function empty(thing) {
  return thing == '';
}

export default {
  name: "Configure",
  components: {
    Card,
    Confirmation,
    RTU,
    Device
  },
  data() {
    return {
      config: {"id":3,"name":"take us through the eyes","description":null,"mode":null,"slackChannel":null,"slackWebhook":"https://hooks.slack.com/services/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","RTUs":[{"name":"Main Valves","location":"location","id":"7ad95162-bd16-4823-8e68-80d9582d867b","ipv4":"192/12323.2/342.34234","devices":[]}]},
      configs: [],
      newConfigName: "",
      configSelect: -1,
      newRTU: {
        name: "",
        location: "",
        id: "",
        ipv4: "",
        devices: [],
      },
      newDevice: {
        driver: "",
        rtu: "",
        name: "",
        addr: "",
        controller_addr: "",
        id: "",
      }
    };
  },
  computed: {
    configNameUnique() {
      let foundConfig = this.configs.filter(
        c => c.name == this.newConfigName
      )[0];
      return foundConfig == undefined;
    }
  },
  mounted() {
    this.captureSave();

    window.configure = this;
    this.refreshConfigs();
  },
  methods: {
    slack(msg) {
      Slack.send(this.config.slackWebhook, msg);
    },

    captureSave() {
      document.addEventListener(
        "keydown",
        e => {
          if (
            (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
            e.keyCode == 83
          ) {
            e.preventDefault();
            this.updateConfig();
          }
        },
        false
      );
    },

    async refreshConfigs() {
      this.configs = await api.getConfigurations();
    },

    selectConfig(id) {
      let config = this.configs.filter(c => c.id == id)[0];
      this.config = config;
    },

    showCreateConfigConfirmation() {
      this.$refs.createConfigConfirmation.toggle();
    },

    notify(message, status = "") {
      this.$parent.notify(message, status);
    },

    createConfig() {
      let foundConfig = this.configs.filter(
        c => c.name == this.newConfigName
      )[0];
      if (foundConfig != undefined || this.newConfigName.length < 1) {
        this.notify("Name not valid, pick another", "danger");
        return;
      }

      api
        .createConfiguration({ name: this.newConfigName })
        .then(() => {
          this.refreshConfigs();
          console.log(this.configs);
          this.newConfigName = "";
          this.notify("Configuration created", "success");
        })
        .catch(e => {
          this.notify(
            "Something went wrong, configuration could not be created",
            "danger"
          );
          console.log(e);
        });
    },

    updateConfig() {
      if (this.config.id == undefined) {
        this.notify("Select a configuration to update", "danger");
        return;
      }

      api
        .updateConfiguration(this.config.id, this.config)
        .then(() => {
          this.notify("Updated", "success");
        })
        .catch(() => {
          this.notify(
            "Something went wrong, could not update configuration",
            "danger"
          );
        });
    },

    addRTU() {
      if (empty(this.newRTU.name.length) || empty(this.newRTU.ipv4.length)) {
        this.notify("Please fill in all required fields", 'danger');
        return;
      }

      if (!this.config.RTUs) {
        this.config.RTUs = [];
      }

      this.newRTU.id = uuid();

      let vessel = {};
      Object.assign(vessel, this.newRTU)
      this.config.RTUs.push(vessel);

      this.newRTU.name = '';
      this.newRTU.id = '';
      this.newRTU.location = '';
      this.newRTU.ipv4 = '';

      this.notify("RTU added", 'success');
    },

    addDevice() {
      if (
        empty(this.newDevice.name) ||
        empty(this.newDevice.driver) ||
        empty(this.newDevice.controller_addr ||
        empty(this.newDevice.rtu)))
      {
        this.notify("Please fill in all required fields", 'danger');
        return;
      }

      let vessel = {};
      Object.assign(vessel, this.newDevice);

      vessel.id = uuid();

      let rtu = this.config.RTUs.filter(r => r.id == vessel.rtu)[0];

      if (!rtu.devices) {
        rtu.devices = [];
      }

      rtu.devices.push(vessel);

      this.newDevice.name = "";
      this.newDevice.driver = "";
      this.newDevice.rtu = "";
      this.newDevice.controller_addr = "";
      this.newDevice.addr = "";

      this.notify("Device added", 'success');
    }
  },
  watch: {
    configSelect: function() {
      this.selectConfig(this.configSelect);
    }
  }
};
</script>

<style scoped>
/* #selectConfigCard {
  margin-top: 2em;
} */

.slack-input {
  font-family: 'Courier New', Courier, monospace;
}

#slackWebhookInput {
  padding-right: 3em;
}

#selectConfigCard * {
  color: black;
}

#createConfigButton {
  position: fixed;
  bottom: 2.3em;
  left: 4em;
  z-index: 8;
}
</style>
