<template>
  <div id="app">

    <Navbar />
    <!-- <FancyConfigSelect @selectConfig="selectConfig($event)" /> -->

    <router-view/>
  </div>
</template>

<style scoped>
/*
Colors
 - #EDB271 - Burly wood
 - #83315E - Eggplant
 - #A85B60 - Violet red
 - #A22455 - Rich purple
*/
</style>

<script>
import Navbar from '@/components/Navbar.vue';
// import FancyConfigSelect from '@/components/FancyConfigSelect';

export default {
  data() {
    return {
      config: {}
    }
  },
  mounted() {
    window.app = this
  },
  components: {
    Navbar
  },
  methods: {
    selectConfig(config) {
      this.config = config;
    }
  }
}
</script>
