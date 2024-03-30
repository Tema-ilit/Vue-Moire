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
