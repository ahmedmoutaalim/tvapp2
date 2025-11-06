export interface ClientTvData {
  id: string
  roomNumber: string
  userName: string
  // Add other fields as needed based on your API response
}

export interface GetMeDataResponse {
  data: ClientTvData
  // Add other response fields as needed
}
