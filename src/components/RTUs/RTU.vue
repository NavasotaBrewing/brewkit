<template>
  <div id="RTUDisplay">
    <Card :title="rtu.name" :type="'secondary'">
      <dl class="uk-description-list">
        <!-- <dt>Name</dt>
        <dd>{{ rtu.name }}</dd> -->
        <dt v-if="rtu.location">Location</dt>
        <dd v-if="rtu.location">{{ rtu.location }}</dd>
        <dt>Address</dt>
        <dd>
          <code>{{ rtu.ipv4 }}</code>
        </dd>
      </dl>
      <div class="uk-margin">
        <a @click="$emit('remove', rtu.id)">Remove</a>
      </div>
      <!-- TODO: Add a tester button here -->
    </Card>
  </div>
</template>


<script>
import Card from '@/components/Card.vue';

export default {
  name: "RTU",
  props: ['rtu'],
  components: {
    Card
  }
}
</script>

<style scoped>
code {
  color: #4B4A4A;
}
</style>
