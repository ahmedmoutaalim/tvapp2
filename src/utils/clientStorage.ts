import AsyncStorage from '@react-native-async-storage/async-storage'
import type {ClientData} from '../interfaces/clientTv'

const CLIENT_DATA_KEY = '@tv_app_client_data'

export const saveClientData = async (clientData: ClientData): Promise<void> => {
  try {
    await AsyncStorage.setItem(CLIENT_DATA_KEY, JSON.stringify(clientData))
    console.log('✅ Client data saved to AsyncStorage:', clientData)
  } catch (error) {
    console.error('❌ Error saving client data:', error)
    throw error
  }
}

export const getClientData = async (): Promise<ClientData | null> => {
  try {
    const data = await AsyncStorage.getItem(CLIENT_DATA_KEY)
    if (data) {
      const clientData: ClientData = JSON.parse(data)
      console.log('✅ Client data retrieved from AsyncStorage:', clientData)
      return clientData
    }
    console.log('⚠️ No client data found in AsyncStorage')
    return null
  } catch (error) {
    console.error('❌ Error retrieving client data:', error)
    return null
  }
}

export const getClientId = async (): Promise<string | null> => {
  try {
    const clientData = await getClientData()
    // Use _id if available, otherwise use roomNumber as fallback
    if (clientData) {
      const id = clientData.id || clientData.roomNumber
      console.log('📌 Client ID retrieved:', id)
      return id
    }
    return null
  } catch (error) {
    console.error('❌ Error getting client ID:', error)
    return null
  }
}

export const clearClientData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CLIENT_DATA_KEY)
    console.log('✅ Client data cleared from AsyncStorage')
  } catch (error) {
    console.error('❌ Error clearing client data:', error)
    throw error
  }
}
