import { useImagePicker } from '@/hooks'
import { isUrl } from '@/utils'
import { MaterialIcons } from '@expo/vector-icons'
import { ImagePickerAsset } from 'expo-image-picker'
import {
  Box,
  Button,
  HStack,
  Icon,
  Pressable,
  useToast,
  Text,
  Center,
} from 'native-base'
import { useState } from 'react'
import ImageView from 'react-native-image-viewing'
import { Image } from 'expo-image'
import { RemovePhotoButton } from './RemovePhotoButton'

export type RequestManagePhotosProps = {
  photos: string[]
  onPickImage: (attachments: ImagePickerAsset[]) => Promise<void>
  onRemove: (photoUri: string) => Promise<void>
  isLoading?: boolean
}

export const RequestManagePhotos = ({
  photos,
  onPickImage,
  onRemove,
  isLoading,
}: RequestManagePhotosProps): JSX.Element => {
  const { show } = useToast()
  const pickImage = useImagePicker({})
  const [isImageLoading, setIsImageLoading] = useState(false)

  const handleAddImage = async (): Promise<void> => {
    try {
      setIsImageLoading(true)
      const result = await pickImage()

      if (!result) {
        return
      }

      onPickImage(result)
    } catch (error) {
      console.error(error)
      show({
        render: () => (
          <Box bg="danger.300" px="4" py="3" rounded="sm">
            <Text color="white">Під час вибору фотографій сталася помилка</Text>
          </Box>
        ),
        placement: 'top',
        variant: 'subtle',
      })
    } finally {
      setIsImageLoading(false)
    }
  }

  const [visible, setIsVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const handleImagePress = (imageIndex: number) => {
    setImageIndex(imageIndex)
    setIsVisible(true)
  }

  return (
    <HStack flexWrap="wrap">
      {photos?.map((photoUrl, index) => (
        <Box
          key={photoUrl}
          width="27%"
          height={24}
          mb={4}
          mr={4}
          position="relative"
        >
          <Pressable
            onPress={() => handleImagePress(index)}
            style={{ flex: 1, width: '100%' }}
          >
            <Image
              source={{
                uri: isUrl(photoUrl)
                  ? photoUrl
                  : `data:image/jpeg;base64,${photoUrl}`,
              }}
              contentFit="cover"
              transition={500}
              style={{ flex: 1, width: '100%' }}
            />
          </Pressable>
          <RemovePhotoButton uri={photoUrl} onRemove={onRemove} />
        </Box>
      ))}

      <Center width="30%" height={24}>
        <Button
          py={0}
          px={0}
          height="40px"
          width="40px"
          startIcon={
            <Icon
              color="white"
              as={MaterialIcons}
              size={8}
              name="add-circle-outline"
            />
          }
          isLoading={isLoading ?? isImageLoading}
          onPress={handleAddImage}
        />
        <Text fontSize={11} color="gray.500">
          {isLoading ?? isImageLoading ? 'Завантажується' : 'Завантажити фото'}
        </Text>
      </Center>

      <ImageView
        images={
          photos?.map((photoUrl) => ({
            uri: photoUrl,
          })) ?? []
        }
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </HStack>
  )
}
