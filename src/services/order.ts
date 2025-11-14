import apiClient from '../utils/apiClient'

export interface CreateOrderData {
  client_id: string
  product_id: string
  quantity: number
  type: string
}

export interface OrderResponse {
  success: boolean
  orderId?: string
  message?: string
  data?: any
}

export const createOrder = async (
  orderData: CreateOrderData
): Promise<OrderResponse> => {
  try {
    console.log('📤 Sending order to API:', orderData)

    const response = await apiClient.post<OrderResponse>(
      'api/orders',
      orderData
    )

    console.log('✅ Order API Response:', JSON.stringify(response, null, 2))
    return response
  } catch (error: any) {
    console.error('❌ Error creating order:', error)
    console.error('❌ Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    throw error
  }
}

export default {
  createOrder
}
