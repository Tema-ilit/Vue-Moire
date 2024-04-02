import axios from 'axios'
import { BASE_URL } from './product'

const userAccessKey = 'e4de53928f53ba355dcfd6180414b7d0'

//получаем корзину
export const getBasket = async () => {
  try {
    const { data } = await axios.get(BASE_URL + '/baskets', { params: { userAccessKey } })

    const basket = data
    return basket
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

//добавляем товар в корзину
export const addProductBasket = async (product: {
  productId: number
  colorId: number
  sizeId: number
  quantity: number
}) => {
  try {
    await axios.post(
      BASE_URL + '/baskets/products',
      {
        productId: product.productId,
        colorId: product.colorId,
        sizeId: product.sizeId,
        quantity: product.quantity
      },
      { params: { userAccessKey } }
    )
  } catch (error) {
    console.log(error)
    throw new Error('err')
  }
}

//изменить кол-во товара в корзине
export const udateProductBasket = async (id: number, limit: number) => {
  await axios.put(BASE_URL + 'baskets/products', {
    data: { basketItemId: id, quantity: limit },
    params: { userAccessKey }
  })
}

// удаляем товар из корзины
export const dellProductBasket = async (id: number) => {
  try {
    await axios.delete(BASE_URL + '/baskets/products', {
      data: { basketItemId: id },
      params: { userAccessKey }
    })
    return true
  } catch (error) {
    console.log(error)
  }
}
