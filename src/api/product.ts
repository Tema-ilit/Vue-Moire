import type { IPagination } from '@/types/global'
import type { IProduct } from '@/types/products'
import axios from 'axios'

interface IResponseProducts {
  products: IProduct[]
  pagination: IPagination
}

export const getProducts = async (page: number = 1): Promise<IResponseProducts> => {
  try {
    const response = await axios.get('https://vue-moire.skillbox.cc/api/products', {
      params: { page: String(page), limit: String(8) }
    })

    const products: IProduct[] = response.data.items

    return {
      products: products,
      pagination: response.data.pagination
    }
  } catch (err) {
    console.log(err)
  }
}
