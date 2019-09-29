<template>
  <div id="Slack">
    <Card :type="'primary'" :title="'Slack'">
      <div class="uk-margin">
        <textarea :disabled="!webhook" v-model="slackMessage" name="slackMessage" id="slackMessage" cols="30" placeholder="Slack Message" rows="5" class="uk-textarea"></textarea>
        <div class="uk-margin">
          <button :disabled="!webhook" @click="send" class="uk-button button-primary">Send</button>
        </div>
        <i class="uk-meta">Posting to {{ channel }}</i>
      </div>
    </Card>
  </div>
</template>


<script>
import Card from '@/components/Card.vue';
import Slack from '@/slack.js';

export default {
  name: 'Slack',
  props: ['webhook', 'channel'],
  components: {
    Card
  },

  data() {
    return {
      slackMessage: "",
      replacements: [
        {
          pattern: '{time}',
          value: function() {
            return new Date().toLocaleTimeString();
          }
        }
      ]
    }
  },

  methods: {
    notify(msg, status = '') {
      this.$parent.notify(msg, status);
    },

    processMessage() {
      var replace;
      var re;
      this.replacements.forEach(repl => {
        re = new RegExp(repl.pattern,"g");
        this.slackMessage = this.slackMessage.replace(re, repl.value);
      });
    },

    send() {
      if (this.slackMessage == '') {
        this.notify("Type a message to send", 'danger');
        return;
      }

      this.processMessage();

      Slack.send(this.webhook, this.slackMessage);
      this.notify("Message sent", 'success');
      this.slackMessage = '';
    }
  },
}
</script>


<style scoped>

</style>
