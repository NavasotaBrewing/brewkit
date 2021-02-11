<template>
    <div v-if="device != {}" id="STR1Module">
        <h2>{{ device.name }}</h2>
        On RTU: <code>{{ device.rtu }}</code>
        <br>
        State: <code>{{ device.state }}</code>
        <div class="uk-margin">
            <button @click="device.state = 'On'"  :disabled="$root.requestOut" :class="{ 'button-primary': device.state == 'On' }" class="uk-button enactor button-margin">On</button>
            <button @click="device.state = 'Off'" :disabled="$root.requestOut" :class="{ 'button-danger': device.state == 'Off' }" class="uk-button enactor button-margin">Off</button>
        </div>
    </div>
</template>


<script>
export default {
    name: "STR1Module",
    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            device: {}
        }
    },

    mounted() {
        this.device = this.$root.device(this.content.id);
    }
}
</script>
