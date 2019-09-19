<template>
  <div>
    <div class="uk-section-muted" uk-grid>
      <!-- Config Select or Input -->
      <div class="uk-width-1-2 uk-align-center">
        <!-- Lets you select an existing config or create a new one -->
        <NewConfigInput @selectedConfig="selectConfig($event)" />
      </div>
    </div>
  </div>
</template>

<script>

import NewConfigInput from '@/components/NewConfigInput.vue';

export default {
  name: 'Configure',
  components: {
    NewConfigInput
  },
  data() {
    return {
      config: {}
    }
  },
  methods: {
    selectConfig(config) {
      this.config = config;
    }
  }
}
</script>


<style scoped>

</style>
