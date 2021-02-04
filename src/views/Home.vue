<template>
    <div id="home">
        <Layout></Layout>
    </div>
</template>

<style>
    #home {
        padding: 10px;
    }
</style>

<script>
import Layout from '@/components/layout/Layout.vue'

export default {
    name: "home",
    components: {
        Layout
    },
    data: function() {
        return {}
    },
    methods: {},
    mounted() {
        window.home = this;
    }
}
</script>
