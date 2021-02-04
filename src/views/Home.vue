<template>
    <div id="home">
        <ul class="uk-grid-small" uk-sortable="handle: .uk-card" uk-grid="masonry: false">
            <ModuleSlot
                v-for="mdl in modules"
                :key="mdl.id"
                :width="mdl.width"
                @new-width="mdl.width = $event"
            ></ModuleSlot>
        </ul>
    </div>
</template>

<style>
    #home {
        padding: 10px;
    }
</style>

<script>
import ModuleSlot from '@/components/ModuleSlot.vue';

export default {
    name: "home",
    components: {
        ModuleSlot
    },
    data: function() {
        return {
            modules: [
                {id: 0, width: "1/3"},
                {id: 1, width: "1/3"},
                {id: 2, width: "1/3"},
                {id: 3, width: "1/3"},
                {id: 4, width: "1/3"},
                {id: 5, width: "1/3"},
                {id: 6, width: "1/3"},
                {id: 7, width: "1/3"},
                {id: 8, width: "1/3"},
            ]
        }
    },
    mounted() {
        window.home = this;
    }
}
</script>
