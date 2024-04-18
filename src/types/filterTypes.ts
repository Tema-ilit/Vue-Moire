export interface ICategories {
  items: [
    {
      id: number
      title: string
      slug: string
    }
  ]
}

export interface IColors {
  id: number
  title: string
  code: string
}

export interface IMaterials {
  items: [
    {
      id: number
      title: string
      code: string
      productsCount: number
    }
  ]
}
