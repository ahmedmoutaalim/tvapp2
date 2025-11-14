import {IMenuResponseData} from '../interfaces/menu'
import apiClient from '../utils/apiClient'

export const getMenuData = async (): Promise<IMenuResponseData> => {
  try {
    console.log('📤 Fetching menu data from api/menus...')
    const response = await apiClient.get<IMenuResponseData>('api/menus')

    console.log('✅ Menu API Response:', response)
    return response
  } catch (error: any) {
    console.error('❌ Error fetching menu data:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    })
    throw error
  }
}
