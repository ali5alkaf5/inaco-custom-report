export const codeExample = `<script setup lang="ts">
import { ref } from 'vue'
import { BaseDatepicker } from '@/components/index'

const date = ref()
</script>

<template>
  <component :is="BaseDatepicker" v-model="date" label="Date" layout="horizontal" required />
<template>`