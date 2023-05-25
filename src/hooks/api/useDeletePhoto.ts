import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, BucketNames } from '@/types'

export type UseDeletePhotoProps = {
  type: BucketNames
  photoUrl: string
}

export const useDeletePhoto = (): UseMutationResult<
  void,
  ApiErrorResponseWrapper,
  UseDeletePhotoProps
> => {
  const client = useApiClient()

  return useMutation((data) =>
    client
      .delete(`uploads/`, { data })
      .then(unwrapResponse)
      .catch(unwrapErrorResponse)
  )
}
