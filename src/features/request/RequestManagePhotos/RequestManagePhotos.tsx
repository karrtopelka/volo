import { ControlledFieldProps } from '@/types'
import { isUrl } from '@/utils'
import { MaterialIcons } from '@expo/vector-icons'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
} from 'native-base'
import { useEffect, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import ImageView from 'react-native-image-viewing'

export type RequestManagePhotosProps<T extends FieldValues> =
  ControlledFieldProps<T>

export const RequestManagePhotos = <T extends FieldValues>({
  name,
  control,
}: RequestManagePhotosProps<T>): JSX.Element => {
  const [internalState, setInternalState] = useState<string[]>([])
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0)
  const [visible, setIsVisible] = useState<boolean>(false)

  const handleImagePress = (index: number) => {
    setActivePhotoIndex(index)
    setIsVisible(true)
  }

  const handleAddImage = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        aspect: [16, 9],
        base64: true,
        quality: 0.5,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      })

      if (!result.canceled) {
        setIsImageLoading(true)
        const files: string[] = []
        const { assets } = result

        assets.forEach((asset) => {
          files.push(asset.base64!)
        })

        const newInternalState = [...internalState, ...files]

        setInternalState(newInternalState)
        onChange(newInternalState)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsImageLoading(false)
    }
  }

  const handleImageRemove = (url: string) => {
    const newInternalState = internalState.filter(
      (attachment) => attachment !== url
    )

    setInternalState(newInternalState)
    onChange(newInternalState)
  }

  const {
    field: { onChange, value },
  } = useController<T>({
    name,
    control,
  })

  useEffect(() => {
    if (value !== internalState) {
      setInternalState(value)
    }
  }, [value])

  const renderAddButton = () => (
    <Button
      isLoading={isImageLoading}
      leftIcon={<Icon as={MaterialIcons} name="add-circle-outline" size="xl" />}
      variant="ghost"
      style={{ height: 80, width: 80, marginVertical: 10 }}
      onPress={handleAddImage}
    />
  )

  return (
    <Box>
      <HStack space={3} flexWrap="wrap">
        {internalState.map((uri, index) => (
          <Box key={uri} position="relative" my={2}>
            <Pressable onPress={() => handleImagePress(index)}>
              <Box>
                <Image
                  source={{
                    uri: isUrl(uri) ? uri : `data:image/jpeg;base64,${uri}`,
                  }}
                  size="md"
                  alt={uri}
                />
              </Box>
            </Pressable>
            <IconButton
              zIndex={999}
              size="xs"
              variant="solid"
              _icon={{
                as: MaterialIcons,
                name: 'remove-circle-outline',
              }}
              right={0}
              top={0}
              position="absolute"
              mt={-3}
              mr={-3}
              backgroundColor="red.500"
              onPress={() => handleImageRemove(uri)}
            />
          </Box>
        ))}
        {renderAddButton()}
      </HStack>
      <ImageView
        images={internalState.map((uri) => ({ uri })) ?? []}
        imageIndex={activePhotoIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        onLongPress={() => undefined}
      />
    </Box>
  )
}
