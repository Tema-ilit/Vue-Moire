import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IBasketProduct } from '@/types/basketProduct'
import { addProductBasket, getBasket, dellProductBasket, udateProductBasket } from '@/api/basket'
import { num_word, word } from '@/utils/numWord'

export const useBasketStore = defineStore('BasketStore', () => {
  const basketProducts = ref<IBasketProduct[]>([])

  const totalPrice = computed(() => {
    return basketProducts.value.reduce((acc, item) => item.price * item.quantity + acc, 0)
  })

  const basketApi = async () => {
    const basket = await getBasket()
    basketProducts.value = basket.items
  }

  const addProductCart = async (product: {
    productId: number
    colorId: number
    sizeId: number
    quantity: number
  }) => {
    const newBasket = await addProductBasket(product)
    basketProducts.value = newBasket
  }

  const deleteProduct = async (id: number) => {
    const newBasket = await dellProductBasket(id)
    basketProducts.value = newBasket
  }

  const updateProduct = async (id: number, limit: number) => {
    const newBasket = await udateProductBasket(id, limit)
    basketProducts.value = newBasket
  }

  const productLength = () => {
    const count = basketProducts.value.reduce((total, item) => total + item.quantity, 0)
    const words = num_word(count, word)
    return { count, words }
  }

  return {
    basketProducts,
    totalPrice,
    addProductCart,
    productLength,
    basketApi,
    deleteProduct,
    updateProduct
  }
})
