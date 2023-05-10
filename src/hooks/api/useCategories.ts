import { APIErrorResponse, Categories } from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from './useQueryList'

export const useCategories = (): UseQueryResult<Categories, APIErrorResponse> =>
  useQueryList({
    url: '/categories/',
    options: {
      staleTime: Infinity,
    },
  })
