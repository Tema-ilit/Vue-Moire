import axios from 'axios'

export const BASE_URL = 'https://vue-moire.skillbox.cc/api'

export const getProducts = async (
  page: number = 1,
  categoryId: number = 0,
  materialIds: Array<string> = [],
  seasonIds: Array<string> = [],
  colorIds: Array<string> = [],
  minPrice: number = 0,
  maxPrice: number = 0
) => {
  try {
    const { data } = await axios.get(BASE_URL + '/products', {
      params: {
        page: page,
        categoryId,
        materialIds,
        seasonIds,
        colorIds,
        minPrice,
        maxPrice,
        limit: String(7)
      }
    })

    return data
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
