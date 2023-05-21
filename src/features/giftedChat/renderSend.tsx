import { ArrowForwardIcon } from 'native-base'
import { Send, SendProps, IMessage } from 'react-native-gifted-chat'

export const renderSend = (props: SendProps<IMessage>) => (
  <Send {...props}>
    <ArrowForwardIcon size={6} color="black" my={2.5} mx={2} />
  </Send>
)
