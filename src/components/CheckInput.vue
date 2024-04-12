<script setup lang="ts">
const prop = defineProps<{
  item: {
    id: number
    title: string
    code: string
    productsCount: number
  }
}>()
const modalFilters = defineModel('modalFilters')
</script>

<template>
  <label class="check-list__label">
    <input
      class="check-list__check sr-only"
      type="checkbox"
      name="material"
      v-model="modalFilters"
      :value="item.id"
    />
    <span class="check-list__desc">
      {{ item.title }}
      <span>(3)</span>
    </span>
  </label>
</template>
