import apiClient from '../utils/apiClient'

export interface OrderItem {
  product_id: string
  type: string
  quantity: number
  price: number
}

export interface CreateOrderData {
  client_id: string
  items: OrderItem[]
  total: number
}

export interface OrderResponse {
  success: boolean
  orderId?: string
  message?: string
}

export const createOrder = async (
  orderData: CreateOrderData
): Promise<OrderResponse> => {
  try {
    const response = await apiClient.post<OrderResponse>(
      'api/orders',
      orderData
    )

    console.log('✅ Order created successfully:', response)
    return response
  } catch (error) {
    console.error('❌ Error creating order:', error)
    throw error
  }
}

export default {
  createOrder
}
