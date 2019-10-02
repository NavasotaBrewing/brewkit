<template>
  <div class="home">
    <div class="uk-container">
      <div uk-grid class="uk-margin-top">
        <div class="uk-width-1-2@m">
          <Timer />
        </div>
        <div class="uk-width-1-2@m">
          <Slack :channel="config.slackChannel" :webhook="config.slackWebhook" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import Slack from '@/components/Slack.vue';

export default {
  name: 'home',
  components: {
    Timer,
    Slack
  },

  data() {
    return {
      // config: {id: 1, slackWebhook: "https://hooks.slack.com/services/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", slackChannel: "@luke"}
      config: {},
    }
  },

  methods: {
    notify(msg, status = '') {
      this.$parent.notify(msg, status);
    }
  }
}
</script>
