import { useMe } from '@/hooks'
import { Chat, MainTabsParamList } from '@/types'
import { Avatar, HStack, VStack, Text, Pressable } from 'native-base'
import dayjs from 'dayjs'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Routes } from '@/constants'

export type ChatRowProps = {
  chat: Chat
}

export const ChatRow = ({ chat }: ChatRowProps): JSX.Element => {
  const { data } = useMe()
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const lastMessage = chat.messages[0]
  const recipient = chat.users.filter((user) => user.id !== data?.id)[0]

  const handleChatClick = () =>
    navigation.navigate(Routes.CHAT, {
      id: chat.id,
      recipientName: recipient.name ?? recipient.email,
      recipientId: recipient.id,
    })

  return (
    <Pressable onPress={handleChatClick}>
      <HStack h="16" space={3} alignItems="center">
        <Avatar
          size="md"
          source={
            recipient.avatar
              ? {
                  uri: recipient.avatar,
                }
              : require('@assets/icon.png')
          }
        />
        <VStack alignItems="flex-start" w={80}>
          <HStack
            justifyContent="space-between"
            alignItems="flex-start"
            w="full"
          >
            <Text bold fontSize="md">
              {recipient.name ?? recipient.email}
            </Text>
            <Text fontSize="xs">{dayjs(lastMessage.createdAt).fromNow()}</Text>
          </HStack>
          <Text fontSize="xs">{lastMessage.content}</Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}
