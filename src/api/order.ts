import axios from 'axios'
import { BASE_URL } from './product'
import { userAccessKey } from './basket'

//Получаем способы доставки
export const getDelivery = async () => {
  try {
    const { data } = await axios.get(BASE_URL + '/deliveries')

    return data
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

//Получаем способы оплаты
export const getPlayment = async (deliveryId: number) => {
  try {
    const { data } = await axios.get(BASE_URL + '/payments', {
      params: { deliveryTypeId: deliveryId }
    })

    return data
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}

export const getOrderInfo = async (id: number) => {
  try {
    const { data } = await axios.get(BASE_URL + '/orders/' + id, { params: { userAccessKey } })

    return data
  } catch (error) {
    console.log(error)
  }
}
