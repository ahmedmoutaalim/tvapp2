import {IFoodResponseData} from 'interfaces/food'
import {IMenuResponseData} from 'interfaces/menu'
import apiClient from 'utils/apiClient'

export const getMenuData = async () => {
  try {
    const response = await apiClient.get<IMenuResponseData>('api/menu')
    if (response.success) {
      return response
    }
  } catch (error) {
    console.error('Error fetching menu data:', error)
    throw error
  }
}
