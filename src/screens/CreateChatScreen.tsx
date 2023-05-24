import { Routes } from '@/constants'
import { CreateChatForm } from '@/features'
import { MainTabsParamList } from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box } from 'native-base'

type CreateChatScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.CREATE_CHAT
>

export const CreateChatScreen = ({
  route,
}: CreateChatScreenProps): JSX.Element => {
  const { recipientId } = route.params

  return (
    <Box flex={1} h="full" justifyContent="center">
      <CreateChatForm recipientId={recipientId} />
    </Box>
  )
}
