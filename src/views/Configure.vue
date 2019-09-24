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
            <AddRTUCard @newRTU="addRTU($event)"></AddRTUCard>
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
    <div v-if="allRTUs().length > 0" class="uk-section uk-margin-top">
      <div class="uk-container">
        <div class="uk-grid-small" uk-grid="masonry: true">
          <!-- New Device Card -->
          <div class="uk-width-1-3@m">
            <AddDeviceCard @newDevice="addDevice($event)" :rtus="config.RTUs"></AddDeviceCard>
          </div>

          <!-- All Devices -->
          <div class="uk-width-2-3@m">
            <!-- <div v-for="rtu in allRTUs()" :key="rtu.id" uk-grid> -->
              <!-- <div class="uk-width-1-2@m" v-for="device in rtu.devices" :key="device.id"> -->
              <div uk-grid="masonry: true">
                <div class="uk-width-1-2@m" v-for="device in allDevices()" :key="device.id">
                  <Device @remove="rtu.devices = rtu.devices.filter(d => d.id != $event)" :device="device" :rtu="config.RTUs.filter(r => r.id == device.rtu)[0]"></Device>
                </div>
              </div>
            <!-- </div> -->
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
import AddRTUCard from '@/components/AddRTUCard.vue';
import RTU from '@/components/RTU.vue';
import AddDeviceCard from '@/components/AddDeviceCard.vue';
import Device from '@/components/Device.vue';
import Slack from '@/slack.js';


export default {
  name: "Configure",
  components: {
    Card,
    Confirmation,
    AddRTUCard,
    RTU,
    AddDeviceCard,
    Device
  },
  data() {
    return {
      config: {},
      configs: [],
      newConfigName: "",
      configSelect: -1,
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

    notify(message, status = '') {
      this.$parent.notify(message, status);
    },

    createConfig() {
      let foundConfig = this.configs.filter(c => c.name == this.newConfigName)[0];

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

    addRTU(rtu) {
      if (!this.config.RTUs) {
        this.config.RTUs = [];
      }

      this.config.RTUs.push(rtu);
      this.notify("RTU added", 'success');
    },

    addDevice(device) {
      let rtu = this.config.RTUs.filter(r => r.id == device.rtu)[0];
      if (!rtu) {
        this.notify("Could not add device", 'danger');
        return;
      }
      if (!rtu.devices) { rtu.devices = [] };
      rtu.devices.push(device);
      this.notify("Device added", 'success');
    },

    allDevices() {
      return this.config.RTUs.map(r => r.devices).flat();
    },

    allRTUs() {
      if (!this.config.id) {
        return [];
      }
      return this.config.RTUs;
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
