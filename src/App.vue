<template>
  <div id="app">

    <Navbar />
    <ConfigSelect @selectConfig="selectConfig($event)" />

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
import ConfigSelect from '@/components/ConfigSelect';

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
    Navbar,
    ConfigSelect
  },
  methods: {
    selectConfig(config) {
      this.config = config;
    }
  }
}
</script>
