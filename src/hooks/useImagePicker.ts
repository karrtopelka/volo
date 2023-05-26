import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { PermissionStatus } from 'expo-permissions'
import { useToast } from 'native-base'

export type UseImagePickerProps = {
  options?: ImagePicker.ImagePickerOptions | undefined
}

export const useImagePicker = ({
  options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    quality: 0.5,
    allowsMultipleSelection: true,
    selectionLimit: 5,
  },
}: UseImagePickerProps) => {
  const toast = useToast()

  return async (): Promise<ImagePicker.ImagePickerAsset[] | null> => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== PermissionStatus.GRANTED) {
        toast.show({
          title: 'Неможливо завантажити зображення',
          description: 'Вибачте, нам потрібен дозвіл до ваших фото',
          placement: 'top',
        })

        return null
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync(options)

    return !result.canceled ? result.assets : null
  }
}
