import { Layout, RequestSkeleton } from '@/components'
import { Routes } from '@/constants'
import {
  RequestAttachments,
  RequestComments,
  RequestGeneralInformation,
} from '@/features'
import { checkIfChatExists, useApiClient, useRequest } from '@/hooks'
import { MainTabsParamList } from '@/types'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import dayjs from 'dayjs'
import { Box, Button, ScrollView, VStack } from 'native-base'
import { useEffect } from 'react'
import AppleHeader from 'react-native-apple-header'

export const RequestScreen = (): JSX.Element => {
  const { params } = useRoute<RouteProp<MainTabsParamList, Routes.REQUEST>>()
  const { data, isLoading } = useRequest({ id: params.id })
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const client = useApiClient()

  const handleNavigateToEditScreen = () =>
    navigation.navigate(Routes.REQUEST_EDIT_NAVIGATOR, {
      screen: Routes.REQUEST_EDIT,
      params: { id: params.id },
    })

  const handleNavigateToUserAccount = () =>
    navigation.navigate(Routes.ACCOUNT, { id: data!.user.id })

  const handleCreateChat = async () => {
    const isChatExists = await checkIfChatExists(data!.user.id, client)

    if (!isChatExists) {
      return navigation.navigate(Routes.CREATE_CHAT, {
        recipientId: data!.user.id,
      })
    }

    const { id, recipientId, recipientName } = isChatExists

    return navigation.navigate(Routes.CHAT_NAVIGATOR, {
      screen: Routes.CHAT,
      params: {
        recipientId,
        recipientName,
        id,
      },
    })
  }

  useEffect(() => {
    if (params.isSelfRequest) {
      navigation.setOptions({
        headerRight: () => (
          <Button variant="ghost" onPress={handleNavigateToEditScreen}>
            Змінити
          </Button>
        ),
      })
    }
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <RequestSkeleton />
      </Layout>
    )
  }

  return (
    <ScrollView backgroundColor="white" px={3} nestedScrollEnabled={true}>
      {data ? (
        <VStack space={3} my={5}>
          <AppleHeader
            dateTitle={dayjs(data.createdAt).format('DD MMM YYYY')}
            largeTitle={data.title}
            imageSource={
              data.user.avatar
                ? { uri: data.user.avatar }
                : require('@assets/icon.png')
            }
            largeTitleTextStyle={{ fontSize: 24, lineHeight: 32 }}
            onPress={handleNavigateToUserAccount}
          />
          <VStack space={4}>
            {data.attachments.length > 0 && (
              <RequestAttachments attachments={data.attachments} />
            )}
            <RequestGeneralInformation data={data} />
            {!params.isSelfRequest && (
              <Button onPress={handleCreateChat}>Звʼязатись з людиною</Button>
            )}
            <RequestComments comments={data.comments} requestId={params.id} />
          </VStack>
        </VStack>
      ) : (
        <Box />
      )}
    </ScrollView>
  )
}
