import { Message, Messages } from '@/types'
import { IMessage } from 'react-native-gifted-chat'

export const transformMessageToGiftedChat = (
  message?: Message
): IMessage | void => {
  if (!message) {
    return
  }

  return {
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.createdAt),
    user: {
      _id: message.senderId,
      name: message.sender.name ?? message.sender.email.split('@')[0],
    },
  }
}

export const transformMultipleMessagesToGiftedChat = (
  messages?: Messages
): IMessage[] => {
  if (!messages) {
    return []
  }

  return messages.map((message) => ({
    _id: message.id,
    text: message.content,
    createdAt: new Date(message.createdAt),
    user: {
      _id: message.senderId,
      name: message.sender.name ?? message.sender.email.split('@')[0],
    },
  }))
}
