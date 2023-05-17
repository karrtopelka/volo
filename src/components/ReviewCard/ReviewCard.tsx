import { IReview } from '@/features/account/MyReviews'
import { useUser } from '@/hooks/api/useUser'
import { Icon, IconElement } from '@ui-kitten/components'
import { Avatar, HStack, View, Text, Box } from 'native-base'

interface ReviewCardProps {
  review: IReview
}

const StarIcon = (): IconElement => (
  <Icon style={{ width: 12, height: 12 }} fill="#FFC107" name="star" />
)

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { content, rating, reviewerId } = review

  const { data, isLoading } = useUser({ id: reviewerId })
  console.log(data)

  return (
    <Box
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
      padding={2}
    >
      <HStack space={2}>
        <HStack>
          <Avatar
            size="md"
            source={
              data?.avatar ? { uri: data.avatar } : require('@assets/icon.png')
            }
          />
        </HStack>
        <View>
          <HStack space={0.5} alignItems="center">
            {[...Array(rating)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </HStack>
        </View>
      </HStack>
      <View>
        <Text>{content}</Text>
      </View>
    </Box>
  )
}

export default ReviewCard
