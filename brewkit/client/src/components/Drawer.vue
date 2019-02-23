<template>
  <div id="drawer">
    <vk-navbar>
      <vk-navbar-nav class="uk-margin-left">
        <vk-navbar-item @click="show = true" class="cursor">
          <vk-icon icon="menu" ratio="1.5"></vk-icon>
        </vk-navbar-item>
      </vk-navbar-nav>
    </vk-navbar>

    <vk-offcanvas-content>
      <vk-offcanvas overlay :show.sync="show">
        <vk-offcanvas-close @click="show = false"></vk-offcanvas-close>
        <vk-nav type="primary">
          <vk-nav-item href="/" title="Dashboard"></vk-nav-item>
          <vk-nav-item href="/configure" title="Configure"></vk-nav-item>
          <vk-nav-item href="/procedures" title="Procedures"></vk-nav-item>
          <hr>
          <select v-model="configSelect" class="uk-select">
            <option value>Select a Configuration</option>
            <option v-for="config in configs" :key="config.id" :value="config.id">{{ config.name }}</option>
          </select>
          <hr>
          <vk-nav-item title="Login"></vk-nav-item>
        </vk-nav>
      </vk-offcanvas>
    </vk-offcanvas-content>
  </div>
</template>

<script>
import api from "@/api";
export default {
  name: "drawer",
  props: [],
  data: function() {
    return {
      show: false,
      configs: [],
      configSelect: ""
    };
  },
  async created() {
    this.refreshConfigurations();
  },
  watch: {
    configSelect: function() {
      let id = this.configSelect;
      let config = {};
      if (id != "") {
        config = this.configs.find(c => c.id == id);
      }
      this.$emit("config", config);
    }
  },
  methods: {
    async refreshConfigurations() {
      this.configs = await api.getConfigurations();
    }
  }
};
</script>

<style>
  .cursor:hover {
    cursor: pointer;
  }
</style>
