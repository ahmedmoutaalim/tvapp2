export interface TransportCategory {
  _id: string
  name: string
}

export interface Transport {
  _id: string
  title: string
  delay: string
  category: TransportCategory
  price: number
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ITransportResponseData {
  success: boolean
  currentPage: number
  totalPages: number
  totalItems: number
  limit: number
  transports: Transport[]
}

export interface GetTransportParams {
  page?: number
  limit?: number
}
