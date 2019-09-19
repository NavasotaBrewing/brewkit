<template>
  <div id="newConfigCardWrapper">
    <div id="newConfigCard" class="uk-card uk-card-default">
      <div class="uk-card-body">
        <div class="uk-card-title">Create a Configuration</div>
        <div uk-grid>
          <div class="uk-width-1-2@s">
            <input type="text" v-model="currentConfig.name" placeholder="New Configuration Name" class="uk-input" />
          </div>
          <div class="uk-width-1-2@s">
            <select name="configSelect" id="configSelect" class="uk-select">
              <option value selected disabled>-- Select to Edit --</option>
              <option value="1">test</option>
              <option value="2">test</option>
              <option value="3">test</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewConfigInput",
  data() {
    return {
      currentConfig: {},
      emptyConfig: {
        name: "",
        description: "",
        id: "",
        mode: "Read",
        slackWebhook: "",
        slackChannel: "",
        RTUs: []
      },
      emptyRTU: {
        name: "",
        location: "",
        id: "",
        ipv4: "",
        devices: []
      },
      emptyDevice: {
        STR1: {
          driver: "STR1",
          addr: 0,
          controller_addr: 0,
          name: "",
          state: "On",
          id: ""
        },
        Omega: {
          driver: "Omega",
          name: "",
          addr: 0,
          pv: 0,
          sv: 0,
          controller_addr: 0,
          id: "",
          state: "On"
        }
      }
    };
  },
  mounted() {
    window.nci = this
    Object.assign(this.currentConfig, this.emptyConfig);
  }
};
</script>

<style scoped>
#newConfigCardWrapper {
  padding: 1em;
}

.uk-card-title {
  margin-bottom: 1em;
}

#newConfigCard {
  background-color: white;
  border-left: 0.6em solid #a85b60;
}
</style>
