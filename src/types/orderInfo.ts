export interface IOrderInfo {
  address: string
  basket: {
    id: number
    items: [
      {
        color: {
          color: { code: string; id: number; title: string }
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
          id: 45
        }
        id: number
        price: number
        product: {
          colors: [
            {
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
              id: 45
            }
          ]
          id: number
          materials: [
            {
              code: string
              id: number
              productsCount: number
              title: string
            }
          ]
          price: number
          seasons: [
            {
              code: string
              id: number
              productsCount: number
              title: string
            }
          ]
          slug: string
          title: string
        }
        quantity: number
        size: {
          id: number
          title: string
        }
      }
    ]
    user: {
      accessKey: string
      id: number
    }
  }
  comment: string
  deliveryType: {
    id: number
    price: string
    title: string
  }
  email: string
  id: number
  name: string
  paymentType: string
  phone: string
  status: {
    code: string
    id: number
    title: string
  }
  totalPrice: number
}
