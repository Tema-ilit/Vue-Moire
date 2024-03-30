import type { IPagination } from '@/types/global'
import type { IProduct } from '@/types/products'
import axios from 'axios'

export const BASE_URL = 'https://vue-moire.skillbox.cc/api'

interface IResponseProducts {
  products: IProduct[]
  pagination: IPagination
}

export const getProducts = async (page: number = 1): Promise<IResponseProducts> => {
  try {
    const response = await axios.get(BASE_URL + '/products', {
      params: { page: String(page), limit: String(13) }
    })

    const products: IProduct[] = response.data.items

    return {
      products: products,
      pagination: response.data.pagination
    }
  } catch (err) {
    console.log(err)
    throw new Error('Ошибочка')
  }
}

export const getProductId = async (id: number) => {
  try {
    const { data } = await axios.get(BASE_URL + '/products/' + id)

    const product = data

    return product
  } catch (error) {
    console.log(error)
    throw new Error('error')
  }
}
