<template>
  <div>
    <Card :type="'secondary'" :title="'New RTU'">
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
        <label for="newRTUIPV4">Address</label>
        <input
          type="text"
          class="uk-input"
          v-model="newRTU.ipv4"
          placeholder="Address"
          id="newRTUIPV4"
        />
      </div>

      <div class="uk-margin">
        <button @click="addRTU" class="uk-button button-secondary">Add</button>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function empty(thing) {
  return thing == '';
}


export default {
  name: "AddRTUCard",
  components: {
    Card
  },
  data() {
    return {
      newRTU: {}
    }
  },
  methods: {
    notify(msg, status='') {
      this.$parent.notify(msg, status);
    },

    addRTU() {
      if (empty(this.newRTU.name.length) || empty(this.newRTU.ipv4.length)) {
        this.notify("Please fill in all required fields", 'danger');
        return;
      }

      this.newRTU.id = uuid();

      let vessel = {};
      Object.assign(vessel, this.newRTU)

      this.newRTU.name = '';
      this.newRTU.id = '';
      this.newRTU.location = '';
      this.newRTU.ipv4 = '';

      this.$emit('newRTU', vessel);
    },
  }
};
</script>
