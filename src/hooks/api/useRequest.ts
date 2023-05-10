import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Request } from '@/types'
import { unwrapErrorResponse, unwrapResponse } from '@/utils/unwrapResponse'
import { REACT_QUERY_KEYS } from '@/constants'
import { useApiClient } from './useApiClient'

export type UseRequestProps = {
  id: number | undefined
}

export const useRequest = ({
  id,
}: UseRequestProps): UseQueryResult<Request, Error> => {
  const client = useApiClient()

  return useQuery(
    REACT_QUERY_KEYS.REQUEST.map((key) =>
      key === ':id' && id ? id.toString() : key
    ),
    () =>
      client
        .get(`/requests/${id}/`)
        .then(unwrapResponse)
        .catch(unwrapErrorResponse),
    { enabled: !!id }
  )
}
