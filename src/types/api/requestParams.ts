import { RequestStatus, RequestType } from './entities'

export type LimitedSearchRequestParams = { limit?: number; offset?: number }

export type SearchRequestParams = {
  search?: string
} & Partial<Record<string, string | number>> &
  LimitedSearchRequestParams

export type RequestSearchRequestParams = {
  status?: RequestStatus
  type?: RequestType
  fromDate?: string
} & SearchRequestParams
