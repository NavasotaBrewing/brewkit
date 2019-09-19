<template>
  <div id="newConfigCardWrapper">
    <div id="newConfigCard" class="uk-card uk-card-default">
      <div class="uk-card-body">
        <div class="uk-card-title">Create a Configuration</div>
        <div uk-grid>
          <div class="uk-width-1-2@s">
            <input type="text" v-model="config.name" placeholder="New Configuration Name" class="uk-input" />
          </div>
          <div class="uk-width-1-2@s">
            <select v-model="selectedConfigId" name="configSelect" id="configSelect" class="uk-select">
              <option value="-1" selected disabled>-- Select to Edit --</option>
              <option v-for="c in configs" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="uk-width-1-1@s">
            <div uk-margin>
              <button id="save-button" class="uk-button button-margin">Save</button>
              <button id="reset-button" @click="confirm" class="uk-button button-margin ">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Confirmation @confirm="setEmptyConfig" ref="confirmation" :message="'This can\'t be undone unless you\'ve already saved your configuration. Are you sure you want to continue?'" />
  </div>
</template>

<script>
import { log } from 'util';
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
    confirm() {
      this.$refs.confirmation.toggle();
    },
    selectConfig(config) {
      this.config = config;
      // this.$emit('selectedConfig', config);
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

#reset-button {
  background-color: #A22455;
  color: white;
}

#reset-button:hover {
  background-color: rgb(129, 31, 68);
}

#save-button {
  background-color: #EDB271;
  color: white;
}

#save-button:hover {
  background-color: rgb(201, 150, 96)
}
</style>
