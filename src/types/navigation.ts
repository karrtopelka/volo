import { Routes } from '@/constants'
import { LocationObject } from 'expo-location'
import {
  RequestPostAdditionalInformationStep,
  RequestPostCategoryStep,
  RequestPostGeneralInformation,
  Request,
} from './api'

export type RequestParams = {
  id: number
  isSelfRequest: boolean
}

export type IdParam = {
  id: number
}

export type IdParamNotRequired = {
  id: number | undefined
}

export type DynamicDataParam<T> = {
  data: T
}

export type RootStackParamList = {
  [Routes.LOGIN]: undefined
  [Routes.MAIN_NAVIGATOR]: undefined
  [Routes.AUTH_NAVIGATOR]: undefined
  [Routes.NO_ACCESS]: undefined
}

export type MainTabsParamList = {
  [Routes.ACCOUNT_NAVIGATOR]: undefined
  [Routes.ACCOUNT]: IdParam
  [Routes.ACCOUNT_VIEW]: IdParam
  [Routes.ACCOUNT_EDIT_NAVIGATOR]: undefined
  [Routes.ACCOUNT_EDIT_PERSONAL_DATA]: undefined
  [Routes.ACCOUNT_EDIT_INTERESTS]: undefined

  [Routes.REQUEST_NAVIGATOR]:
    | {
        screen: Routes.REQUEST_INFO
        params: {
          screen: Routes.REQUEST
          params: RequestParams
        }
      }
    | undefined
  [Routes.REQUESTS]: undefined
  [Routes.ACCOUNT_REQUESTS]: IdParam
  [Routes.REQUEST]: RequestParams
  [Routes.REQUEST_INFO]:
    | {
        screen: Routes.REQUEST
        params: RequestParams
      }
    | undefined
  [Routes.REQUEST_CREATE]: IdParamNotRequired
  [Routes.REQUEST_ADD_COMMENT]: IdParam

  [Routes.REQUEST_CREATE_NAVIGATOR]: undefined
  [Routes.REQUEST_CREATE_INITIAL]: undefined
  [Routes.REQUEST_CREATE_GENERAL_INFORMATION]: undefined
  [Routes.REQUEST_CREATE_CATEGORY]: DynamicDataParam<RequestPostGeneralInformation>
  [Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION]: DynamicDataParam<RequestPostCategoryStep>
  [Routes.REQUEST_CREATE_PHOTOS]: DynamicDataParam<RequestPostAdditionalInformationStep>

  [Routes.REQUEST_EDIT_NAVIGATOR]:
    | {
        screen: Routes.REQUEST_EDIT
        params: IdParam
      }
    | undefined
  [Routes.REQUEST_EDIT]: IdParam
  [Routes.REQUEST_EDIT_GENERAL_INFORMATION]: DynamicDataParam<Request>
  [Routes.REQUEST_EDIT_CATEGORY]: DynamicDataParam<Request>
  [Routes.REQUEST_EDIT_ADDITIONAL_INFORMATION]: DynamicDataParam<Request>
  [Routes.REQUEST_EDIT_PHOTOS]: DynamicDataParam<Request>

  [Routes.CHAT_NAVIGATOR]:
    | {
        screen: Routes.CHAT
        params: { id: number; recipientName: string; recipientId: number }
      }
    | undefined
  [Routes.CHATS]: undefined
  [Routes.CHAT]: { id: number; recipientName: string; recipientId: number }
  [Routes.CREATE_CHAT]: { recipientId: number }

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
