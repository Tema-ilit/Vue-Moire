<script setup lang="ts">
const prop = defineProps<{
  item: {
    id: number
    title: string
    code: string
    productsCount: number
  }
}>()
</script>

<template>
  <label class="check-list__label">
    <input class="check-list__check sr-only" type="checkbox" name="material" value="лен" />
    <span class="check-list__desc">
      {{ item.title }}
      <span>(3)</span>
    </span>
  </label>
</template>
