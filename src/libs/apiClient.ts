import { API_URL } from '@env'
import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

function getApiClient(): AxiosInstance {
  return axios.create({
    baseURL: API_URL ?? 'http://localhost:3000',
    paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: 'comma' }),
    },
  })
}

export function setAuthHeaders(token?: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export const apiClient = getApiClient()
