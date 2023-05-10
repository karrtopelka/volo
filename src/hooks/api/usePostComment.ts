import { ApiErrorResponseWrapper, CommentPost } from '@/types'
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { REACT_QUERY_KEYS } from '@/constants'

export const usePostComment = (
  requestId: number
): UseMutationResult<Request, ApiErrorResponseWrapper, CommentPost> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .post(`requests/${requestId}/comments/`, data)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(
          REACT_QUERY_KEYS.REQUEST.map((key) =>
            key === ':id' ? requestId.toString() : key
          )
        ),
    }
  )
}
