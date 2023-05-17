import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Request } from '@/types'
import { unwrapErrorResponse, unwrapResponse } from '@/utils/unwrapResponse'
import { REACT_QUERY_KEYS } from '@/constants'
import { useApiClient } from './useApiClient'

export type UseUsertProps = {
  id: number | undefined
}

export const useUser = ({
  id,
}: UseUsertProps): UseQueryResult<Request, Error> => {
  const client = useApiClient()

  return useQuery(
    REACT_QUERY_KEYS.USER.map((key) =>
      key === ':id' && id ? id.toString() : key
    ),
    () =>
      client
        .get(`/users/${id}/`)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    { enabled: !!id }
  )
}
