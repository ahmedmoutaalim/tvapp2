import apiClient from '../utils/apiClient'
import type {
  MarketProductsResponse,
  GetMarketProductsParams
} from 'interfaces/market'

export const getMarketProducts = async (
  params?: GetMarketProductsParams
): Promise<MarketProductsResponse> => {
  try {
    const response = await apiClient.get<MarketProductsResponse>(
      'api/markets',
      {
        params
      }
    )

    console.log(
      '================= Market response service ==============',
      response
    )

    return response
  } catch (error) {
    console.error('Error fetching market products:', error)
    throw error
  }
}

export default {
  getMarketProducts
}
