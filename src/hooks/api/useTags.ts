import { APIErrorResponse, Tags } from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from './useQueryList'

export const useTags = (): UseQueryResult<Tags, APIErrorResponse> =>
  useQueryList({
    url: '/tags/',
    options: {
      staleTime: Infinity,
    },
  })
