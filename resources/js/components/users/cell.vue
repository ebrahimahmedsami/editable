<template>
    <div @click="onFieldClick" class="edit-cell">
        <el-tooltip v-if="!editMode && !showInput">
            <div tabindex="0" @keyup.enter="onFieldClick">
                <slot name="content"></slot>
            </div>
        </el-tooltip>

        <component :is="editableComponent"
                   v-if="editMode || showInput"
                   ref="input"
                   @keyup.enter.native="onInputExit"
                   v-on="listeners"
                   v-bind="$attrs"
                   v-model="model">
            <slot name="edit-component-slot"></slot>
        </component>
    </div>
</template>
<script>
export default {
    name: "editable-cell",
    inheritAttrs: false,
    props: {
        value: {
            type: [String,Number],
            default: ""
        },
        showInput: {
            type: Boolean,
            default: false
        },
        editableComponent: {
            type: String,
            default: "el-input"
        },
        closeEvent: {
            type: String,
            default: "blur"
        }
    },
    data() {
        return {
            editMode: false
        };
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            }
        },
        listeners() {
            return {
                [this.closeEvent]: this.onInputExit,
                ...this.$listeners
            };
        }
    },
    methods: {
        onFieldClick() {
            this.editMode = true;
            this.$nextTick(() => {
                let inputRef = this.$refs.input;
                if (inputRef) {
                    inputRef.focus();
                }
            });
        },
        onInputExit() {
            this.editMode = false;
        },
        onInputChange(val) {
            this.$emit("input", val);
        }
    }
};
</script>
<style>

</style>
