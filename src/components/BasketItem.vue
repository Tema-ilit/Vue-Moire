<script setup lang="ts">
import type { IBasketProduct } from '@/types/basketProduct'
import { ref, onMounted, watch } from 'vue'
import { useBasketStore } from '@/stores/basketStore'

const prop = defineProps<{ product: IBasketProduct }>()
const quantityCurent = ref<number>(0)
const basket = useBasketStore()

const changeInput = (e: number) => {
  quantityCurent.value = e
}

const addProductLimit = () => {
  quantityCurent.value++
}

const dellProductLimit = () => {
  quantityCurent.value--
}

const deleteProduct = async (id: number) => {
  basket.deleteProduct(id)
}

onMounted(() => {
  quantityCurent.value = prop.product.quantity
})

watch(quantityCurent, async () => {
  await basket.updateProduct(prop.product.id, quantityCurent.value)
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

    <input
      type="text"
      @input="changeInput($event.target?.value)"
      :v-model="quantityCurent"
      :value="product.quantity"
    />

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
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g id="icomoon-ignore"></g>
      <path
        d="M6.576 6.576c-5.205 5.205-5.205 13.643 0 18.849s13.643 5.205 18.849-0c5.206-5.206 5.206-13.643 0-18.849s-13.643-5.205-18.849 0zM24.67 24.67c-4.781 4.781-12.56 4.781-17.341 0s-4.781-12.56 0-17.341c4.781-4.781 12.56-4.781 17.341 0s4.78 12.56-0 17.341z"
        fill="#9D9D9D"
      ></path>
      <path
        d="M10.722 9.969l-0.754 0.754 5.278 5.278-5.253 5.253 0.754 0.754 5.253-5.253 5.253 5.253 0.754-0.754-5.253-5.253 5.278-5.278-0.754-0.754-5.278 5.278z"
        fill="#9D9D9D"
      ></path>
    </svg>
  </button>
</template>
