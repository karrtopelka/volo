import {
  APIErrorResponse,
  PaginatedListResponse,
  LimitedSearchRequestParams,
  Chat,
} from '@/types'
import { UseQueryResult } from '@tanstack/react-query'
import { useQueryList } from '../useQueryList'

export const useChats = (
  params: LimitedSearchRequestParams
): UseQueryResult<PaginatedListResponse<Chat>, APIErrorResponse> =>
  useQueryList({
    url: '/chats',
    params,
  })
