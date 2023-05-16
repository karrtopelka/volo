import { Icon, IconElement } from '@ui-kitten/components'
import { Avatar, HStack, View, Text } from 'native-base'

const StarIcon = (): IconElement => (
  <Icon style={{ width: 12, height: 12 }} fill="#FFC107" name="star" />
)

const MyReviews = ({ reviews }: any) => (
  <>
    {reviews.map((review: any) => {
      const { id, content, createdAt, rating } = review

      return (
        <View key={id}>
          <HStack space={2}>
            <HStack>
              <Avatar size="md" source={require('@assets/icon.png')} />
            </HStack>
            <View mt={2}>
              <Text>{content}</Text>
              <HStack space={1} alignItems="center">
                {[...Array(rating)].map((el, i) => (
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
