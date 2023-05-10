import { useContext } from 'react'
import {
  AsyncStorageContextType,
  AsyncStorageContext,
} from '@/contexts/AsyncStorageContext'

export const useAsyncStorageContext = (): AsyncStorageContextType =>
  useContext(AsyncStorageContext)
