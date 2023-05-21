import { useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  Chat,
  LimitedSearchRequestParams,
  PaginatedListResponse,
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
}: UseChatProps): UseQueryResult<PaginatedListResponse<Chat>, Error> => {
  const client = useApiClient()

  return useQuery(
    REACT_QUERY_KEYS.CHAT.map((key) =>
      key === ':id' && id ? id.toString() : key
    ),
    () =>
      client
        .get(`/chats/${id}/`, { params })
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    { enabled: !!id, staleTime: 60 * 60 * 24 }
  )
}
