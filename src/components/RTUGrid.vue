<template>
  <div id="RTUGrid" uk-grid="masonry: true" class="uk-visible@m uk-width-expand uk-grid-small">
    <div v-for="rtu in rtus" :key="rtu.id">
      <RTU @remove="$emit('remove', rtu.id)" :rtu="rtu"></RTU>
    </div>
  </div>
</template>

<script>
import RTU from "@/components/RTU.vue";

export default {
  name: "RTUGrid",
  props: ["rtus"],
  components: {
    RTU
  }
};
</script>
