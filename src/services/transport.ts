import {ITransportResponseData, GetTransportParams} from 'interfaces/transport'
import apiClient from '../utils/apiClient'

export const getTransportData = async (
  params?: GetTransportParams
): Promise<ITransportResponseData> => {
  try {
    const response = await apiClient.get<ITransportResponseData>(
      'api/transport',
      {params}
    )

    console.log(
      '================= Transport response service ==============',
      response
    )

    return response
  } catch (error) {
    console.error('Error fetching transport data:', error)
    throw error
  }
}
