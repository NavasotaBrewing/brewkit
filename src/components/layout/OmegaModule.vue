<template>
    <div id="OmegaModule" class="uk-card uk-card-body">
        <h2>{{ device.name }}</h2>
        <div class="uk-margin">
            <p class="uk-text-lead">
            Current: {{ device.pv }} &deg;F &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Target: {{ device.sv }} &deg;F
            </p>
        </div>
        <div class="uk-margin">
            
            <label :for="'newSV' + content.id">New Target: </label>
            <!--
                We don't v-model this to the device.sv because it will be overwritten
                periodically when the config is updated. You'd have to type the new number and
                click set within a certain time frame, which is hard/impossible. The function to
                update the config will get the value from here by #id when it's time. that's why
                the input contains the device id in the html id.
            -->

            <input type="text" :id="'newSV' + content.id" placeholder="Setpoint" class="uk-input uk-form-width-medium">
            <button :disabled="$root.requestOut" class="uk-button enactor button-primary">Set</button>
            <button @click="device.state = 'Off'" v-if="device.state == 'On'" :disabled="$root.requestOut" class="uk-button enactor button-primary">On</button>
            <button @click="device.state = 'On'" v-if="device.state == 'Off'" :disabled="$root.requestOut" class="uk-button enactor button-danger">Off</button>
        </div>
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
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            device: {pv: 0, sv: 0}
        }
    },
    mounted() {
        this.device = this.$root.device(this.content.id) || {pv: 0, sv: 0};
        window.omega = this;
    },

    watch: {
        device: {
            handler() {
                this.$forceUpdate();
            },
            deep: true
        }
    }
}
</script>
