<template>
    <div id="OmegaModule" class="uk-card uk-card-body">
        <h2>{{ device.name }}</h2>
        <ThermoChart :thermo="device"></ThermoChart>
    </div>
</template>


<script>
import ThermoChart from '@/components/ThermoChart.vue';

export default {
    name: "OmegaModule",
    components: {
        ThermoChart,
    },
    props: {
        device: {
            type: Object,
            required: true
        }
    }
}
</script>
