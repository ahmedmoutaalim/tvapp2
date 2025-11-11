export interface ClientData {
  _id?: string
  name: string
  phone: string
  roomNumber: string
  language: string
  days: number
  status: string
  createdAt: string
}

export interface ClientTvData {
  id: string
  roomNumber: string
  userName: string
  // Add other fields as needed based on your API response
}

export interface GetMeDataResponse {
  client: ClientData
  // Add other response fields as needed
}
