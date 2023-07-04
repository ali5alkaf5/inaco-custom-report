<script lang="ts">
export interface OptionsInterface {
  label: string
  id: any
}

export interface Props {
  modelValue: any
  placeholder?: string
  border?: 'full' | 'simple' | 'none'
  options: OptionsInterface[]
  name?: string,
  label?: string,
}
</script>

<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(defineProps<Props>(), {
    name: '',
    label: '',
    placeholder: 'Choose one'
});

const clearSelect = () => {
  selected.value = {}
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const selected = computed({
  set: (obj: any) => {
    emit('update:modelValue', obj)
  },
  get: () => props.modelValue
})
</script>

<template>
    <label class="space-y-[1px]">
        <span class="text-sm font-bold">
            {{ label }}
        </span>
        <select v-model="selected" :name="props.name" class="form-input border-b border-x-none border-t-none px-1 py-2 leading-[1.6] min-w-[200px]">
            <option value="">{{ props.placeholder ?? 'Choose' }}</option>
            <option v-for="option in options" :key="option.id" :value="option.id">{{ option.label }}</option>
        </select>
    </label>
</template>
