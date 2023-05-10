import { Context, createContext, useEffect } from 'react'
import { AxiosInstance } from 'axios'
import { configureInterceptors } from './configureInterceptors'
import { apiClient, setAuthHeaders } from '@/libs'
import { ReactChildren } from '@/types'
import { useAsyncStorageContext } from '@/hooks/useAsyncStorageContext'

export const ApiContext: Context<{
  client: AxiosInstance
}> = createContext({
  client: apiClient,
})

export const ApiProvider = ({ children }: ReactChildren): JSX.Element => {
  const { accessToken, removeAccessToken } = useAsyncStorageContext()

  useEffect(() => {
    configureInterceptors(apiClient, removeAccessToken)
  }, [removeAccessToken])

  useEffect(() => {
    setAuthHeaders(accessToken)
  }, [accessToken])

  return (
    <ApiContext.Provider
      value={{
        client: apiClient,
      }}
    >
      {children}
    </ApiContext.Provider>
  )
}
