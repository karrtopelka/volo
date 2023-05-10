import { createContext, useEffect, useState } from 'react'
import { ReactChildren } from '@/types'
import { ACCESS_TOKEN_KEY } from '@/constants'
import { useAsyncStorage } from '@/hooks/useAsyncStorage'

/**
 * Unfortunately, in React Native there is no possibility out of the box to listen to changes in AsyncStorage.
 * So I decided to create such context to fix that problem as based on token it's needed to change components logic.
 */

export type AsyncStorageContextType = {
  accessToken: undefined | null | string
  setAccessToken: (userToken: string) => void
  removeAccessToken: () => void
}

const defaultValues: AsyncStorageContextType = {
  accessToken: undefined,
  setAccessToken: () => undefined,
  removeAccessToken: () => undefined,
}

export const AsyncStorageContext =
  createContext<AsyncStorageContextType>(defaultValues)

export const AsyncStorageProvider = ({ children }: ReactChildren) => {
  const [token, setToken] = useState<undefined | null | string>()

  const {
    value: accessToken,
    setValue: setAccessToken,
    removeValue: removeAccessToken,
  } = useAsyncStorage(ACCESS_TOKEN_KEY)

  useEffect(() => {
    setToken(accessToken)
  }, [accessToken])

  return (
    <AsyncStorageContext.Provider
      value={{ accessToken: token, setAccessToken, removeAccessToken }}
    >
      {children}
    </AsyncStorageContext.Provider>
  )
}
