<script setup lang="ts">
import type { IProduct } from '@/types/products'
import BaseColorList from './ColorList.vue'

defineProps<{ product: IProduct }>()
</script>

<template>
  <div>
    <router-link :to="{ name: 'product', params: { id: product.id } }" class="catalog__pic">
      <img :src="product.colors[0]?.gallery[0]?.file.url" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <BaseColorList :colors="product.colors" />
  </div>
</template>
