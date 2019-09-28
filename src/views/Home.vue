<template>
  <div class="home">
    <div class="uk-container">
      <div uk-grid class="uk-margin-top">
        <div class="uk-width-1-2">
          <Timer></Timer>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';

export default {
  name: 'home',
  components: {
    Timer
  },

  methods: {
    notify(msg, status = '') {
      this.$parent.notify(msg, status);
    }
  }
}
</script>
