import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBasketProduct } from '@/types/basketProduct'

export const useBasketStore = defineStore('BasketStore', () => {
  const basketProducts = ref<IBasketProduct[]>([])

  // const addProduct = (product: IProductCart) => {
  //   basketProducts.value.push(product)
  // }

  return { basketProducts }
})
