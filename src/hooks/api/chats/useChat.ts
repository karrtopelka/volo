import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import {
  LimitedSearchRequestParams,
  Message,
  PaginatedCursorResponse,
} from '@/types'
import { unwrapErrorResponse, unwrapResponse } from '@/utils/unwrapResponse'
import { REACT_QUERY_KEYS } from '@/constants'
import { useApiClient } from '../useApiClient'

export type UseChatProps = {
  id: number | undefined
  params: LimitedSearchRequestParams
}

export const useChat = ({
  id,
  params,
}: UseChatProps): UseInfiniteQueryResult<
  PaginatedCursorResponse<Message>,
  Error
> => {
  const client = useApiClient()

  return useInfiniteQuery(
    REACT_QUERY_KEYS.CHAT.map((key) =>
      key === ':id' && id ? id.toString() : key
    ),
    ({ pageParam = null }) =>
      client
        .get(`/chats/${id}/`, {
          params: {
            ...params,
            cursor: pageParam,
          },
        })
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      enabled: !!id,
      getNextPageParam: (lastPage: PaginatedCursorResponse<Message>) =>
        lastPage.next,
    }
  )
}
