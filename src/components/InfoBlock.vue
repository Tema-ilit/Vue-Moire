<script setup lang="ts">
defineProps({
  title: String,
  imageUrl: String,
  description: String
})
</script>

<template>
  <div class="info-block">
    <img class="mb-4" height="80" width="80" :src="imageUrl" :alt="title" />
    <h2 class="text-2xl font-madium mb-2">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>
