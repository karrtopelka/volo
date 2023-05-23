import { Routes } from '@/constants'
import { LocationObject } from 'expo-location'

export type RootStackParamList = {
  [Routes.LOGIN]: undefined
  [Routes.MAIN_NAVIGATOR]: undefined
  [Routes.AUTH_NAVIGATOR]: undefined
  [Routes.NO_ACCESS]: undefined
}

export type MainTabsParamList = {
  [Routes.ACCOUNT_NAVIGATOR]: undefined
  [Routes.ACCOUNT]: { id: number }
  [Routes.ACCOUNT_VIEW]: { id: number }
  [Routes.ACCOUNT_EDIT_NAVIGATOR]: undefined
  [Routes.ACCOUNT_EDIT_PERSONAL_DATA]: undefined
  [Routes.ACCOUNT_EDIT_INTERESTS]: undefined

  [Routes.REQUEST_NAVIGATOR]: undefined
  [Routes.REQUESTS]: undefined
  [Routes.ACCOUNT_REQUESTS]: { id: number }
  [Routes.REQUEST]: { id: number; isSelfRequest: boolean }
  [Routes.REQUEST_CREATE]: { id: number | undefined }
  [Routes.REQUEST_ADD_COMMENT]: { id: number }

  [Routes.CHAT_NAVIGATOR]: undefined
  [Routes.CHATS]: undefined
  [Routes.CHAT]: { id: number; recipientName: string; recipientId: number }
  [Routes.CREATE_CHAT]: undefined

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
