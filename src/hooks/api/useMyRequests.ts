import {
  APIErrorResponse,
  PaginatedListResponse,
  Request,
  RequestSearchRequestParams,
} from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from './useQueryList'

export const useMyRequests = (
  params: RequestSearchRequestParams
): UseQueryResult<PaginatedListResponse<Request>, APIErrorResponse> =>
  useQueryList({
    url: '/requests/my/requests',
    params,
  })
