import {IFoodResponseData} from 'interfaces/food'
import apiClient from '../utils/apiClient'

export const getFoodData = async () => {
  try {
    const response = await apiClient.get<IFoodResponseData>('api/foods')
    return response
  } catch (error) {
    console.error('Error fetching food data:', error)
    throw error
  }
}
