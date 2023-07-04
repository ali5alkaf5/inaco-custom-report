<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();

const breadCrumbs = computed(()=>{
  return route.matched.map(r => ({
    label: r.meta.label ?? '-',
    path: r.path,
  }));
});
</script>
<template>
    <ul class="breadcrumb-list">
        <li v-for="(breadcrumb, index) in breadCrumbs" :key="breadcrumb.path" class="breadcrumb-item">
            <template v-if="index < breadCrumbs.length - 1">
                <router-link class="breadcrumb-link" :to="breadcrumb.path">{{breadcrumb.label}}</router-link>
                <span>/</span>
            </template>
            <span v-else>{{ breadcrumb.label }}</span>
        </li>
    </ul>
</template>