import { UserAvatar } from '@/components/UserAvatar'
import { Comment } from '@/types'
import dayjs from 'dayjs'
import { HStack, VStack, Box, Text, Heading } from 'native-base'

export type RequestCommentProps = {
  comment: Comment
}

export const RequestComment = ({
  comment,
}: RequestCommentProps): JSX.Element => (
  <HStack space={3} flex={1}>
    <UserAvatar
      size="md"
      uri={comment.author.avatar}
      userId={comment.authorId}
    />
    <VStack flex={1} space={2}>
      <HStack justifyContent="space-between">
        <Heading size="sm" bold={true}>
          {comment.author?.name ?? comment.author.email.split('@')[0]}
        </Heading>
        <Text size="xs" color="gray.400" h="auto" w="auto">
          {dayjs(comment.createdAt).format('DD MMM YYYY HH:mm')}
        </Text>
      </HStack>
      <Box>{comment.content}</Box>
    </VStack>
  </HStack>
)
