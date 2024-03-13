export interface IColor {
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
