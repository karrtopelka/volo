import { IReview } from '@/features/account/MyReviews'
import { useUser } from '@/hooks/api/useUser'
import { Icon, IconElement, Spinner } from '@ui-kitten/components'
import dayjs from 'dayjs'
import { Avatar, Box, HStack, ScrollView, Text, View } from 'native-base'

interface ReviewCardProps {
  review: IReview
}

const StarIcon = (): IconElement => (
  <Icon style={{ width: 15, height: 15 }} fill="#FFC107" name="star" />
)

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { content, rating, reviewerId, createdAt } = review

  const { data, isLoading } = useUser({ id: reviewerId })

  if (isLoading) {
    return (
      <HStack space={3} alignSelf="center" m={5}>
        <Box>
          <Spinner size="small" />
        </Box>
        <Text>Loading</Text>
      </HStack>
    )
  }

  return (
    <Box
      maxW={80}
      h={150}
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
      padding={2}
    >
      <ScrollView>
        <HStack space={2} maxW="100%">
          <HStack>
            <Avatar
              size="md"
              source={
                data?.avatar
                  ? { uri: data.avatar }
                  : require('@assets/icon.png')
              }
            />
          </HStack>
          <View>
            <Text bold fontSize="md">
              {data?.name ?? data?.email}
            </Text>
            <Box
              w="73%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <HStack space={0.5} alignItems="center">
                {[...Array(rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </HStack>
              <Text fontSize="sm" justifyContent="end">
                {dayjs(createdAt).fromNow()}
              </Text>
            </Box>
            <View mt={3} maxW="80%">
              <Text fontSize="sm">{content}</Text>
            </View>
          </View>
        </HStack>
      </ScrollView>
    </Box>
  )
}

export default ReviewCard
