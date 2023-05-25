import {
  APIErrorResponse,
  PaginatedCursorResponse,
  Request,
  RequestSearchRequestParams,
} from '@/types'
import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { REACT_QUERY_KEYS } from '@/constants'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'

export const useMyRequests = (
  params: RequestSearchRequestParams
): UseInfiniteQueryResult<
  PaginatedCursorResponse<Request>,
  APIErrorResponse
> => {
  const client = useApiClient()

  return useInfiniteQuery(
    [...REACT_QUERY_KEYS.MY_REQUESTS, params],
    ({ pageParam = null }) =>
      client
        .get(`/requests/my/requests`, {
          params: {
            ...params,
            cursor: pageParam,
          },
        })
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      getNextPageParam: (lastPage: PaginatedCursorResponse<Request>) =>
        lastPage.next,
    }
  )
}
