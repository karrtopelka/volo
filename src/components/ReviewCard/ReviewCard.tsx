import { Review } from '@/types'
import dayjs from 'dayjs'
import { Box, HStack, Icon, ScrollView, Text, VStack } from 'native-base'
import { UserAvatar } from '../UserAvatar'
import { MaterialIcons } from '@expo/vector-icons'

export type ReviewCardProps = {
  review: Review
}

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
              {reviewer?.name ?? reviewer?.email.split('@')[0]}
            </Text>
            <Box
              w="75%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <HStack space={0.5} alignItems="center">
                {[...Array(rating)].map((_, i) => (
                  <Icon
                    key={i}
                    as={MaterialIcons}
                    name="star"
                    color="#FFC107"
                    size="sm"
                  />
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
