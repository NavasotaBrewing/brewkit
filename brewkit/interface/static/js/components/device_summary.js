// Don't use this directly, use DeviceSummary with :compact="true"
var CompactDeviceSummaryComponent = Vue.component('compact-device-summary', {
  props: {
    devices: {
      type: Array,
      required: true,
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  template: `
    <div id="compactDeviceSummary" class="uk-overflow-auto">
      <table class="uk-table uk-table-striped uk-table-small uk-table-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Temperature</th>
            <th class="uk-float-right">State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="device in devices">
            <!-- Name -->
            <td>{{ device.name }}</td>
            <!-- Temp input -->
            <td>
              <div v-if="device.type == 'thermostat'" class="uk-width-1-3@s">
                <input :disabled="!editable" type="tel" v-model="device.sv" class="uk-input uk-form-small"
                  placeholder="Target ˚">
              </div>
            </td>
            <!-- State -->
            <td class="uk-align-right">
              <span v-if="editable" @click="device.state = Math.abs(device.state - 1)" class="uk-label cursor" :class="{ 'uk-label-success': device.state, 'uk-label-danger': !device.state }">
                {{ device.states[device.state ? 1 : 0] }}
              </span>
              <span v-else class="uk-label" :class="{ 'uk-label-success': device.state, 'uk-label-danger': !device.state }">
                {{ device.states[device.state ? 1 : 0] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})


var DeviceSummaryComponent = Vue.component('device-summary', {
  props: {
    devices: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true,
    },
    'include-thermos': {
      type: Boolean,
      required: false,
      default: true
    },
    compact: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    valves: function() {
      return this.devices.filter(d => d.type != 'thermostat')
    },
    thermos: function() {
      return this.devices.filter(d => d.type == 'thermostat')
    }
  },
  components: {
    'compact-device-summary': CompactDeviceSummaryComponent,
  },
  methods: {
    setSv(thermo) {
      this.$emit('new-sv', thermo)
    }
  },
  template: `
    <div>
      <div v-if="compact">
        <compact-device-summary :devices="devices" :editable="editable" :include-thermos="includeThermos"></compact-device-summary>
      </div>
      <div v-if="!(valves.length < 1 && !includeThermos) && !compact" id="deviceSummary" uk-filter="target: #deviceFilter">
        <ul class="uk-subnav uk-subnav-pill">
          <li uk-filter-control=".device" class="uk-active"><a href="#">All</a></li>
          <li uk-filter-control=".tag-onOff"><a href="#">On/Off</a></li>
          <li uk-filter-control=".tag-divert"><a href="#">Diverts</a></li>
          <li uk-filter-control=".tag-pump"><a href="#">Pumps</a></li>
          <li v-if="includeThermos" uk-filter-control=".tag-thermostat"><a href="#">Thermostats</a></li>
        </ul>

        <ul id="deviceFilter" class="uk-child-width-1-2@s uk-child-width-1-3@l" uk-grid="masonry: true">
          <!-- Device Loop -->
          <li v-for="device in devices" v-if="device.type != 'thermostat' || includeThermos" class="device"
            :class="'tag-' + device.type">
            <div class="uk-card uk-card-default uk-card-body">
              <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
                <div>
                  <dl>
                    <dt>{{ device.name }}</dt>
                    <span @click="device.state = !device.state" v-if="device.state == 0" class="cursor enactor uk-label uk-label-danger">{{
                      device.states[device.state ? 1 : 0]
                      }}</span>
                    <span @click="device.state = !device.state" v-if="device.state == 1" class="cursor enactor uk-label uk-label-success">{{
                      device.states[device.state ? 1 : 0]
                      }}</span>
                    <!-- New Target only for thermostats -->
                    <div v-if="device.type == 'thermostat'" class="uk-margin-small">
                    <div class="uk-inline">
                      <a class="uk-form-icon uk-form-icon-flip" @click="setSv(device)" uk-icon="icon: check"></a>
                      <input :id="'newSv' + device.id" @keydown.enter="setSv(device)"  class="uk-input uk-form-small" type="text" placeholder="New SV">
                    </div>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
})
