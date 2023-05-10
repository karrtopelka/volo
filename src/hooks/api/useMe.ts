import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { User } from '@/types'
import { unwrapErrorResponse, unwrapResponse } from '@/utils/unwrapResponse'
import { REACT_QUERY_KEYS } from '@/constants'
import { useApiClient } from './useApiClient'

export const useMe = (): UseQueryResult<User, Error> => {
  const client = useApiClient()

  return useQuery(REACT_QUERY_KEYS.AUTH_ME, () =>
    client.get('/auth/me/').then(unwrapResponse).catch(unwrapErrorResponse)
  )
}
