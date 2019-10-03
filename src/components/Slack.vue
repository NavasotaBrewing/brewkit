<template>
  <div id="Slack">
    <Card :type="'primary'" :title="'Slack'">
      <div class="uk-margin">
        <textarea
          :disabled="!webhook"
          v-model="slackMessage"
          name="slackMessage"
          id="slackMessage"
          cols="30"
          placeholder="Slack Message"
          rows="3"
          class="uk-textarea"
        ></textarea>
        <div class="uk-margin">
          <button :disabled="!webhook" @click="send" class="uk-button button-primary">Send</button>
          &nbsp;
          <span
            id="showReplPaneIcon"
            @click="showReplPane = !showReplPane"
            uk-icon="icon: info; ratio: 1.3"
          ></span>
        </div>
        <i>Posting to {{ channel }}</i>
      </div>
    </Card>

    <div :class="{ 'showReplPane': showReplPane }" id="replPane">
      <span @click="showReplPane = !showReplPane" id="closeButton" uk-icon="icon: close; ratio: 2"></span>
      <h1 class="uk-heading-small">Replacements</h1>

      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repl in replacements" :key="repl.pattern">
            <td>{{ repl.pattern }}</td>
            <td>{{ repl.value() }}</td>
            <td>{{ repl.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import Card from "@/components/Card.vue";
import Slack from "@/slack.js";

export default {
  name: "Slack",
  props: ["webhook", "channel"],
  components: {
    Card
  },

  data() {
    return {
      slackMessage: "",
      showReplPane: false,
      replacements: [
        {
          pattern: "{time}",
          value: function() {
            return new Date().toLocaleTimeString();
          },
          desc: "The current time, eg. 8:15:00 PM"
        }
      ]
    };
  },

  methods: {
    notify(msg, status = "") {
      this.$parent.notify(msg, status);
    },

    processMessage() {
      var replace;
      var re;
      this.replacements.forEach(repl => {
        re = new RegExp(repl.pattern, "g");
        this.slackMessage = this.slackMessage.replace(re, repl.value);
      });
    },

    send() {
      if (this.slackMessage == "") {
        this.notify("Type a message to send", "danger");
        return;
      }

      this.processMessage();

      Slack.send(this.webhook, this.slackMessage);
      this.notify("Message sent", "success");
      this.slackMessage = "";
    }
  },

  mounted() {
    window.slack = this;
  }
};
</script>


<style scoped>
.pattern {
  font-family: "Courier New", Courier, monospace;
  font-size: 20px;
  display: inline;
}

#closeButton {
  position: relative;
  float: right;
  top: 10px;
  right: 0;
  color: white;

  margin: 1em;
  cursor: pointer;
}

#replPane * {
  color: white !important;
}

#replPane {
  width: 500px;
  height: 50vh;
  position: fixed;
  z-index: 5;

  right: 0;
  bottom: 0;

  border-top-left-radius: 15px;

  padding-left: 4em;
  color: white;

  transition: clip-path 1s;
  clip-path: circle(0% at 100% 100%);
  background-color: var(--color-secondary);
}

@media only screen and (max-width: 500px) {
  #replPane {
    width: 100vw;
  }
}

.showReplPane {
  clip-path: circle(150% at 100% 100%) !important;
}

#showReplPaneIcon {
  cursor: pointer;
}
</style>
