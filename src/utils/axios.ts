// src/services/api/apiClient.ts

import axios, {AxiosInstance, AxiosError} from 'axios'

// API configuration
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://72.60.91.32/'

console.log('🔧 API_URL from env:', API_URL)

// Create a callback for handling unauthorized access
let onUnauthorized: (() => void) | null = null

export const setUnauthorizedCallback = (callback: () => void) => {
  onUnauthorized = callback
}

// Create axios instance with default configuration
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json'
  },
  timeout: 10000
})

console.log('==============axiosInstance======', axiosInstance)

// Request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    // Log the full URL being called
    const fullUrl = `${config.baseURL}${config.url}`
    console.log('========================================')
    console.log('🌐 API Request URL:', fullUrl)
    console.log('📝 Method:', config.method?.toUpperCase())
    console.log('📦 Params:', config.params)
    console.log('📄 Data:', config.data)
    console.log('========================================')

    console.log('Request interceptor - Config:', config)
    return config
  },
  error => {
    console.error('Request interceptor - Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('Response interceptor - Success:', {
      status: response.status,
      data: response.data
    })
    return response
  },
  async (error: AxiosError) => {
    console.log('errrrrrrrr__::', error?.response?.data)

    console.error('Response interceptor - Full Error:', {
      message: error?.response?.data,
      code: error.code,
      config: error.config,
      response: error.response
    })

    // Enhanced error classification
    if (!error.response) {
      // Network error - no response received
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        error.message = 'NETWORK_TIMEOUT'
        error.code = 'NETWORK_ERROR'
      } else if (
        error.code === 'ERR_NETWORK' ||
        error.message.includes('Network Error')
      ) {
        error.message = 'NETWORK_UNAVAILABLE'
        error.code = 'NETWORK_ERROR'
      } else if (
        error.code === 'ENOTFOUND' ||
        error.message.includes('getaddrinfo')
      ) {
        error.message = 'NETWORK_DNS_ERROR'
        error.code = 'NETWORK_ERROR'
      } else {
        error.message = 'NETWORK_CONNECTION_ERROR'
        error.code = 'NETWORK_ERROR'
      }
    } else {
      // Server responded with error status
      const {status} = error.response
      console.log('Response interceptor - Error status:', status)

      if (status === 401) {
        console.log('Response interceptor - Unauthorized, removing tokens')
        error.code = 'AUTH_ERROR'

        // Notify the auth context that user is unauthorized
        if (onUnauthorized) {
          onUnauthorized()
        }
      } else if (status >= 500) {
        error.code = 'SERVER_ERROR'
      }
    }

    return Promise.reject(error)
  }
)
