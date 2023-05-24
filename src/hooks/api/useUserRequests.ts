import {
  APIErrorResponse,
  PaginatedListResponse,
  Request,
  RequestSearchRequestParams,
} from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from './useQueryList'

export const useUserRequests = (
  id: number | undefined,
  params: RequestSearchRequestParams
): UseQueryResult<PaginatedListResponse<Request>, APIErrorResponse> =>
  useQueryList({
    url: `/requests/user/${id}`,
    params,
    options: {
      enabled: !!id,
    },
  })
