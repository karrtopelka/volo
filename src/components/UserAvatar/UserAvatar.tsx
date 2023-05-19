import { Avatar } from 'native-base'

type UserAvatarProps = {
  uri?: string | null
  size: string
}

export const UserAvatar = ({ uri, size }: UserAvatarProps) => (
  <Avatar size={size} source={uri ? { uri } : require('@assets/icon.png')} />
)
