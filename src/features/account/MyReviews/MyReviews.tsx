import ReviewCard from '@/components/ReviewCard/ReviewCard'

export interface IReview {
  id: number
  rating: number
  content: string
  createdAt?: string
  updatedAt?: string
  reviewerId?: number
  reviewedId: number
}

interface MyReviewsProps {
  reviews: IReview[]
}

const MyReviews = ({ reviews }: MyReviewsProps) => (
  <>
    {reviews.map((review: IReview) => (
      <ReviewCard key={review.id} review={review} />
    ))}
  </>
)

export default MyReviews
