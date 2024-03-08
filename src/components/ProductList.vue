<script setup lang="ts">
import ProductItem from '@/components/ProductItem.vue'

defineProps({
  products: Array
})
</script>

<template>
  <div>
    <ul class="catalog__list">
      <ProductItem
        v-for="(product, index) in products"
        :key="product.id"
        :title="product.title"
        :price="product.price"
        :colors="product.colors"
        :id="product.id"
      />
    </ul>
  </div>
</template>
