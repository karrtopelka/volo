import { Layout } from '@/components'
import { Routes } from '@/constants'
import {
  RequestAttachments,
  RequestComments,
  RequestGeneralInformation,
} from '@/features'
import { useRequest } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Spinner } from '@ui-kitten/components'
import dayjs from 'dayjs'
import { Box, ScrollView, VStack } from 'native-base'
import { useEffect } from 'react'
import AppleHeader from 'react-native-apple-header'

type RequestScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST
>

export const RequestScreen = ({ route }: RequestScreenProps): JSX.Element => {
  const { id, isSelfRequest } = route.params
  const { data, isLoading } = useRequest({ id })

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleNavigateToEditScreen = () =>
    navigation.navigate(Routes.REQUEST_CREATE, {
      id,
    })

  useEffect(() => {
    if (isSelfRequest) {
      navigation.setOptions({
        headerRight: () => (
          <Button appearance="ghost" onPress={handleNavigateToEditScreen}>
            Змінити
          </Button>
        ),
      })
    }
  }, [isSelfRequest, id])

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner />
      </Layout>
    )
  }

  return (
    <ScrollView backgroundColor="white" px={3}>
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
            onPress={() => {}}
          />
          <VStack space={4}>
            {data.attachments.length > 0 && (
              <RequestAttachments attachments={data.attachments} />
            )}
            <RequestGeneralInformation data={data} />
            <RequestComments comments={data.comments} requestId={id} />
          </VStack>
        </VStack>
      ) : (
        <Box />
      )}
    </ScrollView>
  )
}
