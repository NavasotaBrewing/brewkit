<template>
    <div id="STR1Module">
        <h2>{{ device.name }}</h2>
        On RTU: <code>{{ device.rtu }}</code>
        <br>
        State: <code>{{ device.state }}</code>
        <div class="uk-margin">
            <button class="uk-button enactor button-margin button-primary">On</button>
            <button class="uk-button enactor button-margin">Off</button>
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
    }
}
</script>
