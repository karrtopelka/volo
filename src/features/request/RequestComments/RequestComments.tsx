import { Comments, MainTabsParamList } from '@/types'
import {
  Button,
  Card,
  Divider,
  Icon,
  IconElement,
  IconProps,
  Text,
} from '@ui-kitten/components'
import { HStack, VStack } from 'native-base'
import { RequestComment } from '../RequestComment'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Routes } from '@/constants'

export type RequestCommentsProps = {
  requestId: number
  comments: Comments
}

const AddIcon = (props: IconProps): IconElement => (
  <Icon {...props} name="plus-circle-outline" />
)

export const RequestComments = ({
  requestId,
  comments,
}: RequestCommentsProps): JSX.Element => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  return (
    <>
      <Card
        disabled={true}
        header={
          <HStack justifyContent="space-between" alignItems="center">
            <Text category="h4">Коментарі</Text>
            <Button
              appearance="ghost"
              accessoryLeft={AddIcon}
              onPress={() =>
                navigation.navigate(Routes.REQUEST_ADD_COMMENT, {
                  id: requestId,
                })
              }
            />
          </HStack>
        }
      >
        <VStack space={3}>
          {!!comments.length ? (
            comments.map((comment, index) => {
              const isLast = index === comments.length - 1

              return (
                <VStack space={3} key={comment.id}>
                  <RequestComment key={comment.id} comment={comment} />
                  {!isLast && <Divider />}
                </VStack>
              )
            })
          ) : (
            <Text>Коментарі відсутні</Text>
          )}
        </VStack>
      </Card>
    </>
  )
}
