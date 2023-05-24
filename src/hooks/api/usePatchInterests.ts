import { ApiErrorResponseWrapper, User } from '@/types'
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { REACT_QUERY_KEYS } from '@/constants'

export const usePatchInterests = (): UseMutationResult<
  User,
  ApiErrorResponseWrapper,
  { interests: number[] }
> => {
  const client = useApiClient()
  const queryClient = useQueryClient()

  return useMutation(
    (data) =>
      client
        .patch(`users/interests`, data)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    {
      onSuccess: () => queryClient.invalidateQueries(REACT_QUERY_KEYS.AUTH_ME),
    }
  )
}
