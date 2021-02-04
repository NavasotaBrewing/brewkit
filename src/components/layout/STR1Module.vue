<template>
    <div id="STR1Module" class="uk-card uk-card-body">
        <pre>{{ device }}</pre>
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
