import { Card, Layout, RequestCard } from '@/components'
import { Routes } from '@/constants'
import { RequestsFilterContainer } from '@/features'
import { useMyRequests } from '@/hooks'
import { MainTabsParamList, RequestSearchRequestParams } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, ScrollView, Spinner, VStack, View, Text } from 'native-base'
import { useState } from 'react'

export const RequestsScreen = (): JSX.Element => {
  const [params, setParams] = useState<RequestSearchRequestParams>({
    limit: 3,
    offset: 0,
  })
  const { data, isLoading } = useMyRequests(params)
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleLoadMore = () => {
    setParams((prev) => ({ ...prev, limit: (prev.limit ?? 10) + 10 }))
  }

  const handleAddRequest = () =>
    navigation.navigate(Routes.REQUEST_CREATE_NAVIGATOR)

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <View>
      <ScrollView>
        <RequestsFilterContainer params={params} setParams={setParams} />
        {!!data?.data.length ? (
          <VStack space={5} m={3}>
            <>
              {data?.data.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  maxW="100%"
                  isSelfRequest={true}
                />
              ))}
              {data?.hasMore && (
                <Button onPress={handleLoadMore}>Load more</Button>
              )}
            </>
          </VStack>
        ) : (
          <Card mx={3}>
            <VStack space={5} alignItems="center">
              {params.type ?? params.status ?? params.fromDate ? (
                <Text>За заданими параметрами нічого не знайдено</Text>
              ) : (
                <>
                  <Text>Ви ще не створили жодного запиту</Text>
                  <Button onPress={handleAddRequest}>Створити</Button>
                </>
              )}
            </VStack>
          </Card>
        )}
      </ScrollView>
    </View>
  )
}
