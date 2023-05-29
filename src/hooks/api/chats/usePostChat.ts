import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { useApiClient } from '../useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, Chat, ChatPost } from '@/types'

export const usePostChat = (): UseMutationResult<
  Chat,
  ApiErrorResponseWrapper,
  ChatPost
> => {
  const client = useApiClient()

  return useMutation((data) =>
    client.post(`chats/`, data).then(unwrapResponse).catch(unwrapErrorResponse)
  )
}
