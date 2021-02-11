<template>
  <div id="navBarWrapper">
    <nav id="mainNavbar" class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul id="navItems" class="uk-navbar-nav">
          <li
            v-for="route in $router.options.routes"
            :key="route.path"
            :class="{ 'uk-active': route.path == $route.path }"
          >
            <router-link :to="route.path">{{ route.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <a target="_blank" href="http://navasotabrewing.com/">
            <!-- TODO: serve this -->
            <img id="mapleLeaf" class="uk-visible@s"
              width="40px"
              src="https://cdn1.iconfinder.com/data/icons/agriculture-13/48/7-512.png"
              alt="Navasota Brewing Cooperative"
            />
          </a>
        </ul>
      </div>
      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li class="uk-margin-right">
            <!-- We disable this on the configure page, it has it's own select -->
            <select v-model="configSelect" @click="fetchConfigs" :disabled="$route.path == '/configure'" class="uk-select">
              <option value="-1" selected>Select a Configuration</option>
              <option v-for="config in configs" :key="config.id" :value="config.id">{{ config.name }}</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>

#navBarWrapper {
  z-index: -1;
}

#navItems {
  margin-left: 1em;
}
</style>


<script>
import api from "@/api.js";

export default {
  name: "Navbar",
  data() {
    return {
      configSelect: -1,
      configs: []
    }
  },

  methods: {
    async fetchConfigs() {
      this.configs = await api.getConfigurations();
    },

    selectConfig() {
      let found = this.configs.find(config => config.id == this.configSelect);
      if (found) {
        this.$root.config = found;
        this.$root.update('Read');
      } else {
        this.$root.config = {};
      }
    }
  },

  mounted() {
    this.fetchConfigs();
  },

  watch: {
    configSelect: function() {
      this.selectConfig();
    }
  }

};
</script>
