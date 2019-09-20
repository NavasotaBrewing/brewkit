<template>
  <div id="newConfigCardWrapper">
    <div id="newConfigCard" class="uk-card uk-card-default">
      <div class="uk-card-body">
        <div class="uk-card-title">Create a Configuration</div>
        <div uk-grid>
          <!-- Config Select -->
          <div class="uk-width-1-2@s">
            <select v-model="selectedConfigId" name="configSelect" id="configSelect" class="uk-select">
              <option value="-1" selected disabled>-- Select to Edit --</option>
              <option v-for="c in configs" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <!-- New Config Input -->
          <div class="uk-width-1-2@s">
            <input type="text" v-model="newConfigName" placeholder="New Configuration Name" class="uk-input" />
          </div>
          <!-- Save and Rest buttons -->
          <div class="uk-width-1-2@s">
            <div uk-margin>
              <button class="uk-button uk-button-success button-margin">Save</button>
              <button @click="confirm" class="uk-button uk-button-danger button-margin ">Reset</button>
            </div>
          </div>
          <!-- Create button -->
          <div class="uk-width-1-2@s">
            <div class="uk-margin">
              <button @click="createConfig" class="uk-button uk-button-primary">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Confirmation @confirm="setEmptyConfig" ref="confirmation" :message="'This can\'t be undone unless you\'ve already saved your configuration. Are you sure you want to continue?'" />
  </div>
</template>

<script>
import api from '@/api';
import Confirmation from '@/components/Confirmation.vue';

export default {
  name: "NewConfigInput",
  props: [],
  components: {
    Confirmation
  },
  data() {
    return {
      config: {},
      configs: [],
      newConfigName: "",
      selectedConfigId: -1,
      emptyConfig: {
        name: "",
        description: "",
        id: "",
        mode: "Read",
        slackWebhook: "",
        slackChannel: "",
        RTUs: []
      },
      emptyRTU: {
        name: "",
        location: "",
        id: "",
        ipv4: "",
        devices: []
      },
      emptyDevice: {
        STR1: {
          driver: "STR1",
          addr: 0,
          controller_addr: 0,
          name: "",
          state: "On",
          id: ""
        },
        Omega: {
          driver: "Omega",
          name: "",
          addr: 0,
          pv: 0,
          sv: 0,
          controller_addr: 0,
          id: "",
          state: "On"
        }
      }
    };
  },
  methods: {
    findConfigByName(name) {
      let c = this.configs.filter(c => c.name == name)[0];
      return c;
    },

    isNameUnique(name) {
      let c = this.findConfigByName(name);
      if (c == undefined) return true;
      return false;
    },

    createConfig() {
      if (!this.isNameUnique(this.newConfigName) || this.newConfigName.length < 1) {
        this.notify("Configuration name is taken or not valid", 'danger');
        return;
      }

      let config = {};
      Object.assign(config, this.emptyConfig);
      config.name = this.newConfigName;

      // Create it (write to db)
      api.createConfiguration(config).then(() => {
        this.notify("Configuration created!", 'success');
        this.getAllConfigs();
        this.config = this.findConfigByName(this.newConfigName);
      this.newConfigName = "";
      }).catch(() => {
        this.notify("Configuration could not be created :(", 'danger');
      });
    },

    notify(message, status='') {
      this.$parent.notify(message, status);
    },

    confirm() {
      this.$refs.confirmation.toggle();
    },

    selectConfig(config) {
      this.config = config;
      this.$emit('selectedConfig', config);
    },

    async getAllConfigs() {
      this.configs = await api.getConfigurations();
    },

    setEmptyConfig() {
      Object.assign(this.config, this.emptyConfig);
    }
  },
  watch: {
    selectedConfigId: function() {
      console.log("Selected id = " + this.selectedConfigId);
      let cs = this.configs.filter(c => c.id == this.selectedConfigId);
      if (cs.length > 0) {
        let config_copy = {};
        Object.assign(config_copy, cs[0]);
        this.selectConfig(config_copy);
        return;
      }
      this.selectedConfigId = -1;
      this.setEmptyConfig();
    }
  },
  mounted() {
    this.getAllConfigs();
    this.setEmptyConfig();
    window.nci = this
  }
};
</script>

<style scoped>
#newConfigCardWrapper {
  padding: 1em;
}

.button-margin {
  margin-right: 0.5em;
}

.uk-card-title {
  margin-bottom: 1em;
}

#newConfigCard {
  background-color: white;
  border-left: 0.6em solid #a85b60;
}

</style>
