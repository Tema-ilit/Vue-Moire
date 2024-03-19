<script setup lang="ts">
import type { IProduct } from '@/types/products'
import GlobalColor from './GlobalColor.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{ product: IProduct }>()
const currentColor = ref<{
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
}>()

onMounted(() => {
  currentColor.value = props.product.colors[0]
})
</script>

<template>
  <div>
    <router-link :to="{ name: 'product', params: { id: product.id } }" class="catalog__pic">
      <img
        :src="currentColor ? currentColor.gallery[0].file.url : '../../public/no-photo.jpg'"
        :alt="product.title"
      />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price }} ₽ </span>

    <GlobalColor :colors="product.colors" v-model:colormodel="currentColor" />
  </div>
</template>
./GlobalColor.vue
