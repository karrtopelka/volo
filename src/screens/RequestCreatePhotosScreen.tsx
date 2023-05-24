import { Card, Layout, StepperContainer } from '@/components'
import { Routes } from '@/constants'
import { EntityPhoto, RequestManagePhotos } from '@/features'
import { MainTabsParamList } from '@/types'
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
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const [photos, setPhotos] = useState<EntityPhoto[]>([])

  const onPickImage = (result: ImagePickerAsset[]) => {
    const newPhotos = result.map(({ base64 }) => ({
      link: base64!,
      id: Date.now() + Math.floor(Math.random() * (1000 - 9999 + 1)) + 1000,
    }))

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos])
  }

  const onRemove = (photoId: number) => {
    const newAttachments = photos.filter(
      (photo: EntityPhoto) => photo.id !== photoId
    )

    setPhotos(newAttachments)
  }

  const onSubmit = () => {
    const formattedPhotos = !!photos.length
      ? []
      : photos.map(({ link }) => link)

    const formattedData = {
      ...requestData,
      attachments: formattedPhotos,
    }

    navigation.navigate(Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION, {
      data: formattedData,
    })
  }

  return (
    <Layout p={2}>
      <VStack space={3} p={2}>
        <StepperContainer
          numberOfSteps={5}
          currentStep={3}
          title="Фотознимки"
        />
        <Card shortDescription="Ви можете додати відразу пару фотознимок">
          <RequestManagePhotos
            photos={photos}
            onPickImage={onPickImage}
            onRemove={onRemove}
          />
        </Card>
        <Box mt={4}>
          <Button onPress={onSubmit} size="lg" width="100%">
            Наступний крок
          </Button>
        </Box>
      </VStack>
    </Layout>
  )
}
