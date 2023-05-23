import { Layout } from '@/components'
import { Routes } from '@/constants'
import { RequestAddCommentForm } from '@/features'
import { useRequest } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Spinner, VStack, Text, Heading } from 'native-base'
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
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <Box px={4} backgroundColor="white" h="full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {data ? (
          <VStack space={5} my={5} flex={1}>
            <VStack space={2}>
              <Heading size="md">{data.title}</Heading>
              <Text size="sm" w="full" h="auto">
                {data.description ?? ''}
              </Text>
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
