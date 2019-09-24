<template>
  <div class="">
    <table class="uk-table uk-table-divider uk-table-small">
      <thead>
        <tr>
          <th class="uk-width-1-4">Name</th>
          <th class="uk-width-1-4">Address</th>
          <th class="uk-width-1-4">Location</th>
          <th class="uk-table-shrink"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rtu in rtus" :key="rtu.id">
          <td>{{ rtu.name }}</td>
          <td>{{ rtu.ipv4 }}</td>
          <td>{{ rtu.location }}</td>
          <td>
            <a @click="$emit('remove', rtu.id)">Remove</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: "RTUTable",
  props: ['rtus'],
}
</script>
