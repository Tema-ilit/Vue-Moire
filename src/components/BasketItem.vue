<script setup lang="ts">
import { dellProductBasket } from '@/api/basket'
import type { IBasketProduct } from '@/types/basketProduct'
import { ref, onMounted, watch } from 'vue'
import { udateProductBasket } from '@/api/basket'

const prop = defineProps<{ product: IBasketProduct }>()

const quantityCurent = ref<number>(0)

const addProductLimit = () => {
  quantityCurent.value++
}

const dellProductLimit = () => {
  quantityCurent.value--
}

const deleteProduct = async (id: number) => {
  await dellProductBasket(id)
}

onMounted(() => {
  quantityCurent.value = prop.product.quantity
})

watch(quantityCurent, async () => {
  await udateProductBasket(prop.product.id, quantityCurent.value)
})
</script>

<template>
  <div class="product__pic">
    <img
      :src="product.color.gallery[0].file.url"
      width="120"
      height="120"
      :alt="product.product.title"
    />
  </div>
  <h3 class="product__title">{{ product.product.title }}</h3>
  <p class="product__info product__info--color">
    Цвет:
    <span>
      <i :style="{ 'background-color': product.color.color.code }"></i>
      {{ product.color.color.title }}
    </span>
  </p>
  <span class="product__code"> Артикул: {{ product.id }} </span>

  <div class="product__counter form__counter">
    <button @click.prevent="dellProductLimit" type="button" aria-label="Убрать один товар">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" :v-model="product.quantity" :value="quantityCurent" />

    <button @click.prevent="addProductLimit" type="button" aria-label="Добавить один товар">
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

  <b class="product__price"> {{ product.price }} ₽ </b>

  <button
    @click.prevent="deleteProduct(product.id)"
    class="product__del button-del"
    type="button"
    aria-label="Удалить товар из корзины"
  >
    <svg width="20" height="20" fill="currentColor">
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</template>
