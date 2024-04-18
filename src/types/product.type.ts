export type ProductItem = {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: {
    _id: string
    name: string
    __v: number
  }
  image: string
  createdAt: string
  updatedAt: string
  description: string
}

export type ProductList = {
  products: ProductItem[],
  pagination: {
    page: number,
    limit: number
    page_size: number
  }
}

export type ProductListConfig = {
  page?: number
  limit?: number
  order?: "decs" | "asc"
  sort_by?: "createdAt" | "view" | "sold" | "price"
  category?: string
  exclude?: string
  rating_filter?: number
  price_min?: number
  price_max?: number
  name?: string
} // các queryParams (tham số truy vấn) xuất hiện không bắt buộc