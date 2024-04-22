<script setup lang="ts">
const prop = defineProps<{
  item: {
    id: number
    title: string
    code: string
    productsCount?: number
  }
  color?: boolean
}>()
const modalFilters = defineModel('modalFilters')
const colorsFilters = defineModel('colorsFilters')
</script>

<template>
  <label v-if="color" class="colors__label">
    <input
      class="colors__radio sr-only"
      type="checkbox"
      :name="item.title"
      :value="item.id"
      v-model="colorsFilters"
    />
    <span class="colors__value" :style="{ 'background-color': item.code }"> </span>
  </label>
  <label v-else class="check-list__label">
    <input
      class="check-list__check sr-only"
      type="checkbox"
      name="material"
      v-model="modalFilters"
      :value="item.id"
    />
    <span class="check-list__desc">
      {{ item.title }}
      <span>({{ prop.item.productsCount }})</span>
    </span>
  </label>
</template>
