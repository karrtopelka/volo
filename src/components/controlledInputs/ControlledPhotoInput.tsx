import { ControlledFieldProps } from '@/types'
import { Button, FormControl, HStack, WarningOutlineIcon } from 'native-base'
import { ComponentProps, useEffect, useState } from 'react'
import { FieldValues, useController } from 'react-hook-form'
import {
  launchImageLibraryAsync,
  ImagePickerOptions,
  MediaTypeOptions,
} from 'expo-image-picker'
import { getValidationErrorMessage } from '@/utils'
import { Image } from 'react-native'
import { storageClient } from '@/libs'
import { decode } from 'base64-arraybuffer'

export type ControlledPhotoInputProps<T extends FieldValues> = {
  formControlProps?: Partial<ComponentProps<typeof FormControl>>
  label?: string
  labelProps?: Partial<ComponentProps<typeof FormControl.Label>>
} & Partial<ImagePickerOptions> &
  ControlledFieldProps<T>

export const ControlledPhotoInput = <T extends FieldValues>({
  formControlProps = {},
  labelProps = {},
  label,
  control,
  name,
  ...inputProps
}: ControlledPhotoInputProps<T>): JSX.Element => {
  const [image, setImage] = useState<null | string>(null)

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  })

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
      ...inputProps,
    })

    if (!result.canceled) {
      const base64 = result.assets[0].base64!

      const { data, error } = await storageClient
        .from('avatars')
        .upload(`${Date.now()}`, decode(base64), {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/png',
        })

      if (error) {
        console.error(error)

        return
      }

      const { data: downloadedFile } = storageClient
        .from('avatars')
        .getPublicUrl(data.path)

      setImage(result.assets[0].uri)
      onChange(downloadedFile.publicUrl)
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
          onPress={pickImage}
          style={{ width: '50%', flexGrow: 0, flexShrink: 0 }}
          variant="ghost"
          size="xs"
        >
          Натисніть, щоб завантажити фото
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
