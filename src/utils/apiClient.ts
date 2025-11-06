import {axiosInstance} from './axios'

export const apiClient = {
  get: <T>(path: string, config = {}) =>
    axiosInstance.get<T>(path, config).then(response => response.data),

  post: <T>(path: string, data = {}, config = {}) =>
    axiosInstance.post<T>(path, data, config).then(response => response.data),

  put: <T>(path: string, data = {}, config = {}) =>
    axiosInstance.put<T>(path, data, config).then(response => response.data),

  patch: <T>(path: string, data = {}, config = {}) =>
    axiosInstance.patch<T>(path, data, config).then(response => response.data),

  delete: <T>(path: string, config = {}) =>
    axiosInstance.delete<T>(path, config).then(response => response.data)
}

export default apiClient
