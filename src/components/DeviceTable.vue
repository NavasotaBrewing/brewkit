<template>
  <div class="uk-width-expand">
    <table class="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>RTU</th>
          <th>Controller Addr</th>
          <th>Addr</th>
          <!-- Remove link -->
          <th class="uk-table-shrink"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.id">
          <td>{{ device.name }}</td>
          <td>{{ device.driver }}</td>
          <td>{{ findRTU(device.rtu).name }}</td>
          <td>{{ device.controller_addr }}</td>
          <td>{{ device.addr }}</td>
          <td>
            <a @click="$emit('remove', device.id)">Remove</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  props: ['devices', 'rtus'],
  name: 'DeviceTable',
  methods: {
    findRTU(rtuId) {
      return this.rtus.filter(r => r.id == rtuId)[0];
    }
  }
};
</script>
