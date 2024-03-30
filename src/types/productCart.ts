export interface IProductCart {
  id: number
  title: string
  slug: string
  price: number
  quantity?: number
  category: {
    id: number
    slug: string
    title: string
  }
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
            size: number & string
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
  sizes: [
    {
      id: number
      title: string
    }
  ]
}
