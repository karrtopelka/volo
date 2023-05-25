import { BucketNames, ControlledFieldProps } from '@/types'
import {
  Box,
  Button,
  FormControl,
  HStack,
  WarningOutlineIcon,
  Text,
  useToast,
} from 'native-base'
import { ComponentProps, useEffect, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import { ImagePickerOptions, MediaTypeOptions } from 'expo-image-picker'
import { getValidationErrorMessage } from '@/utils'
import { Image } from 'react-native'
import {
  useDeletePhoto,
  useImagePicker,
  useMutationWrapper,
  usePostPhoto,
} from '@/hooks'

export type ControlledPhotoInputProps<T extends FieldValues> = {
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  labelProps?: Partial<ComponentProps<typeof FormControl.Label>>
  bucketName: BucketNames
} & Partial<ImagePickerOptions> &
  ControlledFieldProps<T>

export const ControlledPhotoInput = <T extends FieldValues>({
  formControlProps = {},
  labelProps = {},
  label,
  control,
  name,
  bucketName,
  ...imagePickerOptions
}: ControlledPhotoInputProps<T>): JSX.Element => {
  const { show } = useToast()
  const [image, setImage] = useState<null | string>(null)
  const pickImage = useImagePicker({
    options: {
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      ...imagePickerOptions,
    },
  })
  const { mutateAsync: uploadPhoto, isLoading: isUploading } =
    useMutationWrapper(usePostPhoto)
  const { mutateAsync: deletePhoto } = useMutationWrapper(useDeletePhoto)

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  })

  const handlePickImage = async () => {
    try {
      const result = await pickImage()

      if (!result) {
        return
      }

      const photo = {
        uri: result[0].uri,
        name:
          Math.random().toString(36).slice(2, 8) +
          Math.random().toString(36).slice(2, 8),
      }

      await uploadPhoto(
        { type: bucketName, photo },
        {
          successMessageKey: 'Фотографії успішно завантажено',
          onSuccess: (data) => {
            if (image) {
              deletePhoto({ photoUrl: image, type: bucketName })
            }
            setImage(data)
            onChange(data)
          },
        }
      )
    } catch (error) {
      console.error(error)
      show({
        render: () => (
          <Box bg="danger.300" px="4" py="3" rounded="sm">
            <Text color="white">Під час вибору фотографії сталася помилка</Text>
          </Box>
        ),
        placement: 'top',
        variant: 'subtle',
      })
    }
  }

  useEffect(() => {
    if (value !== image) {
      setImage(value)
    }
  }, [value])

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      {label && <FormControl.Label {...labelProps}>{label}</FormControl.Label>}
      <HStack space={3} justifyContent="space-between">
        <Button
          onPress={handlePickImage}
          style={{ width: '50%', flexGrow: 0, flexShrink: 0 }}
          variant="ghost"
          size="xs"
          isLoading={isUploading}
        >
          {isUploading
            ? 'Завантажується...'
            : 'Натисніть, щоб завантажити фото'}
        </Button>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, flex: 1, resizeMode: 'contain' }}
          />
        )}
      </HStack>
      {error && (
        <FormControl.ErrorMessage
          mt={2}
          leftIcon={<WarningOutlineIcon size="xs" />}
        >
          {getValidationErrorMessage(error)}
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  )
}
