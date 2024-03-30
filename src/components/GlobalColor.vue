<script setup lang="ts">
const prop = defineProps<{
  colors:
    | Array<{
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
      }>
    | undefined
}>()
const colormodel = defineModel('colormodel')
</script>

<template>
  <ul class="colors colors--black">
    <li v-for="color in colors" :key="color.id" class="colors__item">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :name="color.color.title"
          :value="color.color.id"
          v-model="colormodel"
        />
        <span class="colors__value" :style="{ 'background-color': color.color.code }"> </span>
      </label>
    </li>
  </ul>
</template>
