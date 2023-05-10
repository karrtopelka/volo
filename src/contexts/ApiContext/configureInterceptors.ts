import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { isValidToken } from '@/utils'
import { UserAuthInfo } from '@/types'
import { API_URL } from '@env'

const refreshAccessToken = (
  client: AxiosInstance,
  refresh: string,
  request: AxiosRequestConfig
) =>
  client
    .post<UserAuthInfo>('/auth/refresh/', { refresh })
    .then((response) => {
      const token = response.data.accessToken

      AsyncStorage.setItem(ACCESS_TOKEN_KEY, token)

      if (request.headers) {
        request.headers['Authorization'] = `Bearer ${token}`
      }

      client(request)
    })
    .catch((err) => {
      console.warn(err)
    })

export const configureInterceptors = (
  client: AxiosInstance,
  clearStorageValue: () => void
): void => {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ statusCode?: string }>) => {
      const { response: errorResponse, config: originalRequest } = error

      const isAuthorizationError = errorResponse?.status === 401

      if (!isAuthorizationError || !originalRequest) {
        return Promise.reject(error)
      }

      // refresh token is not valid -> logout
      if (originalRequest?.url === API_URL + '/auth/refresh/') {
        clearStorageValue()

        return Promise.reject(error)
      }

      // try to refresh token
      if (errorResponse?.data?.statusCode === 'token_not_valid') {
        const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY)

        if (refreshToken && isValidToken(refreshToken)) {
          return refreshAccessToken(client, refreshToken, originalRequest)
        } else {
          clearStorageValue()
        }
      }

      return Promise.reject(error)
    }
  )
}
