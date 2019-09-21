<template>
  <!-- Main column -->
  <div class="uk-container">
    <!-- Create config confirmation -->
    <Confirmation @confirm="createConfig" :title="'Create a Config'" :yText="'Create'" ref="createConfigConfirmation">
      <input type="text" v-model="newConfigName" placeholder="New Configuration Name" class="uk-input">
    </Confirmation>
    <!-- Create config confirmation show button -->
    <button @click="showCreateConfigConfirmation" id="createConfigButton" class="uk-button uk-button-large button-secondary">Create</button>

    <!-- Select config -->
    <div class="uk-child-width-1-3" uk-grid>
      <!-- Empty coloumn (offset) -->
      <div></div>
      <div>

        <!-- Select config card -->
        <Card id="selectConfigCard" :type="'primary'" :title="'Select a Configuration'">

            <!-- Select config -->
          <div class="uk-margin">
            <select id="configSelect" v-model="configSelect" class="uk-select">
              <option value="-1" disabled>-- Select a Configuration --</option>
              <option v-for="c in configs" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>

          <!-- Save button -->
          <div class="uk-margin">
            <button @click="updateConfig" class="uk-button button-margin button-primary">Save</button>
          </div>

        </Card>

      </div>
    </div>

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
      newConfigName: "",
      configSelect: -1
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
      this.config = config;
    },

    showCreateConfigConfirmation() {
      this.$refs.createConfigConfirmation.toggle();
    },

    notify(message, status='') {
      this.$parent.notify(message, status);
    },

    createConfig() {
      let foundConfig = this.configs.filter(c => c.name == this.newConfigName)[0];
      if (foundConfig != undefined || this.newConfigName.length < 1) {
        this.notify("Name not valid, pick another", 'danger');
        return;
      }

      api.createConfiguration({name: this.newConfigName}).then(result => {
        this.refreshConfigs();
        console.log(this.configs);
        this.newConfigName = "";
        this.notify("Configuration created", 'success');
      }).catch(e => {
        this.notify("Something went wrong, configuration could not be created", 'danger');
        console.log(e);
      });
    },

    updateConfig() {

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

#selectConfigCard {
  margin-top: 2em;
}

#selectConfigCard * {
  color: black;
}

#createConfigButton {
  position: fixed;
  bottom: 4em;
  right: 4em;
}

</style>
