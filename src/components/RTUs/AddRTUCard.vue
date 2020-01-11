<template>
  <div>
    <Card :type="'secondary'" :title="'New RTU'">
      <div class="uk-margin">
        <label for="newRTUId">ID</label>
        <input type="text" v-model="newRTU.id" id="newRTUId" placeholder="ID" class="uk-input" />
      </div>

      <div class="uk-margin">
        <label for="newRTUName">Name</label>
        <input
          type="text"
          v-model="newRTU.name"
          id="newRTUName"
          placeholder="Name"
          class="uk-input"
        />
      </div>

      <div class="uk-margin">
        <label for="newRTULocation">Location</label>
        <input
          type="text"
          class="uk-input"
          v-model="newRTU.location"
          placeholder="Location"
          id="newRTULocation"
        />
      </div>

      <div class="uk-margin">
        <label for="RTUAddrInput">Address</label>
        <code>
          <div class="uk-inline uk-width-1-1">
            <span class="uk-form-icon uk-margin-left">http://</span>
            <input v-model="newRTU.ipv4" id="RTUAddrInput" placeholder="RTU Address" type="text" class="uk-input" />
            <a
              class="uk-form-icon uk-form-icon-flip"
              @click="testRTUConnection"
              uk-tooltip="IP and port of the RTU server. Click here to test connection"
              uk-icon="info"
            />
          </div>
        </code>
      </div>

      <div class="uk-margin">
        <button @click="addRTU" class="uk-button button-secondary">Add</button>
      </div>
    </Card>
  </div>
</template>

<script>
import axios from "axios";

import Card from "@/components/Card.vue";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function empty(thing) {
  return thing == "";
}

export default {
  name: "AddRTUCard",
  components: {
    Card
  },
  data() {
    return {
      newRTU: {
        id: "",
        name: "",
        ipv4: "",
        devices: [],
        location: ""
      }
    };
  },
  methods: {
    notify(msg, status = "") {
      this.$parent.notify(msg, status);
    },

    addRTU() {
      if (empty(this.newRTU.name) || empty(this.newRTU.ipv4)) {
        this.notify("Please fill in all required fields", "danger");
        return;
      }

      if (empty(this.newRTU.id)) {
        this.newRTU.id = uuid();
      }
      console.log(this.newRTU.id);
      this.newRTU.devices = [];

      let vessel = {};
      Object.assign(vessel, this.newRTU);

      this.newRTU.name = "";
      this.newRTU.id = "";
      this.newRTU.location = "";
      this.newRTU.ipv4 = "";
      console.log(vessel);

      this.$emit("newRTU", vessel);
    },

    testRTUConnection() {
      console.log("running");
      if (this.newRTU.ipv4 == "") {
        this.notify("Enter an RTU address before testing");
        return;
      }

      let addr = "http://" + this.newRTU.ipv4 + "/running";

      axios.get(addr)
        .then(resp => {
          console.log(resp);
          if (resp.data.running) {
            this.notify("RTU running", 'success');
          }
        })
        .catch(err => {
          console.log(err);
          this.notify("Could not connect to RTU", "danger");
        });
    }
  }
};
</script>

<style scoped>
#RTUAddrInput {
  padding-left: 70px !important;
}
</style>
