import {
  APIErrorResponse,
  PaginatedListResponse,
  Request,
  SearchRequestParams,
} from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from './useQueryList'

export const useRequests = (
  params: SearchRequestParams
): UseQueryResult<PaginatedListResponse<Request>, APIErrorResponse> =>
  useQueryList({
    url: '/requests/',
    params,
  })
