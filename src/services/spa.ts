import {IFoodResponseData} from 'interfaces/food'
import {ISpaResponseData} from 'interfaces/spa'
import apiClient from 'utils/apiClient'

export const getSpaData = async () => {
  try {
    const response = await apiClient.get<ISpaResponseData>('api/spas')
    if (response.success) {
      return response
    }
  } catch (error) {
    console.log('Error fetching spa data:', error)
    throw error
  }
}
