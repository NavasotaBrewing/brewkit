<template>
  <div id="slack">
    <div class="uk-container">
      <h1 class="uk-heading-primary">
        Slack
        <a href="http://navasotabrewing.slack.com" target="_new">
          <img src="@/assets/slack_circular.png" width="40" alt="Navasota Brewing on Slack" class="uk-align-right tilt cursor">
        </a>
      </h1>
      <p v-show="channel" class="uk-text-meta">Posting to {{ channel }}</p>
      <textarea :disabled="!webhook" v-model="text" cols="30" rows="4" class="uk-textarea"></textarea>
      <div class="uk-margin">
        <button :disabled="!webhook" @click="send" class="uk-button uk-button-primary">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import Slacker from '@/Slacker'
export default {
  name: 'slack',
  props: ['webhook', 'channel'],
  data: function() {
    return {
      text: ''
    }
  },
  methods: {
    validate () {
      if (this.text == '') {
        return false;
      }
      return true;
    },
    send () {
      if (this.validate()) {
        Slacker.send(this.text, this.webhook)
        this.text = ''
      }
    }
  }
}
</script>


<style>
  .cursor:hover {
    cursor: pointer;
  }

  .tilt {
    border-radius: 50%;
    -webkit-transition: -webkit-transform .2s ease-in-out;
    transition: transform .2s ease-in-out;
  }
  .tilt:hover {
    -webkit-transform: rotate(-29deg);
    transform: rotate(-29deg);
  }
</style>
