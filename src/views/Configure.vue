<template>
  <div>
    <Notification v-for="n in notifications" :key="n.id" :message="n.message" :status="n.status" :ref="'notification' + n.id" />

    <div class="uk-section-muted" uk-grid>
      <!-- Config Select or Input -->
      <div class="uk-width-1-2@m uk-align-center">
        <!-- Lets you select an existing config or create a new one -->
        <NewConfigInput @selectedConfig="selectConfig($event)" />
      </div>
    </div>

    <div class="uk-section" uk-grid>
      <div class="uk-width-1-1@s">
        <div class="uk-container">
          <!-- Next thingy goes here -->
          <ConfigDetailsInput v-if="config.id" :config="config" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import NewConfigInput from '@/components/NewConfigInput.vue';
import Notification from '@/components/Notification.vue';
import ConfigDetailsInput from '@/components/ConfigDetailsInput.vue';

export default {
  name: 'Configure',
  components: {
    NewConfigInput,
    Notification,
    ConfigDetailsInput,
  },
  data() {
    return {
      config: {},
      configs: [],
      notifications: []
    }
  },
  mounted() {
    Object.assign(this.config, this.emptyConfig);
    window.configure = this;
  },
  methods: {
    selectConfig(config) {
      this.config = config;
    },
    notify(message, status="") {
      let id = Math.floor(Math.random() * 100000000);
      this.notifications.push({
        message: message,
        status: status,
        id: id
      });
    }
  }
}
</script>


<style scoped>

</style>
