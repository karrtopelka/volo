import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from '../useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, Chat, ChatPost } from '@/types'
import { REACT_QUERY_KEYS } from '@/constants'

export const usePostChat = (): UseMutationResult<
  Chat,
  ApiErrorResponseWrapper,
  ChatPost
> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .post(`chats/`, data)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      onSuccess: (data: Chat) => {
        queryClient.setQueryData(
          REACT_QUERY_KEYS.CHAT.map((key) =>
            key === ':id' ? data.id.toString() : key
          ),
          data
        )
      },
    }
  )
}
