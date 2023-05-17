import { Icon, IconElement } from '@ui-kitten/components'
import { Avatar, HStack, View, Text } from 'native-base'

interface IREview {
  id: number
  rating: number
  content: string
  createdAt?: string
  updatedAt?: string
  reviewerId: number
  reviewedId: number
}

interface MyReviewsProps {
  reviews: IREview[]
}

const StarIcon = (): IconElement => (
  <Icon style={{ width: 12, height: 12 }} fill="#FFC107" name="star" />
)

const MyReviews = ({ reviews }: MyReviewsProps) => (
  <>
    {reviews.map((review: IREview) => {
      const { id, content, createdAt, rating } = review

      return (
        <View key={id}>
          <HStack space={2}>
            <HStack>
              <Avatar size="md" source={require('@assets/icon.png')} />
            </HStack>
            <View mt={2}>
              <Text>{content}</Text>
              <HStack space={0.5} alignItems="center">
                {[...Array(rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </HStack>
            </View>
          </HStack>
        </View>
      )
    })}
  </>
)

export default MyReviews
