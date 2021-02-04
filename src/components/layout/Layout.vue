<template>
    <div id="layout">
        <ul class="uk-grid-small" uk-sortable="handle: .uk-card" uk-grid="masonry: false">
            <ModuleSlot
                v-for="mdl in modules"
                :key="mdl.id"
                :id="mdl.id"
                :ref="mdl.id"
                :width="mdl.width"
                :content="mdl.content"
                @remove="removeModule($event)"
                @activate="activateModule($event[0], $event[1])"
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
                {id: 0, width: "1/2", content: {driver: "none"}},
                {id: 1, width: "1/4", content: {driver: "none"}},
                {id: 2, width: "1/4", content: {driver: "none"}},
                {id: 3, width: "1/4", content: {driver: "none"}},
                {id: 4, width: "1/4", content: {driver: "none"}},
                {id: 5, width: "1/2", content: {driver: "none"}},
                {id: 6, width: "1/3", content: {driver: "none"}},
                {id: 7, width: "1/3", content: {driver: "none"}},
                {id: 8, width: "1/3", content: {driver: "none"}},
            ]
        }
    },
    methods: {
        removeModule(id) {
            this.modules = this.modules.filter(mdl => mdl.id != id);
        },

        activateModule(id, content) {
            let component = this.$refs[id][0];
            if (component == undefined) {
                return false;
            }
            // If the content is a device id, set the content to that device
            // If it's something else, set it to the appropriate content
            // Example, if content == 'timer', return {driver: 'timer'}

            if (content == 'timer') {
                component.content = {driver: 'timer'};
            }


            // Try to find a device
            this.$root.devices().forEach((device) => {
                if (device.id == content) {
                    component.content = device;
                }
            })
        }
    },
    mounted() {
        window.layout = this;
    }
}
</script>
