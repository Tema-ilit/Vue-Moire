import type { IProduct } from '@/types/products'
import axios from 'axios'

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const response = await axios.get('https://vue-moire.skillbox.cc/api/products')

    const products: IProduct[] = response.data.items

    return products
  } catch (err) {
    console.log(err)
  }
}
