<template>
  <div id="app">

    <Navbar />
    <ConfigSelect />

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
  components: {
    Navbar,
    ConfigSelect
  }
}
</script>
