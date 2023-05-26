import { Card, Layout } from '@/components'
import { Routes } from '@/constants'
import { RequestManagePhotos } from '@/features'
import {
  useDeletePhoto,
  useMutationWrapper,
  usePatchRequestPhotos,
  usePostPhotos,
} from '@/hooks'
import { BucketNames, MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImagePickerAsset } from 'expo-image-picker'
import { Box, Button, VStack } from 'native-base'
import { useEffect, useState } from 'react'

type RequestEditPhotosScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_EDIT_PHOTOS
>

export const RequestEditPhotosScreen = ({
  route,
}: RequestEditPhotosScreenProps): JSX.Element => {
  const { data } = route.params
  const { mutateAsync: updateAdditionalInformation, isLoading } =
    useMutationWrapper(usePatchRequestPhotos.bind(null, data.id))
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const [photos, setPhotos] = useState<string[]>([])
  const { mutateAsync: uploadPhotos, isLoading: isUploading } =
    useMutationWrapper(usePostPhotos)
  const { mutateAsync: deletePhoto, isLoading: isDeleting } =
    useMutationWrapper(useDeletePhoto)

  useEffect(() => {
    setPhotos(data.attachments.map(({ fileUrl }) => fileUrl))
  }, [])

  const onPickImage = async (photos: ImagePickerAsset[]) => {
    const newPhotos = photos.map(({ uri }) => ({
      // generate random file name to prevent name duplications
      name:
        Math.random().toString(36).slice(2, 8) +
        Math.random().toString(36).slice(2, 8),
      uri,
    }))

    await uploadPhotos(
      { type: BucketNames.REQUESTS, photos: newPhotos },
      {
        successMessageKey: 'Фотографії успішно завантажено',
        onSuccess: (data) => {
          setPhotos((prevPhotos) => [...prevPhotos, ...data])
        },
      }
    )
  }

  const onRemove = async (photoUrl: string) => {
    await deletePhoto(
      { photoUrl, type: BucketNames.REQUESTS },
      {
        successMessageKey: 'Фотографію успішно видалено',
        onSuccess: () => {
          const newAttachments = photos.filter((photo) => photo !== photoUrl)

          setPhotos(newAttachments)
        },
      }
    )
  }

  const onSubmit = async () => {
    await updateAdditionalInformation(photos, {
      successMessageKey: 'Фотознимки успішно оновлено',
      errorMessageKey: 'Виникла помилка при оновленні фотознимок',
      onSuccess: (data) => {
        navigation.navigate(Routes.REQUEST, {
          id: data.id,
          isSelfRequest: true,
        })
      },
    })
  }

  return (
    <Layout p={2}>
      <VStack space={3} p={2}>
        <Card shortDescription="Ви можете додати відразу пару фотознимок">
          <RequestManagePhotos
            photos={photos}
            onPickImage={onPickImage}
            onRemove={onRemove}
            isLoading={isUploading || isDeleting}
          />
        </Card>
        <Box mt={4}>
          <Button
            onPress={onSubmit}
            size="lg"
            width="100%"
            isLoading={isLoading}
          >
            Зберегти
          </Button>
        </Box>
      </VStack>
    </Layout>
  )
}
