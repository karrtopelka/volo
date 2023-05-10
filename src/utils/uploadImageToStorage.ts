import { storageClient } from '@/libs'
import { decode } from 'base64-arraybuffer'

export type uploadImageToStorageProps = {
  base64: string
  bucketName: string
  path?: string
}

export const uploadImageToStorage = async ({
  base64,
  bucketName,
  path,
}: uploadImageToStorageProps): Promise<string> => {
  const fileName = `${Date.now()}.jpg`
  const newPath = path ? `${path}/${fileName}` : fileName

  const { data, error } = await storageClient
    .from(bucketName)
    .upload(newPath, decode(base64), {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/png',
    })

  if (error) {
    console.error(error)

    throw new Error('Failed to upload image')
  }

  const { data: downloadedFile } = storageClient
    .from(bucketName)
    .getPublicUrl(data.path)

  return downloadedFile.publicUrl
}
