<template>
  <div>
    <!-- Create config confirmation (hidden) -->
    <Confirmation
      @confirm="createConfig"
      :title="'Create a Configuration'"
      :yText="'Create'"
      ref="createConfigConfirmation"
    >
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

    <Confirmation
      @confirm="deleteConfig"
      :title="'Delete Configuration'"
      :yText="'Delete'"
      ref="deleteConfigConfirmation"
    ></Confirmation>

    <!-- Create config confirmation show button -->
    <button
      @click="showCreateConfigConfirmation"
      id="createConfigButton"
      class="uk-button uk-button-large button-primary"
    >Create</button>

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

            <!-- Save and Delete buttons -->
            <div v-show="config != {} && config.id != undefined" class="uk-margin">
              <button
                @click="updateConfig"
                class="uk-button button-margin button-primary"
              >Save</button>

              <button
                class="uk-button button-danger"
                @click="showDeleteConfigConfirmation"
              >Delete</button>
            </div>
          </Card>
        </div>

        <!-- Config details -->
        <div v-if="config.id" class="uk-width-2-3@m">
          <Card id="configDetailsCard" :type="''" class="uk-margin-top">
            <!-- Name -->
            <div class="uk-margin uk-grid-small" uk-grid>
              <div class="uk-width-3-4@s">
                <input
                  type="text"
                  id="configNameInput"
                  placeholder="Configuration Name"
                  v-model="config.name"
                  class="uk-input"
                />
              </div>
              <div class="uk-width-1-4@s">
                <div class="uk-inline">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    uk-tooltip="For display purposes only"
                    uk-icon="icon: info"
                  ></a>
                  <input v-model="config.date" type="text" placeholder="Date" class="uk-input">

                </div>
              </div>
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
            <div class="uk-margin">
              <code>
                <div class="uk-inline uk-width-1-1">
                  <span class="uk-form-icon uk-margin-left">http://</span>
                  <input v-model="config.masterAddr" id="masterAddrInput" placeholder="Master Address" type="text" class="uk-input">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    @click="testMasterConnection"
                    uk-tooltip="IP and port of the master server. Click here to test connection"
                    uk-icon="info"
                  />
                </div>

              </code>
            </div>
            <!-- Slack -->
            <div uk-grid>
              <div class="uk-width-2-3@s">
                <div class="uk-inline uk-width-1-1">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    uk-tooltip="You can register a webhook on your slack channel's page. This is optional."
                    uk-icon="info"
                  />
                  <input
                    class="uk-input slack-input"
                    id="slackWebhookInput"
                    v-model="config.slackWebhook"
                    type="text"
                    placeholder="Slack Webhook"
                  />
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
        <div uk-grid class="uk-margin-top uk-margin-bottom">
          <!-- Add RTU card -->
          <div class="uk-width-1-3@m">
            <AddRTUCard @newRTU="addRTU($event)"></AddRTUCard>
          </div>

          <!-- All RTUs -->
          <div class="uk-width-expand">
            <RTUs :rtus="allRTUs()" @remove="removeRTU($event)"></RTUs>
          </div>
        </div>
      </div>
    </div>

    <!-- Device Section -->
    <div v-if="allRTUs().length > 0" class="uk-section uk-margin-top">
      <div class="uk-container">
        <div class="uk-grid-small" uk-grid="masonry: true">
          <!-- New Device Card -->
          <div class="uk-width-1-3@m">
            <AddDeviceCard @newDevice="addDevice($event)" :rtus="config.RTUs"></AddDeviceCard>
          </div>

          <!-- All Devices -->
          <div class="uk-width-2-3@m">
            <DeviceTable @remove="removeDevice($event)" :devices="allDevices()" :rtus="allRTUs()"></DeviceTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import axios from 'axios';

import Card from "@/components/Card.vue";
import Confirmation from "@/components/Confirmation.vue";

import AddRTUCard from "@/components/RTUs/AddRTUCard.vue";
import RTUs from "@/components/RTUs/RTUs.vue";

import AddDeviceCard from "@/components/AddDeviceCard.vue";
import DeviceTable from "@/components/DeviceTable.vue";

import Slack from "@/slack.js";

export default {
  name: "Configure",
  components: {
    Card,
    Confirmation,
    AddRTUCard,
    RTUs,
    AddDeviceCard,
    DeviceTable,
    Confirmation
  },
  data() {
    return {
      config: {},
      configs: [],
      newConfigName: "",
      configSelect: -1
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
      this.newConfigName = "";
      this.config = {};
      this.configSelect = -1;
    },

    selectConfig(id) {
      let config = this.configs.filter(c => c.id == id)[0];
      this.config = config;
    },

    showCreateConfigConfirmation() {
      this.$refs.createConfigConfirmation.toggle();
    },
    
    showDeleteConfigConfirmation() {
      this.$refs.deleteConfigConfirmation.toggle();
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
        .createConfiguration({ name: this.newConfigName, RTUs: [] })
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

    deleteConfig() {
      api.deleteConfiguration(this.config.id);
      this.config = {};
      this.refreshConfigs();
    },

    updateConfig() {
      if (this.config.id == undefined) {
        this.notify("Select a configuration to update", "danger");
        return;
      }

      
      api
        .updateConfiguration(this.config.id, this.$root.prepareConfig(this.config))
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

    addRTU(rtu) {
      if (!this.config.RTUs) {
        this.config.RTUs = [];
      }

      this.config.RTUs.push(rtu);
      this.notify("RTU added", "success");
      this.updateConfig();
    },

    removeRTU(rtuId) {
      this.config.RTUs = this.config.RTUs.filter(r => r.id != rtuId);
      this.updateConfig();
    },

    addDevice(device) {
      let rtu = this.config.RTUs.filter(r => r.id == device.rtu)[0];
      if (!rtu) {
        this.notify("Could not add device", "danger");
        return;
      }
      if (!rtu.devices) {
        rtu.devices = [];
      }
      rtu.devices.push(device);
      this.notify("Device added", "success");
      this.updateConfig();
    },

    removeDevice(deviceId) {
      console.log("got device " + deviceId);
      this.config.RTUs.forEach(rtu => {
        for (let i = 0; i < rtu.devices.length; i++) {
          const device = rtu.devices[i];
          if (device.id == deviceId) {
            rtu.devices.splice(i, 1);
            this.updateConfig();
          }
        }
      });
    },

    allDevices() {
      return this.config.RTUs.map(r => r.devices).flat();
    },

    allRTUs() {
      if (!this.config.id) {
        return [];
      }
      return this.config.RTUs;
    },

    testMasterConnection() {
      axios.get("http://" + this.config.masterAddr + "/running")
      .then(response => {
        console.log(response);
        if (response.data.running) this.notify("Master API running", "success");
      })
      .catch(error => {
        console.log(error);
        this.notify("Error occurred. Incorrect address or master API is not running", "danger");
      });
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

#masterAddrInput {
  padding-left: 70px !important;
}

.slack-input {
  font-family: "Courier New", Courier, monospace;
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
