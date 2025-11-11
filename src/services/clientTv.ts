import {AxiosError} from 'axios'
import apiClient from '../utils/apiClient'

export const getMeData = async (roomNumber: string) => {
  console.log('==========roomNumber=========', roomNumber)

  try {
    const response = await apiClient.post<any>('api/clientTv/tvlogin', {
      roomNumber: roomNumber
    })
    console.log('✅ getMeData response:', response)
    return response
  } catch (error) {
    const err = error as AxiosError
    console.log('❌ error get Me Data service', err)
    throw err
  }
}
