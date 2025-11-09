export interface MarketCategory {
  _id: string
  name: string
}

export interface MarketProduct {
  _id: string
  title: string
  price: number
  category: MarketCategory
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface MarketProductsResponse {
  page: number
  totalPages: number
  totalItems: number
  marketProducts: MarketProduct[]
}

export interface GetMarketProductsParams {
  page?: number
  limit?: number
}
