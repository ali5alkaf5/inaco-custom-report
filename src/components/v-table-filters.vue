<script setup lang="ts">
import { computed, reactive } from 'vue';
import {BaseInputMask, BaseSelect, BaseSelectMask} from './';

const props = defineProps({
    fields: Array<any>,
    modelValue: Object,
});
const getComponent = function(field: any){
    switch(field.component){
        case 'select': return BaseSelectMask;
        case 'input': return BaseInputMask;
    }
    return 'div';
}
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void,
  (e: 'submit'): void,
}>()

const computedStates = computed<any>({
  set: (obj: any) => {
    emit('update:modelValue', obj)
  },
  get: () => props.modelValue
})
</script>
<template>
    <div class="card card-template">
        <h3>Filters</h3>
        <div class="flex flex-row gap-4 items-end">
            <component
                v-for="field in fields"
                :key="field.name"
                :is="getComponent(field)"
                v-model="computedStates[field.name]"
                :name="field.name"
                :label="field.label"
                v-bind="field"
            />
            <button class="btn-sm btn-primary w-fit" id="filter" @click="$emit('submit')">Apply</button>
        </div>
    </div>
</template>