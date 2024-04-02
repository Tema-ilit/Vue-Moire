import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBasketProduct } from '@/types/basketProduct'

export const useBasketStore = defineStore('BasketStore', () => {
  const basketProducts = ref<IBasketProduct[]>([])

  const totalPrice = () => {
    return basketProducts.value.reduce((acc, item) => item.price * item.quantity + acc, 0)
  }

  const productLength = () => {
    const count = basketProducts.value.reduce((total, item) => total + item.quantity, 0)

    switch (count) {
      case 1:
      case 21:
      case 31:
        return `${count} товар`
      case 2:
      case 22:
      case 33:
      case 3:
      case 23:
      case 4:
      case 34:
        return `${count} товара`
      default:
        return `${count} товаров`
    }
  }

  return { basketProducts, totalPrice, productLength }
})
