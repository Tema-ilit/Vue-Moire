<script setup lang="ts">
import type { IColor } from '@/types/colorsProduct'

// const props = defineProps<{
//   color: object
//   gallery: Array<string>
//   id: number
// }>()

const props = defineProps<{ color: IColor }>()
</script>

<template>
  <li class="colors__item">
    <label class="colors__label">
      <input
        class="colors__radio sr-only"
        type="radio"
        :name="color.color.title"
        value=""
        :checked="false"
      />
      <span class="colors__value" :style="{ 'background-color': color.color.code }"> </span>
    </label>
  </li>
</template>
