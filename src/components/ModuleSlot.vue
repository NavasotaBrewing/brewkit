<template>
    <li id="moduleSlot" :class="'uk-width-' + clean(width) + '@m'">
        <div class="uk-card slot uk-card-body">
            <input type="text" class="uk-input uk-form-small uk-position-center" v-model="widthInput" placeholder="1/3">
            <slot></slot>
        </div>
    </li>
</template>

<style>
    .slot {
        min-height: 300px;
        background-color: rgba(204, 204, 204, 0.5);
    }
</style>

<script>
import UIkit from 'uikit';

export default {
    props: {
        width: {
            type: String,
        }
    },
    data: function() {
        return {
            widthInput: ""
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
        }
    },
}
</script>
