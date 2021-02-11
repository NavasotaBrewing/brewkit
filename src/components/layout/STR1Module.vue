<template>
    <div id="STR1Module">
        <h2>{{ device.name }}</h2>
        On RTU: <code>{{ device.rtu }}</code>
        <br>
        State: <code>{{ device.state }}</code>
        <div class="uk-margin">
            <button @click="device.state = 'On'" :class="{ 'button-primary': device.state == 'On' }" class="uk-button enactor button-margin">On</button>
            <button @click="device.state = 'Off'" :class="{ 'button-danger': device.state == 'Off' }" class="uk-button enactor button-margin">Off</button>
        </div>
    </div>
</template>


<script>
export default {
    name: "STR1Module",
    props: {
        device: {
            type: Object,
            required: true
        }
    },
    mounted() {
        // This is a hacky work around
        // We need to make sure the data this component is running on is part of
        // the config stored in $root, not a copy passed through. This keeps all
        // components on the dashboard in sync.
        this.device = this.$root.devices().find(dev => dev.id == this.device.id);
    }
}
</script>
