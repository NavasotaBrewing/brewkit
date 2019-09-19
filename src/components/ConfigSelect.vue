<template>
  <div id="container">
    <div id="configSelect" class="uk-card fade uk-card-primary uk-card-body">
      <span id="teaserIcon" uk-icon="icon: server; ratio: 2;"></span>

      <!-- Config name tabs -->
      <div class="uk-child-width-1-2@s" uk-grid>
        <div class="uk-width-1-5@s">
          <ul class="uk-tab-left" uk-tab>
            <li class="config-list-item" v-for="config in configs" :key="config" :class="{ 'uk-active': selectedConfig == config }" @click="selectedConfig = config">
              <a class="config-list-item-text" href="#">{{ config }}</a>
            </li>
          </ul>
        </div>

        <!-- Config details pane -->
        <div v-if="configs.length > 0">
          <h1>{{ selectedConfig }}</h1>
          Config details go here
        </div>

        <div v-else>
          <p class="placeholder-text">No configurations. Create one <router-link to="/configure">here</router-link></p>
        </div>
      </div>

    </div>
  </div>
</template>


<style scoped>

#container {
  float: right;
}

.placeholder-text {
  font-size: 24px;
  color: white;
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

#configSelect:hover {
  transition: all 1s;
  clip-path: circle(100%);
}

#teaserIcon {
  float: right;
}

</style>


<script>
function empty(obj) {
  return obj.toString.length == 0
}


export default {
  name: "configSelect",
  data() {
    return {
      configs: [],
      selectedConfig: {}
    };
  },
  mounted() {
    window.a = this;
    this.getAllConfigs();
  },
  methods: {
    getAllConfigs() {
      // To this
    },

    selectConfig(config) {
      this.selectedConfig = config;
      // Emit something here
    }
  }
};
</script>
