import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { REACT_QUERY_KEYS } from '@/constants'
import { ApiErrorResponseWrapper, Request, RequestPost } from '@/types'

export const usePatchRequest = (
  id: number
): UseMutationResult<Request, ApiErrorResponseWrapper, RequestPost> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .patch(`requests/${id}/`, data)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(
          REACT_QUERY_KEYS.REQUEST.map((key) =>
            key === ':id' ? id.toString() : key
          )
        ),
    }
  )
}
