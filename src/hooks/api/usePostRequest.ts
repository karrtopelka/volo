import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, Request, RequestPost } from '@/types'
import { REACT_QUERY_KEYS } from '@/constants'

export const usePostRequest = (): UseMutationResult<
  Request,
  ApiErrorResponseWrapper,
  RequestPost
> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .post(`requests/`, data)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      onSuccess: (data: Request) => {
        queryClient.setQueryData(
          REACT_QUERY_KEYS.REQUEST.map((key) =>
            key === ':id' ? data.id.toString() : key
          ),
          data
        )
      },
    }
  )
}
