import { useMe } from '@/hooks'
import { Message } from '@/types'
import { Box, Text } from 'native-base'
import dayjs from 'dayjs'

export type MessageWrapperProps = {
  message: Message
}

export const MessageWrapper = ({
  message,
}: MessageWrapperProps): JSX.Element => {
  const { data: me } = useMe()

  const isMe = message.senderId === me?.id

  return (
    <Box key={message.id}>
      <Box
        _text={{
          fontSize: 'sm',
          color: isMe ? 'white' : 'black',
        }}
        backgroundColor={isMe ? 'blue.500' : 'gray.300'}
        mx={3}
        my={1}
        style={{
          borderRadius: 10,
          padding: 10,
          maxWidth: '80%',
          alignSelf: isMe ? 'flex-end' : 'flex-start',
        }}
      >
        {message.content}
      </Box>
      <Text
        fontSize="sm"
        mx={5}
        style={{
          alignSelf: isMe ? 'flex-end' : 'flex-start',
        }}
      >
        {dayjs(message.createdAt).format('HH:mm')}
      </Text>
    </Box>
  )
}
