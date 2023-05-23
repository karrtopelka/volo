import { Review } from '@/types'
import { Icon, IconElement } from '@ui-kitten/components'
import dayjs from 'dayjs'
import { Box, HStack, ScrollView, Text, VStack } from 'native-base'
import { UserAvatar } from '../UserAvatar'

export type ReviewCardProps = {
  review: Review
}

const StarIcon = (): IconElement => (
  <Icon style={{ width: 15, height: 15 }} fill="#FFC107" name="star" />
)

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { content, rating, reviewer, createdAt } = review

  return (
    <Box
      h={185}
      maxW={80}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
      px={2}
      py={3}
    >
      <HStack space={2}>
        <UserAvatar size="md" uri={reviewer.avatar} userId={reviewer.id} />
        <HStack space={5} justifyContent="space-between" flex={1}>
          <VStack space={0.5} alignItems="flex-start">
            <Text bold fontSize="md">
              {reviewer?.name ?? reviewer?.email}
            </Text>
            <Box
              w="75%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <HStack space={0.5} alignItems="center">
                {[...Array(rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </HStack>
            </Box>
          </VStack>
          <Text fontSize="sm">{dayjs(createdAt).fromNow()}</Text>
        </HStack>
      </HStack>
      <ScrollView mt={3}>
        <Box maxW={80}>{content}</Box>
      </ScrollView>
    </Box>
  )
}

export default ReviewCard
