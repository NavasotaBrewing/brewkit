<template>
  <div id="customFooter">
    <div class="uk-section uk-section-muted">
      <div class="uk-container">
        <vk-grid class="uk-child-width-1-3@m" gutter="large">
          <div id="footerLeft" class="uk-text-truncate">
            <h4>Find Us</h4>
            <ul class="uk-list">
              <li>
                <a class="uk-link-muted" target="_new" href="http://navasotabrewing.com">
                  <img src="@/assets/logo.png" width="20px" class="tilt" alt="Navasota Brewing.com">
                  Navasota Brewing.com
                </a>
              </li>
              <li>
                <a class="uk-link-muted" target="_new" href="http://navasotabrewing.slack.com">
                  <img
                    src="@/assets/slack_icon.png"
                    width="20px"
                    class="tilt"
                    alt="Slack | Navasota Brewing Cooperative"
                  >
                  Slack
                </a>
              </li>
              <li>
                <a class="uk-link-muted" target="_new" href="http://github.com/NavasotaBrewing">
                  <vk-icon icon="github-alt" class="tilt"></vk-icon>
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div id="footerCenter" class="uk-text-truncate"></div>
          <div id="footerRight" class="uk-text-truncate uk-margin-auto-top uk-text-right">
            Last updated {{ prettyLastUpdate() }}
          </div>
        </vk-grid>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { setInterval } from 'timers';
export default {
  name: "customFooter",
  props: ["lastUpdate"],
  data: function() {
    return {};
  },
  methods: {
    prettyLastUpdate() {
      let str = moment(this.lastUpdate).fromNow();
      if (str == "Invalid date") {
        str = "a while back";
      }
      return str;
    }
  },
  mounted() {
    setInterval(() => {
      this.$forceUpdate();
    }, 30000);
  }
};
</script>
