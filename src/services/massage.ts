import {IFoodResponseData} from 'interfaces/food'
import {IMassageResponseData} from 'interfaces/massage'
import {IMenuResponseData} from 'interfaces/menu'
import apiClient from 'utils/apiClient'

export const getMassageData = async () => {
  try {
    const response = await apiClient.get<IMassageResponseData>('api/massages')
    if (response.success) {
      return response
    }
  } catch (error) {
    console.error('Error fetching massage data:', error)
    throw error
  }
}
