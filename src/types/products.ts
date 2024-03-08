export interface IProduct {
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
}
