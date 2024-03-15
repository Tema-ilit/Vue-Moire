<script setup lang="ts">
defineProps<{ category: { id: number; title: string; slug: string } }>()
</script>

<template>
  <span>{{ category.title }}</span>
</template>
