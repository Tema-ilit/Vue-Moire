<script setup lang="ts">
import BaseColorItem from './BaseColorItem.vue'

defineProps({
  color: Object,
  gallery: Array,
  id: Number
})
</script>

<template>
  <ul class="colors colors--black">
    <BaseColorItem v-for="color in color.color" :key="color.id" />
  </ul>
</template>
