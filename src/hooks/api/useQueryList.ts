import axios from 'axios'
import { CancellablePromise, AllRequestParams } from '@/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { useApiClient } from './useApiClient'

export type QueryListType<TQueryFnData, TData, TError> = {
  url: string
  params?: AllRequestParams
  options?: {
    enabled?: boolean
    retry?: boolean
    select?: (data: TQueryFnData) => TData
    staleTime?: number
    onError?: (error: TError) => void
  }
}

export const useQueryList = <TQueryFnData, TData, TError = TQueryFnData>({
  url,
  params,
  options,
}: QueryListType<TQueryFnData, TData, TError>): UseQueryResult<
  TData,
  TError
> => {
  const client = useApiClient()

  return useQuery(
    [...url.split('/').filter((path) => path !== ''), params],
    () => {
      const source = axios.CancelToken.source()

      const promise = client
        .get<TQueryFnData>(`${url}`, {
          cancelToken: source.token,
          params,
        })
        .then(unwrapResponse)
        .catch(unwrapErrorResponse) as CancellablePromise<TQueryFnData>

      promise.cancel = () => {
        source.cancel('Query was cancelled by React Query')
      }

      return promise
    },
    { keepPreviousData: true, ...options }
  )
}
