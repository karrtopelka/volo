import { RequestStatus, RequestType } from './entities'

export type SearchRequestParams = {
  limit?: number
  offset?: number
  search?: string
} & Partial<Record<string, string | number>>

export type RequestSearchRequestParams = {
  status?: RequestStatus
  type?: RequestType
  fromDate?: string
} & SearchRequestParams
