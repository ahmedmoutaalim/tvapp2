import {ITransportResponseData} from 'interfaces/transport'
import apiClient from 'utils/apiClient'

export const getTransportData = async () => {
  try {
    const response = await apiClient.get<ITransportResponseData>(
      'api/transport'
    )
    if (response.success) {
      return response
    }
  } catch (error) {
    console.error('Error fetching transport data:', error)
    throw error
  }
}
