import { AxiosError, AxiosResponse } from 'axios'

export const unwrapResponse = <T>(response: AxiosResponse<T>): T =>
  response.data

export const unwrapErrorResponse = (error: AxiosError): never => {
  const responseError = error?.response

  if (responseError?.data) {
    const { data } = responseError

    throw { data }
  }

  console.log('error', error)
  throw error
}
