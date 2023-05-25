import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { useApiClient } from './useApiClient'
import { unwrapErrorResponse, unwrapResponse } from '@/utils'
import { ApiErrorResponseWrapper, BucketNames } from '@/types'

export type UsePostPhotosProps = {
  type: BucketNames
  photos: {
    uri: string
    name: string
  }[]
}

export const usePostPhotos = (): UseMutationResult<
  string[],
  ApiErrorResponseWrapper,
  UsePostPhotosProps
> => {
  const client = useApiClient()

  return useMutation((data) => {
    const requests = data.photos.map((item) => {
      const formData = new FormData()

      formData.append('type', data.type)

      const file = {
        ...item,
        type: 'image/jpeg',
      }

      formData.append('file', file as unknown as Blob)

      return client.post(`uploads/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    })

    return Promise.all(requests)
      .then((responses) => responses.map(unwrapResponse))
      .catch(unwrapErrorResponse)
  })
}
