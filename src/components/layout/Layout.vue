<template>
    <div id="layout">
        <button @click="activateFirst()" class="uk-button uk-button-default">Activate</button>
        <ul class="uk-grid-small" uk-sortable="handle: .uk-card" uk-grid="masonry: false">
            <ModuleSlot
                v-for="mdl in modules"
                :key="mdl.id"
                :width="mdl.width"
                :content="mdl.content"
                @new-width="mdl.width = $event"
            />
        </ul>
    </div>
</template>

<style>
    #layout {
        padding: 10px;
    }
</style>

<script>
import ModuleSlot from '@/components/layout/ModuleSlot.vue';

export default {
    name: "home",
    components: {
        ModuleSlot
    },
    data: function() {
        return {
            modules: [
                {id: 0, width: "1/3", content: {driver: "none"}},
                {id: 1, width: "1/3", content: {driver: "none"}},
                {id: 2, width: "1/3", content: {driver: "none"}},
                {id: 3, width: "1/3", content: {driver: "none"}},
                {id: 4, width: "1/3", content: {driver: "none"}},
                {id: 5, width: "1/3", content: {driver: "none"}},
                {id: 6, width: "1/3", content: {driver: "none"}},
                {id: 7, width: "1/3", content: {driver: "none"}},
                {id: 8, width: "1/3", content: {driver: "none"}},
            ]
        }
    },
    methods: {
        // For dev
        activateFirst() {
            this.config = this.$root.config;
            this.modules[0].content = this.config.RTUs[0].devices[0];
            this.modules[1].content = this.config.RTUs[0].devices[2];
        }
    },
    mounted() {
        window.layout = this;
    }
}
</script>
