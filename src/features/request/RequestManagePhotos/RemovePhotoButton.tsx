import { Icon, IconButton } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export type RemovePhotoButtonProps = {
  uri: string
  onRemove: (photoUri: string) => Promise<void>
}

export const RemovePhotoButton = ({
  uri,
  onRemove,
}: RemovePhotoButtonProps): JSX.Element => {
  const handleRemove = async () => {
    await onRemove(uri)
  }

  return (
    <IconButton
      variant="solid"
      alignSelf="flex-start"
      position="absolute"
      top={-12}
      right={-12}
      size="xs"
      borderRadius="full"
      icon={<Icon as={MaterialCommunityIcons} size="4" name="close" />}
      onPress={handleRemove}
    />
  )
}
