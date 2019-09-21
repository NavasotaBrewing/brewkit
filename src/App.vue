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

 - Almost black (text) - rgb(63, 63, 63)
*/
</style>

<script>
import Navbar from '@/components/Navbar.vue';
// import FancyConfigSelect from '@/components/FancyConfigSelect';

export default {
  data() {
    return {
      config: {},
      configs: []
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
/* Global styles */
/* ------------- */
/* Mostly overriding uikit colors */

/* Cards */
.uk-card-primary {
  background-color: white !important;
  border-left: 0.6em solid #EDB271;
}

.uk-card-primary .uk-card-body {
  color: rgb(63, 63, 63) !important;
}


/* Inputs */
.uk-input:focus, .uk-select:focus, .uk-textarea:focus {
  border: 1px solid #EDB271 !important;
}


/* Buttons */
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

.uk-button-success {
  background-color: rgb(64, 136, 88) !important;
  color: white !important;
}
.uk-button-success:hover {
  background-color: rgb(58, 117, 77) !important;
}

</style>
