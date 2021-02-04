<template>
    <div id="loadLayout">
        <button uk-toggle="target: #loadLayoutModal" class="uk-button button-margin button-secondary">Load Layout</button>

        <!-- This is the modal -->
        <div id="loadLayoutModal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">Load Layout</h2>
                <div class="uk-margin">
                    <select v-model="layoutSelect" class="uk-select">
                        <option :key="layout.id" v-for="layout in layouts" :value="layout">{{ layout.name }}</option>
                    </select>
                </div>
                <button @click="$emit('loadedLayout', layoutSelect)" class="uk-button button-margin button-primary uk-modal-close">Load</button>
                <button class="uk-button uk-button-default uk-modal-close" type="button">Close</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

#loadLayout {
    display: inline;
}

</style>

<script>
import api from '@/api.js';

export default {
    name: "LoadLayout",

    data: function() {
        return {
            layoutSelect: {},
            layouts: []
        }
    },

    async mounted() {
        this.layouts = await api.getLayouts();
        window.ll = this;
    }
}
</script>
