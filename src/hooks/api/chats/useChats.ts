import {
  APIErrorResponse,
  PaginatedCursorResponse,
  CursorRequestParams,
  Chat,
} from '@/types'
import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query'
import { useApiClient } from '../useApiClient'
import { REACT_QUERY_KEYS } from '@/constants'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'

export const useChats = (
  params: CursorRequestParams
): UseInfiniteQueryResult<PaginatedCursorResponse<Chat>, APIErrorResponse> => {
  const client = useApiClient()

  return useInfiniteQuery(
    REACT_QUERY_KEYS.CHATS,
    ({ pageParam = null }) =>
      client
        .get(`/chats/`, {
          params: {
            ...params,
            cursor: pageParam,
          },
        })
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      getNextPageParam: (lastPage: PaginatedCursorResponse<Chat>) =>
        lastPage.next,
    }
  )
}
