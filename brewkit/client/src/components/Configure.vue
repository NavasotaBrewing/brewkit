<template>
  <div id="configure">
    <!-- Create section -->
    <div class="uk-section">
      <div class="uk-container">
        <vk-grid class="uk-child-width-expand@s" divided>
          <div>
            <h2 class="uk-heading-secondary">Create a Configuration</h2>
            <p>Enter a name to create a new one, or select one in the navbar to edit</p>
            <div class="uk-margin">
              <input v-model="config.name" class="uk-input saverInput" type="text" placeholder="Configuration Name">
            </div>
            <div class="uk-margin">
            </div>
              <input type="text" v-model="config.websocket" class="uk-input" placeholder="WebSocket Address">
            <div class="uk-margin">
              <p v-if="config.id">Configuration ID: <code>{{ config.id }}</code></p>
            </div>
            <div class="uk-margin">
              <button @click="saveConfiguration" class="uk-button uk-button-primary">Save</button>
              <button @click="deleteConfiguration" class="uk-button uk-button-danger">Delete</button>
            </div>
          </div>
          <div>
            <h2 class="uk-heading-secondary">Slack</h2>
            <div class="uk-margin">
              <input v-model="config.slackWebhook" class="uk-input saverInput" type="text" placeholder="Slack Webhook">
            </div>
            <div class="uk-margin">
              <input v-model="config.slackChannel" class="uk-input saverInput" type="text" placeholder="Slack Channel">
            </div>
            <div class="uk-margin">
              <button :disabled="!config.slackWebhook" @click="testSlack" class="uk-button uk-button-primary">Test</button>
            </div>
          </div>
        </vk-grid>
      </div>
    </div>

    <!-- Device Section -->
    <div v-if="config.id" class="uk-section uk-section-muted">
      <div class="uk-container">
        <vk-grid>
          <!-- New Device -->
          <div class="uk-width-1-3">
            <div class="uk-card uk-card-default uk-card-body">
              <form id="newDevice">
                <h4>New Device</h4>
                <!-- Name -->
                <div class="uk-margin">
                  <input v-model="newDevice.name" class="uk-input" type="text" placeholder="Name" required>
                </div>
                <!-- Type -->
                <div class="uk-margin">
                  <select v-model="newDevice.type" class="uk-select" required>
                    <option value="divert">Divert Valve</option>
                    <option value="onOff">On/Off Valve</option>
                    <option value="pump">Pump</option>
                    <option value="thermostat">Thermostat</option>
                  </select>
                </div>
                <!-- Address -->
                <div class="uk-margin">
                  <input v-show="newDevice.type != 'thermostat'" v-model="newDevice.address" class="uk-input" type="text" placeholder="Address">
                </div>
                <!-- Controller Address -->
                <div class="uk-margin">
                  <input v-model="newDevice.controller_address" class="uk-input" type="text" placeholder="Controller Address" required>
                </div>
                <!-- On/Off state -->
                <div class="uk-margin">
                  <vk-grid class="uk-child-width-expand@m">
                    <div>
                      <input v-model="newDevice.states['0']" class="uk-input" type="text" placeholder="Off State" required>
                    </div>
                    <div class="uk-width-1-6">
                      or
                    </div>
                    <div>
                      <input v-model="newDevice.states['1']" class="uk-input" type="text" placeholder="On State" required>
                    </div>
                  </vk-grid>
                </div>
              </form>
              <!-- Save -->
              <button @click="addDevice()" class="uk-button uk-button-primary">Save</button>
            </div>
          </div>

          <!-- Device Display -->
          <div class="uk-width-2-3">
            <vk-grid class="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="masonry: true">
              <div v-for="device in config.devices" :key="device.id">
                <div class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle">
                  <div class="uk-card-body">
                    <dl>
                      <dt>{{ device.name }}</dt>
                      <dd>Type: {{ device.type }}</dd>
                      <dd v-show="device.type != 'thermostat'">Address: {{ device.address }}</dd>
                      <dd>Controller Address: {{ device.controller_address }}</dd>
                      <dd>States: {{ device.states[0] }} or {{ device.states[1] }}</dd>
                    </dl>
                    <a @click="removeDevice(device)">Remove</a>
                  </div>
                </div>
              </div>
            </vk-grid>
          </div>
        </vk-grid>
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/api'
import Slack from '@/Slacker'
export default {
  name: 'configure',
  props: ['config'],
  data: function () {
    return {
      newDevice: {
        name: '',
        type: '',
        states: {
          '0': '',
          '1': '',
        },
        state: '',
        address: '',
        controller_address: '',
      }
    }
  },
  created() {
    this.newDevice = this.blankDevice()
  },
  methods: {
    async saveConfiguration() {
      if (this.config.id) {
        // Update
        api.updateConfiguration(this.config.id, this.config)
        this.$parent.notify('Configuration updated');
      } else {
        // Create
        this.$parent.setConfig(await api.createConfiguration(this.config))
        this.$parent.notify('Configuration saved');
      }
    },
    async deleteConfiguration() {
      if (confirm('Are you sure?')) {
        api.deleteConfiguration(this.config.id);
        this.$parent.setConfig({})
        this.$parent.notify('Configuration deleted')
        this.$parent.refreshConfigurations();
      }
    },

    guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    blankDevice() {
      return Object.assign({}, {
        name: '',
        type: '',
        states: {
          '0': '',
          '1': '',
        },
        state: '',
        address: '',
        controller_address: '',
      })
    },

    formComplete(formId) {
      let form = document.forms[formId]
      return form.reportValidity();
    },

    addDevice() {
      if (!this.formComplete('newDevice')) {
        return;
      }

      if (!this.config.devices) {
       this.config.devices = [];
      }

      this.newDevice.id = this.guid()

      if (this.newDevice.type == 'thermostat') {
        this.newDevice.pv = 50
        this.newDevice.sv = 50
      }

      let temp = Object.assign({}, this.newDevice);
      this.config.devices.push(temp);
      this.newDevice = this.blankDevice();
    },

    removeDevice(device) {
      this.config.devices = this.config.devices.filter(d => d.id != device.id)
    },

    testSlack() {
      this.$parent.notify('Message sent. Did you get it?')
      Slack.send('It works!', this.config.slackWebhook);
    }
  }
}
</script>
