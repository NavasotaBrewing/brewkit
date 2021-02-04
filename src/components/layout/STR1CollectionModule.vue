<template>
    <div id="STR1Collection">
        <div class="uk-margin">
            <label for="rtuSelect">
                RTU:
                <select v-model="content.rtuID" id="rtuSelect" class="uk-select uk-form-width-medium">
                    <option :key="rtu.id" v-for="rtu in $root.RTUs()" :value="rtu.id">{{ rtu.name }}</option>
                </select>
            </label>

            <table class="uk-table uk-table-middle uk-table-divider">
            <thead>
                <tr>
                    <th class="uk-table-expand">Relay #</th>
                    <th class="uk-table-shrink">State</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="dev.id" v-for="dev in devices">
                    <td>{{ dev.name }}</td>
                    <td v-if="dev.state == 'On'"><button class="uk-button button-primary" type="button">On</button></td>
                    <td v-if="dev.state == 'Off'"><button class="uk-button button-danger" type="button">Off</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "STR1Collection",
    props: {
        // We pass in the content that holds {rtuID: '...'} as a prop so when
        // the layout is saved, the RTU will be remembered.
        content: {
            type: Object,
            required: true,
        }
    },
    data: function() {
        return {
            devices: []
        }
    },

    watch: {
        content: function() {
            this.devices = this.$root.devices().filter((dev) => (dev.rtu == this.content.rtuID) && (dev.driver == 'STR1'));
        }
    }
}
</script>
