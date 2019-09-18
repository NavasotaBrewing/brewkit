<template>
  <div id="compactDeviceSummary">
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
          <tr v-for="device in devices" :key="device.id">
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
  </div>
</template>

<script>
export default {
  name: 'compact',
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
}
</script>
