import { Layout } from '@/components'
import { Routes } from '@/constants'
import { useChat, useMe } from '@/hooks'
import { MainTabsParamList, Message, PaginatedListResponse } from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, View } from 'native-base'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { socketChat, transformMultipleMessagesToGiftedChat } from '@/utils'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import {
  ScrollToBottomComponent,
  renderSend,
  renderHeaderRight,
} from '@/features'
import { Platform } from 'react-native'
import { useOnlineUsers } from '@/contexts'
import { useQueryClient } from '@tanstack/react-query'

type ChatScreenProps = NativeStackScreenProps<MainTabsParamList, Routes.CHAT>

export const ChatScreen = ({ route }: ChatScreenProps): JSX.Element => {
  const { id, recipientName, recipientId } = route.params
  const [inputText, setInputText] = useState('')
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const isInitialRender = useRef(true)
  const queryClient = useQueryClient()

  const {
    data: messages,
    isLoading,
    fetchNextPage,
  } = useChat({ id, params: { offset: 0 } })

  const { data: me } = useMe()
  const { userIds } = useOnlineUsers()

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleLoadMore = () => fetchNextPage()

  useEffect(() => {
    socketChat.emit('joinRoom', id)
    socketChat.on('chatToClient', (newMessage: Message) => {
      queryClient.setQueryData(['chat', id.toString()], (oldData: unknown) => {
        const oldDataTyped = oldData as {
          pageParams: Array<unknown>
          pages: Array<PaginatedListResponse<Message>>
        }

        if (
          oldDataTyped &&
          Array.isArray(oldDataTyped.pageParams) &&
          Array.isArray(oldDataTyped.pages)
        ) {
          const updatedPages = [...oldDataTyped.pages]

          updatedPages[0].data = [newMessage, ...updatedPages[0].data]

          return { ...oldDataTyped, pages: updatedPages }
        } else {
          return oldData
        }
      })

      queryClient.invalidateQueries(['chat', id.toString()])
    })
    socketChat.on('typing', () => {
      navigation.setOptions({
        headerRight: () => renderHeaderRight(true),
      })
    })
    socketChat.on('stopTyping', () => {
      navigation.setOptions({
        headerRight: () =>
          renderHeaderRight(false, userIds.includes(recipientId)),
      })
    })

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
    if (isInitialRender.current) {
      isInitialRender.current = false
      navigation.setOptions({ title: recipientName })
    }
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

    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }

    socketChat.emit('typing', id)

    setTypingTimeout(
      setTimeout(() => {
        socketChat.emit('stopTyping', id)
      }, 1000)
    )
  }

  const onSend = (text: IMessage[]) => {
    socketChat.emit('chatToServer', {
      sender: me!.id,
      room: id,
      message: text[0].text,
    })
  }

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <GiftedChat
      messages={transformMultipleMessagesToGiftedChat(
        messages?.pages.map((page) => page.data).flat()
      )}
      onSend={onSend}
      loadEarlier={messages?.pages[messages.pages.length - 1]?.next !== null}
      infiniteScroll={true}
      onLoadEarlier={handleLoadMore}
      isLoadingEarlier={isLoading}
      user={{
        _id: me!.id,
        name: me?.name ?? me?.email,
        avatar: me?.avatar ?? '@assets/icon.png',
      }}
      scrollToBottom={true}
      keyboardShouldPersistTaps="never"
      showAvatarForEveryMessage={true}
      renderAvatar={() => null}
      messagesContainerStyle={{ backgroundColor: 'white' }}
      renderSend={renderSend}
      scrollToBottomComponent={ScrollToBottomComponent}
      dateFormat="DD.MM.YYYY"
      timeFormat="HH:mm"
      bottomOffset={Platform.OS === 'ios' ? 80 : 0}
      onInputTextChanged={(text) => handleTextChange(text)}
      shouldUpdateMessage={() => true}
      text={inputText}
      renderFooter={() => <View marginY={2} />}
    />
  )
}
