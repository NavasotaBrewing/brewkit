<template>
  <div class="home">
    <!-- Tools -->
    <div class="uk-section">
      <div class="uk-container">
        <div uk-grid class="uk-grid-column-small">
          <div class="uk-width-1-2@m">
            <Timer />
          </div>
          <div class="uk-width-1-2@m">
            <Slack :channel="config.slackChannel" :webhook="config.slackWebhook" />
          </div>
        </div>
      </div>
    </div>

    <!-- Devices -->
    <div class="uk-section-muted">
      <div class="uk-container uk-margin-top uk-padding">

        <ul class="uk-subnav uk-subnav-pill" uk-switcher="connect: .switcher-container">
          <li>
            <a>Active</a>
          </li>
          <li>

            <a href="#">Test</a>
          </li>
        </ul>

        <ul class="uk-switcher switcher-container uk-margin">
          <li>Hello!</li>
          <li>Hel!</li>
          <li>Hello!</li>
          <li>Hello!</li>
          <li>Hello!</li>
          <li>Hello!</li>
          <li>Hello!</li>
          <li>Hello!</li>
          <li>Hello!</li>
        </ul>


      </div>
    </div>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import Slack from "@/components/Slack.vue";
import Card from "@/components/Card.vue";

export default {
  name: "home",
  components: {
    Timer,
    Slack,
    Card
  },

  data() {
    return {
      // config: {id: 1, slackWebhook: "https://hooks.slack.com/services/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", slackChannel: "@luke"}
      config: {}
    };
  },

  methods: {
    notify(msg, status = "") {
      this.$parent.notify(msg, status);
    }
  }
};
</script>
