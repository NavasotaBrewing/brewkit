<template>
    <div id="OmegaModule" class="uk-card uk-card-body">
        <pre>{{ device }}</pre>
    </div>
</template>


<script>
export default {
    name: "OmegaModule",
    props: {
        device: {
            type: Object,
            required: true
        }
    }
}
</script>
