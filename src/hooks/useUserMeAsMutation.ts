import { User } from '@/types'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { useApiClient } from './api/useApiClient'
import { useMutation } from '@tanstack/react-query'

export const useUserMeAsMutation = () => {
  const client = useApiClient()

  return useMutation(() =>
    client
      .get<User>('/auth/me/')
      .then(unwrapResponse)
      .catch(unwrapErrorResponse)
  )
}
