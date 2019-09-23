<template>
  <div>
    <Card :title="device.name" :type="'tertiary'">
      <ul class="uk-list uk-list-divider">
        <li><b>RTU: </b>{{ rtu.name }}</li>
        <li><b>Type: </b>{{ device.driver }}</li>
        <li><b>Controller Address: </b>{{ device.controller_addr }}</li>
        <li v-if="device.driver != 'Omega'"><b>Address: </b>{{ device.addr }}</li>
      </ul>
      <a @click="$emit('remove', device.id)">Remove</a>

    </Card>
  </div>
</template>


<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Device',
  props: ['device', 'rtu'],
  components: {
    Card
  },
}
</script>
