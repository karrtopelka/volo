import { Routes } from '@/constants'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Avatar, IAvatarProps, Pressable } from 'native-base'

type UserAvatarProps = {
  uri?: string | null
  userId: number
} & IAvatarProps

export const UserAvatar = ({ uri, size, userId, ...rest }: UserAvatarProps) => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleUserAvatarPress = () =>
    navigation.navigate(Routes.ACCOUNT_VIEW, { id: userId })

  return (
    <Pressable
      onPress={handleUserAvatarPress}
      _pressed={{
        opacity: 0.5,
      }}
    >
      <Avatar
        size={size}
        source={uri ? { uri } : require('@assets/icon.png')}
        {...rest}
      />
    </Pressable>
  )
}
