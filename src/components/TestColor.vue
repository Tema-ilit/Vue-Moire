<script setup lang="ts">
defineProps<{
  color: {
    id: number
    color: {
      id: number
      title: string
      code: string
    }
    gallery: [
      {
        file: {
          url: string
          name: string
          originalName: string
          extension: string
          size: number & string
        }
      }
    ]
  }
}>()
</script>

<template>
  <ul class="colors colors--black">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" :name="color.color.title" :value="color" />
      <span class="colors__value" :style="{ 'background-color': color.color.code }"> </span>
    </label>
  </ul>
</template>
