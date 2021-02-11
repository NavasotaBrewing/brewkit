<template>
  <div id="home">
    <Layout v-if="$root.config.id != undefined"></Layout>
    <div v-else>
      <div class="uk-container uk-text-center uk-margin-top">
        <p class="uk-text-lead">Select a configuration with the box above.</p>
      </div>
    </div>
    <div id="statusBar">{{ $root.statusMsg }}</div>
  </div>

</template>

<style>
#home {
  padding: 10px;
}

#statusBar {
  font-family: 'Mono';
  font-size: 14px;
  position: fixed;
  right: 0;
  bottom: 0;
  margin-right: 10px;
}
</style>

<script>
import Layout from "@/components/layout/Layout.vue";

export default {
  name: "home",
  components: {
    Layout,
  },
  data: function () {
    return {};
  },
  methods: {
    
  },
  mounted() {
    window.home = this;
  },
};
</script>
