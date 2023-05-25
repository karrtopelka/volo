import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, BucketNames } from '@/types'

export type UsePostPhotoProps = {
  type: BucketNames
  photo: {
    uri: string
    name: string
  }
}

export const usePostPhoto = (): UseMutationResult<
  string,
  ApiErrorResponseWrapper,
  UsePostPhotoProps
> => {
  const client = useApiClient()

  return useMutation(({ type, photo }) => {
    const formData = new FormData()

    formData.append('type', type)

    const file = {
      ...photo,
      type: 'image/jpeg',
    }

    formData.append('file', file as unknown as Blob)

    return client
      .post(`uploads/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(unwrapResponse)
      .catch(unwrapErrorResponse)
  })
}
