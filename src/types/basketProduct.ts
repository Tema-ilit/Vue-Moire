export interface IBasketProduct {
  color: {
    color: {
      code: string
      id: number
      title: string
    }
    gallery: [
      {
        file: {
          extension: string
          name: string
          originalName: string
          size: string
          url: string
        }
      }
    ]
    id: number
  }
  id: number
  price: number
  product: {
    id: number
    title: string
    slug: string
    price: number
    colors: [
      {
        id: number
        color: {
          id: number
          title: string
          code: string
        }
        gallery: [
          {
            file: {
              url: string
              name: string
              originalName: string
              extension: string
              size: string
            }
          }
        ]
      }
    ]
    seasons: [
      {
        id: number
        title: string
        code: string
        productsCount: number
      }
    ]
    materials: [
      {
        id: number
        title: string
        code: string
        productsCount: number
      }
    ]
  }
  quantity: number
  size: {
    id: number
    title: string
  }
}
