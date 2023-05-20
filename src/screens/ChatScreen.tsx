import { Layout } from '@/components'
import { Routes } from '@/constants'
import { useMe } from '@/hooks'
import {
  Chat,
  MainTabsParamList,
  Message,
  PaginatedListResponse,
} from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, View } from 'native-base'
import { useEffect, useLayoutEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  socketChat,
  transformMessageToGiftedChat,
  transformMultipleMessagesToGiftedChat,
} from '@/utils'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import {
  ScrollToBottomComponent,
  renderSend,
  renderHeaderRight,
} from '@/features'
import { Platform } from 'react-native'
import { useOnlineUsers } from '@/contexts'

type ChatScreenProps = NativeStackScreenProps<MainTabsParamList, Routes.CHAT>

export const ChatScreen = ({ route }: ChatScreenProps): JSX.Element => {
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false)
  const [offset, setOffset] = useState(3000)
  const [inputText, setInputText] = useState('')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  const { id, recipientName, recipientId } = route.params

  const [messages, setMessages] = useState<IMessage[]>([])
  const { data: me } = useMe()
  const { userIds } = useOnlineUsers()

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleLoadMore = () => {
    setIsLoadingEarlier(true)
    socketChat.emit('loadMoreMessages', {
      room: id,
      offset,
    })
  }

  useEffect(() => {
    socketChat.emit('joinRoom', id)
    socketChat.on('joinedRoom', (data: PaginatedListResponse<Chat>) => {
      setMessages(transformMultipleMessagesToGiftedChat(data.data[0].messages))
    })
    socketChat.on('chatToClient', (data: Message) => {
      setMessages((prev) => [...prev, transformMessageToGiftedChat(data)!])
    })
    socketChat.on('typing', () => {
      navigation.setOptions({
        headerRight: () =>
          renderHeaderRight(true, userIds.includes(recipientId)),
      })
    })
    socketChat.on('stopTyping', () => {
      navigation.setOptions({
        headerRight: () =>
          renderHeaderRight(false, userIds.includes(recipientId)),
      })
    })
    socketChat.on(
      'loadedMoreMessages',
      (data: PaginatedListResponse<Message>) => {
        setMessages((prev) => [
          ...transformMultipleMessagesToGiftedChat(data.data),
          ...prev,
        ])
        setOffset((prev) => prev + 50)
        setIsLoadingEarlier(false)
      }
    )

    return () => {
      socketChat.emit('leaveRoom', id)
      socketChat.off('joinedRoom')
      socketChat.off('chatToClient')
      socketChat.off('loadedMoreMessages')
      socketChat.off('typing')
      socketChat.off('stopTyping')
    }
  }, [socketChat])

  useLayoutEffect(() => {
    navigation.setOptions({ title: recipientName })
    navigation.setOptions({
      headerRight: () =>
        renderHeaderRight(false, userIds.includes(recipientId)),
    })
  }, [userIds])

  useEffect(
    () => () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
    },
    []
  )

  const handleTextChange = (inputText: string) => {
    setInputText(inputText)

    if (!inputText) {
      socketChat.emit('stopTyping', id)

      return
    }

    socketChat.emit('typing', id)

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    setTypingTimeout(
      setTimeout(() => {
        socketChat.emit('stopTyping', id)
      }, 3000)
    )
  }

  const onSend = (text: IMessage[]) => {
    socketChat.emit('chatToServer', {
      sender: me!.id,
      room: id,
      message: text[0].text,
    })
  }

  if (messages.length === 0) {
    return (
      <Layout centered={true}>
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(text) => onSend(text)}
      loadEarlier={true}
      onLoadEarlier={handleLoadMore}
      isLoadingEarlier={isLoadingEarlier}
      user={{
        _id: me!.id,
        name: me?.name ?? me?.email,
      }}
      scrollToBottom={true}
      keyboardShouldPersistTaps="never"
      inverted={false}
      showUserAvatar={false}
      showAvatarForEveryMessage={true}
      renderAvatar={() => null}
      messagesContainerStyle={{ backgroundColor: 'white' }}
      renderSend={renderSend}
      scrollToBottomComponent={ScrollToBottomComponent}
      dateFormat="DD.MM.YYYY"
      timeFormat="HH:mm"
      bottomOffset={Platform.OS === 'ios' ? 75 : 0}
      onInputTextChanged={(text) => handleTextChange(text)}
      shouldUpdateMessage={() => true}
      text={inputText}
      renderFooter={() => <View marginY={2} />}
    />
  )
}
