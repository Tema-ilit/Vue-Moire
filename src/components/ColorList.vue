<script setup lang="ts">
import type { IColor } from '@/types/colorsProduct'
import BaseColorItem from './ColorItem.vue'

defineProps<{ colors: Array<IColor> | undefined }>()
</script>

<template>
  <ul class="colors colors--black">
    <BaseColorItem v-for="color in colors" :key="color.id" :color="color" />
  </ul>
</template>
./ColorItem.vue
