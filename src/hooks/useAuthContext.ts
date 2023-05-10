import { useContext } from 'react'
import { AuthContext, AuthContextType } from '@/contexts/AuthContext'

export const useAuthContext = (): AuthContextType => useContext(AuthContext)
