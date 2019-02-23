<template>
  <div id="deviceSummary">
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

        <ul id="deviceFilter" class="uk-child-width-1-3@s uk-child-width-1-4@l" uk-grid="masonry: true">
          <!-- Device Loop -->
          <li v-for="device in devices" :key="device.id" v-if="device.type != 'thermostat' || includeThermos" class="device"
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
  </div>
</template>


<script>
import CompactDeviceSummary from '@/components/CompactDeviceSummary'
export default {
  props: ['devices', 'editable', 'include-thermos', 'compact'],
  computed: {
    valves: function() {
      return this.devices.filter(d => d.type != 'thermostat')
    },
    thermos: function() {
      return this.devices.filter(d => d.type == 'thermostat')
    }
  },
  components: {
    'compact-device-summary': CompactDeviceSummary,
  },
  methods: {
    setSv(thermo) {
      this.$emit('new-sv', thermo)
    }
  },
}
</script>

<style>
  .cursor:hover {
    cursor: pointer;
  }
</style>
