<template>
  <div class="home">

    <div class="uk-container">
      <Timer></Timer>
    </div>

  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';

export default {
  name: 'home',
  components: {
    Timer
  }
}
</script>
