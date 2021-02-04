<template>
    <div id="layout">
        <ul class="uk-grid-small" uk-sortable="handle: .uk-card" uk-grid="masonry: false">
            <ModuleSlot
                v-for="mdl in layout"
                :key="mdl.id"
                :id="mdl.id"
                :ref="mdl.id"
                :width="mdl.width"
                :content="mdl.content"
                @remove="removeModule($event)"
                @activate="activateModule($event[0], $event[1])"
                @new-width="mdl.width = $event"
            />
            <ModuleSlot :id="0" :width="'1/3'" @add="addModule()" :content="{'driver': 'add'}"></ModuleSlot>
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
            layout: [
                {id: 1, width: "1/2", content: {driver: "none"}},
                {id: 2, width: "1/4", content: {driver: "none"}},
                {id: 3, width: "1/4", content: {driver: "none"}},
                {id: 4, width: "1/4", content: {driver: "none"}},
                {id: 5, width: "1/4", content: {driver: "none"}},
                {id: 6, width: "1/2", content: {driver: "none"}},
                {id: 7, width: "1/3", content: {driver: "none"}},
                {id: 8, width: "1/3", content: {driver: "none"}},
                {id: 9, width: "1/3", content: {driver: "none"}},
            ]
        }
    },
    methods: {
        removeModule(id) {
            this.layout = this.layout.filter(mdl => mdl.id != id);
        },

        addModule() {
            if (this.layout.length == 0) {
                this.layout.push({id: 0, width: "1/3", content: {driver: "none"}});
            } else {
                let latest = this.layout[this.layout.length - 1].id;
                console.log("Latest id: " + latest);
                this.layout.push({id: latest + 1, width: "1/3", content: {driver: "none"}});
            }
        },

        activateModule(id, content) {
            let mdl = this.layout.find(mdl => mdl.id == id);
            mdl.content = content;
        }
    },
    mounted() {
        window.layout = this;
    }
}
</script>
