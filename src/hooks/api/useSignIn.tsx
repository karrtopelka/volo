import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, UserAuthInfo, UserCredentials } from '@/types'

export const useSignIn = (): UseMutationResult<
  UserAuthInfo,
  ApiErrorResponseWrapper,
  UserCredentials
> => {
  const client = useApiClient()

  return useMutation((data) =>
    client
      .post<UserAuthInfo>('/auth/local/signin/', data)
      .then(unwrapResponse)
      .catch(unwrapErrorResponse)
  )
}
