import { Comments, MainTabsParamList } from '@/types'
import { Divider, Text, IconButton, VStack } from 'native-base'
import { RequestComment } from '../RequestComment'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Routes } from '@/constants'
import { Card } from '@/components'
import { MaterialIcons } from '@expo/vector-icons'

export type RequestCommentsProps = {
  requestId: number
  comments: Comments
}

export const RequestComments = ({
  requestId,
  comments,
}: RequestCommentsProps): JSX.Element => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  return (
    <>
      <Card
        title="Коментарі"
        titleAction={
          <IconButton
            size="lg"
            _icon={{
              as: MaterialIcons,
              name: 'add-circle-outline',
            }}
            onPress={() =>
              navigation.navigate(Routes.REQUEST_ADD_COMMENT, {
                id: requestId,
              })
            }
          />
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
