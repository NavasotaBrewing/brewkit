<template>
  <div id="topNavBar">
    <vk-navbar>
      <!-- Navbar left side -->
      <vk-navbar-nav class="uk-margin-left">
        <vk-navbar-nav-item href="/" title="Dashboard"></vk-navbar-nav-item>
        <vk-navbar-nav-item href="/configure" title="Configure" mode="click"></vk-navbar-nav-item>
        <vk-navbar-nav-item href="/procedures" title="Procedures"></vk-navbar-nav-item>
        <vk-navbar-nav-item href="/view" title="View"></vk-navbar-nav-item>
      </vk-navbar-nav>
      <!-- Navbar Right Side -->
      <vk-navbar-nav slot="right">

        <!-- Configuration select -->
        <vk-navbar-item>
          <select id="configurationSelect" v-model="configSelect" class="uk-select">
            <option value="" selected>Select a Configuration</option>
            <option v-for="config in configs" :key="config.id" :value="config.id">{{ config.name }}</option>
          </select>
        </vk-navbar-item>

        <vk-navbar-nav-item title="Logout"></vk-navbar-nav-item>
        <vk-navbar-nav-item title="Login" ></vk-navbar-nav-item>
      </vk-navbar-nav>
    </vk-navbar>
  </div>
</template>

<script>
import api from '@/api'

export default {
  name: 'topNavBar',
  data: function() {
    return {
      configs: [],
      configSelect: ''
    }
  },
  async created() {
    this.refreshConfigurations();
    // window.nv = this
  },
  watch: {
    configSelect: function() {
      let config = this.configs.find(c => c.id == this.configSelect);
      console.log(config)
      this.$emit('config', config);
    }
  },
  methods: {
    async refreshConfigurations () {
      this.configs = await api.getConfigurations()
    }
  }
}
</script>
