<script setup lang="ts">
import type { ISizes } from '@/types/sizes'
import SizesItem from './SizesItem.vue'
const props = defineProps<{ sizes: ISizes[] | undefined }>()
</script>

<template>
  <select class="form__select" type="text" name="category">
    <option v-for="size in sizes" :key="size.id" :value="size.id">{{ size.title }}</option>
  </select>
</template>
