<template>
    <li id="moduleSlot" :class="'uk-width-' + clean(width) + '@l'">
        <div class="uk-card slot">

            <!-- Content: None -->
            <div v-if="content.driver == 'none'" class="uk-height-medium empty-slot uk-card-body">
                <div class="uk-container">
                    <div class="uk-margin">
                        Content:
                        <select v-model="selectedContent" name="content" id="contentSelect" class="uk-select uk-form-small">
                            <option :key="option.id" v-for="option in contentOptions" :value="option">
                                {{ option.name }}
                            </option>
                        </select>
                    </div>
                    <div class="uk-margin">
                        Width:
                        <input type="text" class="uk-input uk-form-small " v-model="widthInput" placeholder="1/3">
                    </div>

                    <!-- Activate button -->
                    <div class="uk-margin">
                        <button @click="$emit('activate', [id, selectedContent])" class="uk-button button-primary">Activate</button>
                        &nbsp;
                        <button @click="$emit('remove', id)" class="uk-button uk-button-text">Remove</button>
                    </div>
                </div>
            </div>



            <!-- Content: STR1 -->
            <STR1Module v-else-if="content.driver == 'STR1'" :device="content"></STR1Module>

            <!-- Content: Omega -->
            <OmegaModule v-else-if="content.driver == 'Omega'" :device="content"></OmegaModule>

            <TimerModule v-else-if="content.driver == 'timer'"></TimerModule>
        </div>

    </li>
</template>

<style>
    .empty-slot {
        border: 1px dashed var(--color-dark);
    }
</style>

<script>
import UIkit from 'uikit';

import STR1Module from '@/components/layout/STR1Module.vue';
import OmegaModule from '@/components/layout/OmegaModule.vue';
import TimerModule from '@/components/layout/TimerModule.vue';

export default {

    props: {
        width: {
            type: String,
        },
        content: {
            type: Object,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },

    components: {
        STR1Module,
        OmegaModule,
        TimerModule
    },

    mounted() {
        window.mdlslot = this;
    },

    data: function() {
        return {
            widthInput: "",
            selectedContent: {}
        }
    },

    watch: {
        widthInput: function() {
            this.validateWidthInput();
            this.updateSortable();
        }
    },

    methods: {
        updateSortable() {
            UIkit.sortable("#home").$update();
        },

        clean() {
            return this.width.replace("/", "-");
        },

        validateWidthInput() {
            let width = this.widthInput;
            let split = width.split("/");

            if (split.length != 2) {
                return false;
            } else if (split[0] == '' || split[1] == '') {
                return false;
            }

            let left = parseInt(split[0]);
            let right = parseInt(split[1]);

            if (left > 5 || left < 1) {
                return false;
            } else if (right > 6 || right < 1) {
                return false;
            }

            this.$emit('new-width', this.widthInput);
        },
    },

    computed: {
        contentOptions: function() {
            let options = [
                {
                    driver: 'timer',
                    name: 'Timer'
                }
            ];

            options.push(this.$root.devices());
            return options.flat();
        }
    }
}
</script>
