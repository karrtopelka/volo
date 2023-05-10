import { Routes } from '@/constants'
import { LocationObject } from 'expo-location'
import { User } from './api'

export type RootStackParamList = {
  [Routes.LOGIN]: undefined
  [Routes.MAIN_NAVIGATOR]: undefined
  [Routes.AUTH_NAVIGATOR]: undefined
  [Routes.NO_ACCESS]: undefined
}

export type MainTabsParamList = {
  [Routes.ACCOUNT_NAVIGATOR]: undefined
  [Routes.ACCOUNT]: undefined
  [Routes.ACCOUNT_EDIT]: { user: User }

  [Routes.REQUEST_NAVIGATOR]: undefined
  [Routes.MY_REQUESTS]: undefined
  [Routes.REQUEST]: { id: number; isSelfRequest: boolean }
  [Routes.REQUEST_CREATE]: { id: number | undefined }
  [Routes.REQUEST_ADD_COMMENT]: { id: number }

  [Routes.FEED]: undefined
  [Routes.FEED_ALL]: undefined
  [Routes.FEED_DONATION]: undefined
  [Routes.FEED_SUPPORT]: undefined
}

export type AuthStackParamList = {
  [Routes.LOGIN]: { location: LocationObject }
  [Routes.REGISTER]: { location: LocationObject }
  [Routes.FORGOT_PASSWORD]: undefined
  [Routes.RESTORE_PASSWORD]: undefined
}

export type AllNavigatorsParamList = RootStackParamList & MainTabsParamList
