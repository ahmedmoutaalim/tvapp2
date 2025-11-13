import {IMenuResponseData} from '../interfaces/menu'
import apiClient from '../utils/apiClient'

export const getMenuData = async (): Promise<IMenuResponseData> => {
  try {
    console.log('📤 Fetching menu data from api/menus...')
    const response = await apiClient.get<IMenuResponseData>('api/menus')

    console.log('✅ Menu API Response:', {
      success: response.success,
      message: response.message,
      itemsCount: response.menuItems?.length || 0
    })

    if (response.success) {
      return response
    } else {
      // If response is not successful, throw an error
      console.error('❌ Menu API returned unsuccessful response:', response)
      throw new Error(response.message || 'Failed to fetch menu data')
    }
  } catch (error: any) {
    console.error('❌ Error fetching menu data:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    })
    throw error
  }
}
