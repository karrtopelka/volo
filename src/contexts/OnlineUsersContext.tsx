import { ReactChildren } from '@/types'
import { createContext, useContext, useState } from 'react'

export type OnlineUsersContextType = {
  userIds: number[]
  updateUserIds: (newUserIds: number[]) => void
}

export const OnlineUsersContext = createContext<OnlineUsersContextType>({
  userIds: [],
  updateUserIds: () => undefined,
})

export const useOnlineUsers = () => useContext(OnlineUsersContext)

export const OnlineUsersContextProvider = ({ children }: ReactChildren) => {
  const [userIds, setUserIds] = useState<number[]>([])

  const updateUserIds = (newUserIds: number[]) => {
    setUserIds(newUserIds)
  }

  return (
    <OnlineUsersContext.Provider
      value={{
        userIds,
        updateUserIds,
      }}
    >
      {children}
    </OnlineUsersContext.Provider>
  )
}
