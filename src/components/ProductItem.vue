<script setup lang="ts">
import type { IProduct } from '@/types/products'
import BaseColorList from './ColorList.vue'

const props = defineProps<{ product: IProduct }>()
</script>

<template>
  <div>
    <li class="catalog__item">
      <router-link
        :to="{ name: 'product', params: { id: product.id } }"
        class="catalog__pic"
        href="#"
      >
        <img :src="product.colors[0]?.gallery[0]?.file.url" :alt="product.title" />
      </router-link>

      <h3 class="catalog__title">
        <a href="#"> {{ product.title }} </a>
      </h3>

      <span class="catalog__price"> {{ product.price }} ₽ </span>

      <BaseColorList :colors="product.colors" />
    </li>
  </div>
</template>
./ColorList.vue
