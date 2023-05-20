import { HStack, IconButton, Input } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { socketChat } from '@/utils'

export type ChatInputProps = {
  chatId: number
  meId: number
}

export const ChatInput = ({ chatId, meId }: ChatInputProps): JSX.Element => {
  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    socketChat.emit('chatToServer', { sender: meId, room: chatId, message })
    setMessage('')
  }

  const handleMessageInput = (message: string) => setMessage(message)

  return (
    <HStack space={2} mx={3}>
      <Input
        placeholder="Повідомлення"
        flex={1}
        value={message}
        onChangeText={(message) => handleMessageInput(message)}
      />
      <IconButton
        size="lg"
        variant="filled"
        _icon={{
          as: MaterialIcons,
          name: 'send',
        }}
        onPress={handleSendMessage}
        disabled={!message}
      />
    </HStack>
  )
}
