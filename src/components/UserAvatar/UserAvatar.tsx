import { Routes } from '@/constants'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Avatar, Pressable } from 'native-base'

type UserAvatarProps = {
  uri?: string | null
  size: string
  id?: number
}

export const UserAvatar = ({ uri, size, id }: UserAvatarProps) => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleUserAvatarPress = () =>
    navigation.navigate(Routes.USER_ACCOUNT, { id })

  return (
    <Pressable onPress={handleUserAvatarPress}>
      <Avatar
        size={size}
        source={uri ? { uri } : require('@assets/icon.png')}
      />
    </Pressable>
  )
}
