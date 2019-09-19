<template>
  <div id="configSelectContainer">
    <div id="configSelect" :class="{ 'reveal': revealPane }" class="uk-card uk-card-primary uk-card-body">
      <!-- Teaser Icon -->
      <span id="teaserIcon" @click="reveal()" uk-icon="icon: server; ratio: 2;"></span>

      <!-- Config name tabs -->
      <div v-if="configs.length > 0" class="uk-child-width-1-2@s" uk-grid>
        <div class="uk-width-1-5@s">
          <ul class="uk-tab-left" uk-tab>
            <li class="config-list-item" v-for="config in configs" :key="config.id" :class="{ 'uk-active': selectedConfig.id == config.id }" @click="selectConfig(config)">
              <a class="config-list-item-text" href="#">{{ config.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Config details pane -->
        <div>
          <h1>{{ selectedConfig.name }}</h1>
          <!-- Config details go here -->
          <pre>{{ selectedConfig }}</pre>
        </div>

      </div>

      <!-- No configurations placeholder -->
      <div v-else>
        <p>No configurations</p>
      </div>

    </div>
  </div>
</template>


<style scoped>

#configSelectContainer {
  position: fixed;
}

.config-list-item-text {
  font-size: 1.6em !important;
}

#configSelect {
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: rgba(223, 123, 110, 1);

  transition: clip-path 1s;
  clip-path: circle(10% at 100% 0);

  /* Lighter color just in case */
  /* background-color: rgb(211, 137, 127); */
}

.reveal {
  clip-path: circle(100%) !important;
}

#teaserIcon {
  float: right;
  cursor: pointer;
}

</style>


<script>
function empty(obj) {
  return obj.toString.length == 0
}

import api from '@/api';

export default {
  name: "configSelect",
  data() {
    return {
      configs: [],
      selectedConfig: {},
      revealPane: false
    };
  },
  mounted() {
    // this.getAllConfigs();
    window.api = api
  },
  methods: {
    reveal() {
      this.revealPane = !this.revealPane;
      this.getAllConfigs();
    },

    async getAllConfigs() {
      this.configs = await api.getConfigurations();
      if (empty(this.selectedConfig)) {
        this.selectConfig(this.configs[0]);
      }
    },

    selectConfig(config) {
      this.selectedConfig = config;
      this.$emit('selectConfig', this.selectedConfig);
    }
  }
};
</script>
