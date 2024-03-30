<script setup lang="ts">
import type { ISizes } from '@/types/sizes'
const props = defineProps<{ sizes: ISizes[] | undefined }>()
const productSize = defineModel('productSize')
</script>

<template>
  <select class="form__select" v-model="productSize" type="text" name="category">
    <option v-for="size in sizes" :key="size.id" :value="size.id">
      {{ size.title }}
    </option>
  </select>
</template>
