import {IMassageResponseData} from 'interfaces/massage'
import apiClient from '../utils/apiClient'

export const getMassageData = async () => {
  try {
    const response = await apiClient.get<IMassageResponseData>('api/massages')
    return response
  } catch (error) {
    console.error('Error fetching massage data:', error)
    throw error
  }
}
