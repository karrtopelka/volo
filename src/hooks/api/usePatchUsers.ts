import { ApiErrorResponseWrapper, User, UserPost } from '@/types'
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { REACT_QUERY_KEYS } from '@/constants'

export const usePatchUsers = (): UseMutationResult<
  User,
  ApiErrorResponseWrapper,
  UserPost
> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .patch(`users/`, data)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      onSuccess: () => queryClient.invalidateQueries(REACT_QUERY_KEYS.AUTH_ME),
    }
  )
}
