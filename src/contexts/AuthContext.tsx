import { createContext, useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { REACT_QUERY_KEYS, REFRESH_TOKEN_KEY } from '@/constants'
import { ReactChildren } from '@/types'
import { useAsyncStorage } from '@/hooks/useAsyncStorage'
import { useAsyncStorageContext } from '@/hooks/useAsyncStorageContext'
import { useUserMeAsMutation } from '@/hooks/useUserMeAsMutation'

export type AuthContextType = {
  isLoggedIn?: boolean
  login(access: string, refresh: string, isRemember: boolean): void
  logout(): void
}

const defaultValues: AuthContextType = {
  isLoggedIn: undefined,
  login: () => null,
  logout: () => null,
}

export const AuthContext = createContext<AuthContextType>(defaultValues)

export const AuthProvider = ({ children }: ReactChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>()

  const queryClient = useQueryClient()

  const { accessToken, removeAccessToken, setAccessToken } =
    useAsyncStorageContext()

  const { setValue: setRefreshToken, removeValue: removeRefreshToken } =
    useAsyncStorage(REFRESH_TOKEN_KEY)

  const { mutateAsync: getUser } = useUserMeAsMutation()

  useEffect(() => {
    if (accessToken === undefined) {
      return
    }

    if (accessToken === null) {
      if (isLoggedIn) {
        logout()
      } else {
        setIsLoggedIn(false)
      }

      return
    }

    async function init() {
      try {
        const user = await getUser()

        queryClient.setQueryData(REACT_QUERY_KEYS.AUTH_ME, user)

        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }

    init()
  }, [accessToken, getUser, queryClient])

  const login: AuthContextType['login'] = (
    access,
    refresh,
    shouldRemember = true
  ) => {
    setAccessToken(access)

    if (shouldRemember) {
      setRefreshToken(refresh)
    }
  }

  const logout = () => {
    removeAccessToken()
    removeRefreshToken()

    setIsLoggedIn(false)

    queryClient.clear()
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
