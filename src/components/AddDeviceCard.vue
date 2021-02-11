<template>
  <Card :title="'New Device'" :type="'tertiary'">
    <div class="uk-margin">
      <label for="newDeviceDriver">Driver</label>
      <select name="driver" id="newDeviceDriver" v-model="newDevice.driver" class="uk-select">
        <option value disabled>-- Driver --</option>
        <option value="STR1">STR1</option>
        <option value="Omega">Omega</option>
      </select>
    </div>

    <div class="uk-margin">
      <label for="newDeviceRTU">RTU</label>
      <select v-model="newDevice.rtu" id="newDeviceRTU" class="uk-select">
        <option value disabled>-- RTU --</option>
        <option v-for="rtu in rtus" :key="rtu.id" :value="rtu.id">{{ rtu.name }}</option>
      </select>
    </div>

    <div class="uk-margin">
      <label for="newDeviceName">Name</label>
      <input
        type="text"
        v-model="newDevice.name"
        placeholder="Name"
        class="uk-input"
        id="newDeviceName"
      />
    </div>

    <div v-if="newDevice.driver == 'STR1'" class="uk-margin">
      <label for="newDeviceAddr">Address</label>
      <input
        type="text"
        v-model="newDevice.addr"
        placeholder="Address"
        class="uk-input"
        id="newDeviceAddr"
      />
    </div>

    <div class="uk-margin">
      <label for="newDeviceControllerAddr">Controller Address</label>
      <input
        type="text"
        v-model="newDevice.controller_addr"
        placeholder="Controller Address"
        class="uk-input"
        id="newDeviceControllerAddr"
      />
    </div>

    <div class="uk-margin">
      <button @click="addDevice" class="uk-button button-tertiary">Add</button>
    </div>
  </Card>
</template>

<script>
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
  name: "AddDeviceCard",
  props: {
    rtus: {
      type: Array,
      required: true
    }
  },
  components: {
    Card
  },
  data() {
    return {
      newDevice: {}
    };
  },
  methods: {
    addDevice() {
      if (
        empty(this.newDevice.name) ||
        empty(this.newDevice.driver) ||
        empty(this.newDevice.controller_addr || empty(this.newDevice.rtu))
      ) {
        this.$root.notify("Please fill in all required fields", "danger");
        return;
      }

      let vessel = {};
      Object.assign(vessel, this.newDevice);

      vessel.id = uuid();
      vessel.state = "Off"

      this.newDevice.name = "";
      this.newDevice.driver = "";
      this.newDevice.rtu = "";
      this.newDevice.controller_addr = "";
      this.newDevice.addr = "";

      this.$emit("newDevice", vessel);
    }
  }
};
</script>
