import { API_ENDPOINT } from '@/constants/env'
import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

function getApiClient(): AxiosInstance {
  return axios.create({
    baseURL: API_ENDPOINT ?? '',
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
