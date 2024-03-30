<script setup lang="ts">
import type { IProduct } from '@/types/products'
import GlobalColor from './GlobalColor.vue'
import { onMounted, ref, computed } from 'vue'

const prop = defineProps<{ product: IProduct }>()
const currentColor = ref<number>()

const img = computed(() => {
  if (prop.product.colors[0].gallery?.[0].file.url)
    return prop.product.colors
      .find((item) => item.color.id === currentColor.value)
      ?.gallery.find((el) => el.file)?.file.url
  return '../../public/no-photo.jpg'
})

onMounted(() => {
  currentColor.value = prop.product.colors[0].color.id
})
</script>

<template>
  <div>
    <router-link :to="{ name: 'product', params: { id: product.id } }" class="catalog__pic">
      <img :src="img" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <GlobalColor :colors="product.colors" v-model:colormodel="currentColor" />
  </div>
</template>
