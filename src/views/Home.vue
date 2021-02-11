<template>
  <div id="home">
      <pre>{{ $root.config }}</pre>
      <button @click="$root.update('Read')" class="uk-button">Update (read)</button>
      <button @click="$root.update('Write')" class="uk-button">Update (write)</button>
    <Layout v-if="$root.config.id != undefined"></Layout>
    <div v-else>
      <div class="uk-container uk-text-center uk-margin-top">
        <p class="uk-text-lead">Select a configuration with the box above.</p>
      </div>
    </div>
  </div>
</template>

<style>
#home {
  padding: 10px;
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
