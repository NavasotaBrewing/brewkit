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

 - #325F41 - Muted Green
 - #D5D6CE - Creamish
 - #582329 - Dark - slight purple
 - #C56B39 - light tan
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


<style>
.uk-input:focus, .uk-select:focus {
  border: 1px solid #EDB271 !important;
}

.uk-button-primary {
  background-color: #EDB271 !important;
}
.uk-button-primary:hover {
  background-color: rgb(212, 158, 100) !important;
}

.uk-button-danger {
  background-color: #A22455 !important;
  color: white;
}
.uk-button-danger:hover {
  background-color: rgb(129, 31, 68) !important;
}

</style>
