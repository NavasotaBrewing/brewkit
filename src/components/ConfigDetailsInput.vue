<template>
  <div id="ConfigDetailsInput">
    <div class="uk-card uk-card-primary">
      <div class="uk-card-body">
        <div uk-grid>

          <div class="uk-width-1-2@m">
            <div class="uk-margin">
              <label for="configName" class="uk-label">Name</label>
              <input type="text" id="configName" v-model="config.name" class="uk-input" placeholder="Configuration Name">
            </div>
            <div class="uk-margin">
              <label for="configDescription" class="uk-label">Description</label>
              <textarea name="description" id="configDescription" cols="30" rows="5" placeholder="Description" class="uk-textarea"></textarea>
            </div>
          </div>

          <div class="uk-width-1-2@m">
            <div class="uk-margin">
              <label for="slackWebhook" class="uk-label">Slack Webhook</label>
              <code>
                <input type="text" id="slackWebhook" class="uk-input" v-model="config.slackWebhook" placeholder="Slack Webhook">
              </code>
            </div>
            <div class="uk-margin">
              <label for="slackChannel" class="uk-label">Slack Channel</label>
              <code>
                <input type="text" id="slackChannel" class="uk-input" v-model="config.slackChannel" placeholder="Slack Channel">
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.uk-input, .uk-textarea {
  border: 1px solid rgba(0, 0, 0, 0.2) !important;
}

.uk-label {
  font-size: 18px;
}

.uk-title {
  margin-bottom: 0.5em;
}

/* label {
  font-weight: bold;
  font-size: 24px;
  text-decoration: underline;
} */

/* Make all text this shade of black */
#ConfigDetailsInput * {
  color: rgb(63, 63, 63) !important;
}

#ConfigDetailsInput {

}

</style>

<script>
export default {
  name: "ConfigDetailsInput",
  props: ['config'],
  data() {
    return {

    }
  },
  mounted() {
    window.cdi = this
  }
}
</script>
