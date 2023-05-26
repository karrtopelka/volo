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

export const useUserRequests = (
  id: number | undefined,
  params: RequestSearchRequestParams
): UseInfiniteQueryResult<
  PaginatedCursorResponse<Request>,
  APIErrorResponse
> => {
  const client = useApiClient()

  return useInfiniteQuery(
    REACT_QUERY_KEYS.USER_ID_REQUESTS.map((item) =>
      item === ':id' ? id?.toString() : item
    ),
    ({ pageParam = null }) =>
      client
        .get(`/requests/user/${id}`, {
          params: {
            ...params,
            cursor: pageParam,
          },
        })
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      enabled: !!id,
      getNextPageParam: (lastPage: PaginatedCursorResponse<Request>) =>
        lastPage.next,
    }
  )
}
