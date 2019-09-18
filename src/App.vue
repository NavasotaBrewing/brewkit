<template>
  <div id="app">

    <Navbar />
    <ConfigSelect />

    <router-view/>
  </div>
</template>


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
