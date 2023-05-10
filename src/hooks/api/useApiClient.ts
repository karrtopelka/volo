import { AxiosInstance } from 'axios'
import { useContext } from 'react'
import { ApiContext } from '@/contexts/ApiContext'

export const useApiClient = (): AxiosInstance => {
  const { client } = useContext(ApiContext)

  return client
}
