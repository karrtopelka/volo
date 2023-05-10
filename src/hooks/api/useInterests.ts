import { APIErrorResponse, Interests } from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from './useQueryList'

export const useInterests = (): UseQueryResult<Interests, APIErrorResponse> =>
  useQueryList({
    url: '/interests/',
    options: {
      staleTime: Infinity,
    },
  })
