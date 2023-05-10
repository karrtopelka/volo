import { Layout } from '@/components'
import { Routes } from '@/constants'
import { RequestAddCommentForm } from '@/features'
import { useRequest } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Spinner, Text } from '@ui-kitten/components'
import { Box, VStack } from 'native-base'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

type RequestAddCommentScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_ADD_COMMENT
>

export const RequestAddCommentScreen = ({
  route,
}: RequestAddCommentScreenProps): JSX.Element => {
  const { id } = route.params
  const { data, isLoading } = useRequest({ id })

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner size="small" />
      </Layout>
    )
  }

  return (
    <Box px={4} backgroundColor="white" h="full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {data ? (
          <VStack space={5} my={5}>
            <VStack space={2}>
              <Text category="h3">{data.title}</Text>
              <Text category="p2">{data.description ?? ''}</Text>
            </VStack>
            <RequestAddCommentForm requestId={data.id} />
          </VStack>
        ) : (
          <Box />
        )}
      </TouchableWithoutFeedback>
    </Box>
  )
}
