import { RequestStatus, RequestType } from './entities'

export type DefaultRequestParams = {
  limit?: number
  offset?: number
}

export type CursorRequestParams = {
  cursor?: number
} & DefaultRequestParams

export type RequestSearchRequestParams = {
  status?: RequestStatus
  type?: RequestType
  fromDate?: number
  category?: number
} & CursorRequestParams

export type AllRequestParams = RequestSearchRequestParams
