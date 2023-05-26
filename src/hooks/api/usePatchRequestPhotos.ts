import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { REACT_QUERY_KEYS } from '@/constants'
import { ApiErrorResponseWrapper, Request } from '@/types'

export const usePatchRequestPhotos = (
  id: number
): UseMutationResult<Request, ApiErrorResponseWrapper, string[]> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .patch(`requests/${id}/photos/`, data)
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
