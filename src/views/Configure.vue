<template>
  <!-- Main column -->
  <div class="uk-container">

    <Confirmation @confirm="createConfig" :title="'Create a Config'" :yText="'Create'" ref="createConfigConfirmation">
      <input type="text" v-model="newConfigName" placeholder="New Configuration Name" class="uk-input">
    </Confirmation>

    <button @click="showCreateConfigConfirmation" id="createConfigButton" class="uk-button uk-button-large uk-button-secondary">Create</button>
  </div>
</template>

<script>
import api from "@/api";

import Card from "@/components/Card.vue";
import Confirmation from '@/components/Confirmation.vue';

export default {
  name: "Configure",
  components: {
    Card,
    Confirmation
  },
  data() {
    return {
      config: {},
      configs: [],
      newConfigName: ""
    };
  },

  mounted() {
    window.configure = this;
    this.refreshConfigs();
  },

  methods: {
    async refreshConfigs() {
      this.configs = await api.getConfigurations();
    },

    selectConfig(id) {
      let config = this.configs.filter(c => c.id == id)[0];
      console.log("Config selected: " + config.id);
      this.config = config;
    },

    showCreateConfigConfirmation() {
      this.$refs.createConfigConfirmation.toggle();
    },

    notify(message, status='') {
      this.$parent.notify(message, status);
    },

    createConfig() {
      // console.log(this.newConfigName)
      let foundConfig = this.configs.filter(c => c.name == this.newConfigName)[0];
      if (foundConfig != undefined || this.newConfigName.length < 1) {
        this.notify("Name not valid, pick another.", 'danger');
        return;
      }

      api.createConfiguration({name: this.newConfigName}).then(result => {
        this.refreshConfigs();
        this.newConfigName = "";
        this.notify("Configuration created", 'success');
      }).catch(e => {
        console.log(e);
      });
    }
  }
};
</script>


<style scoped>

#createConfigButton {
  position: fixed;
  bottom: 4em;
  right: 4em;
}

</style>
