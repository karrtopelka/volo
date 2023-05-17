import ReviewCard from '@/components/ReviewCard/ReviewCard'
import { HStack, ScrollView } from 'native-base'

export interface IReview {
  id: number
  rating?: number
  content?: string
  createdAt?: string
  updatedAt?: string
  reviewerId?: number
  reviewedId?: number
}

interface MyReviewsProps {
  reviews: IReview[]
}

const MyReviews = ({ reviews }: MyReviewsProps) => (
  <ScrollView horizontal={true}>
    <HStack space={3}>
      {reviews.map((review: IReview) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </HStack>
  </ScrollView>
)

export default MyReviews
