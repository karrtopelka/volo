import ReviewCard from '@/components/ReviewCard/ReviewCard'
import { Reviews } from '@/types'
import { HStack, ScrollView } from 'native-base'

export type MyReviewsProps = {
  reviews: Reviews
}

const MyReviews = ({ reviews }: MyReviewsProps) => (
  <ScrollView horizontal={true}>
    <HStack space={3}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </HStack>
  </ScrollView>
)

export default MyReviews
