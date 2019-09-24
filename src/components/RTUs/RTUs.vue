<template>
  <div>
    <!-- Grid | Large screens -->
    <RTUGrid class="uk-visible@l" @remove="removeRTU(rtu.id)" :rtus="rtus"></RTUGrid>
    <!-- Table | Medium Screens -->
    <RTUTable class="uk-hidden@l uk-visible@s" @remove="removeRTU(rtu.id)" :rtus="rtus"></RTUTable>
    <!-- List | Small Screens -->
    <ul class="uk-list uk-list-divider uk-hidden@s">
      <li v-for="rtu in rtus" :key="rtu.id">
        {{ rtu.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import RTU from '@/components/RTUs/RTU.vue';
import RTUGrid from '@/components/RTUs/RTUGrid.vue';
import RTUTable from '@/components/RTUs/RTUTable.vue';

export default {
  name: 'RTUs',
  props: ['rtus'],
  components: {
    RTU,
    RTUGrid,
    RTUTable
  },
  methods: {
    removeRTU(id) {
      this.$emit('remove', id);
    }
  }
}
</script>
