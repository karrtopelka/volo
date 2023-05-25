import { Card, Layout, StepperContainer } from '@/components'
import { Routes } from '@/constants'
import { RequestManagePhotos } from '@/features'
import {
  useDeletePhoto,
  useMutationWrapper,
  usePostPhotos,
  usePostRequest,
} from '@/hooks'
import { BucketNames, MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ImagePickerAsset } from 'expo-image-picker'
import { Box, Button, VStack } from 'native-base'
import { useState } from 'react'

type RequestCreatePhotosScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_CREATE_PHOTOS
>

export const RequestCreatePhotosScreen = ({
  route,
}: RequestCreatePhotosScreenProps): JSX.Element => {
  const { data: requestData } = route.params
  const { mutateAsync: postRequest, isLoading: isPosting } =
    useMutationWrapper(usePostRequest)
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const [photos, setPhotos] = useState<string[]>([])
  const { mutateAsync: uploadPhotos, isLoading: isUploading } =
    useMutationWrapper(usePostPhotos)
  const { mutateAsync: deletePhoto, isLoading: isDeleting } =
    useMutationWrapper(useDeletePhoto)

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
    const formattedData = {
      ...requestData,
      attachments: photos,
    }

    await postRequest(formattedData, {
      successMessageKey: 'Запит успішно створено',
      errorMessageKey: 'Виникла помилка при створенні запиту',
      onSuccess: (data) => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Routes.REQUEST_NAVIGATOR,
              params: {
                screen: Routes.REQUEST,
                params: {
                  id: data.id,
                  isSelfRequest: true,
                },
              },
            },
          ],
        })
      },
    })
  }

  return (
    <Layout p={2}>
      <VStack space={3} p={2}>
        <StepperContainer
          numberOfSteps={4}
          currentStep={4}
          title="Фотознимки"
        />
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
            isLoading={isPosting}
          >
            Створити запит
          </Button>
        </Box>
      </VStack>
    </Layout>
  )
}
