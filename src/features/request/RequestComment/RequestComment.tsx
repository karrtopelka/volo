import { UserAvatar } from '@/components/UserAvatar'
import { Comment } from '@/types'
import { Text } from '@ui-kitten/components'
import dayjs from 'dayjs'
import { HStack, VStack, Box, Avatar } from 'native-base'

export type RequestCommentProps = {
  comment: Comment
}

export const RequestComment = ({
  comment,
}: RequestCommentProps): JSX.Element => (
  <HStack space={3} flex={1}>
    <UserAvatar size="md" uri={comment.author.avatar} id={comment.authorId} />
    <VStack flex={1} space={2}>
      <HStack justifyContent="space-between">
        <Text category="s1">
          {comment.author?.name ?? comment.author.email}
        </Text>
        <Text category="c2" style={{ color: 'gray' }}>
          {dayjs(comment.createdAt).format('DD MMM YYYY HH:mm')}
        </Text>
      </HStack>
      <Box>
        <Text>{comment.content}</Text>
      </Box>
    </VStack>
  </HStack>
)
