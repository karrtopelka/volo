import { ControlledFieldProps } from '@/types'
import { isUrl } from '@/utils'
import { Button, Icon, IconElement, Spinner } from '@ui-kitten/components'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { Box, HStack, Image, Pressable } from 'native-base'
import { useEffect, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { View } from 'react-native'
import ImageView from 'react-native-image-viewing'

export type RequestManagePhotosProps<T extends FieldValues> =
  ControlledFieldProps<T>

const PlusIcon = (): IconElement => (
  <Icon
    style={{
      height: 36,
      marginHorizontal: 10,
      tintColor: '#222021',
      width: 36,
    }}
    name="plus-circle-outline"
  />
)

const LoadingIndicator = (): React.ReactElement => (
  <View
    style={[
      {
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    <Spinner size="small" status="basic" />
  </View>
)

const RemoveIcon = (): IconElement => (
  <Icon
    style={{
      height: 12,
      tintColor: 'white',
      width: 12,
    }}
    name="minus-circle-outline"
  />
)

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
      disabled={isImageLoading}
      accessoryLeft={isImageLoading ? LoadingIndicator : PlusIcon}
      appearance="ghost"
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
            <Button
              accessoryLeft={RemoveIcon}
              status="danger"
              style={{
                height: 24,
                width: 24,
                position: 'absolute',
                right: 0,
                top: 0,
                marginTop: -8,
                marginRight: -8,
                minWidth: undefined,
                minHeight: undefined,
                paddingHorizontal: 0,
                paddingVertical: 0,
              }}
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
