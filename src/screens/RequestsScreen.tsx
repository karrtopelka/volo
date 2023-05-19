import { Layout, RequestCard } from '@/components'
import { Routes } from '@/constants'
import { RequestsFilterContainer } from '@/features'
import { useMyRequests } from '@/hooks'
import { MainTabsParamList, RequestSearchRequestParams } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, Spinner, Text } from '@ui-kitten/components'
import { ScrollView, VStack, View } from 'native-base'
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
    navigation.navigate(Routes.REQUEST_CREATE, {
      id: undefined,
    })

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner />
      </Layout>
    )
  }

  return (
    <View>
      <RequestsFilterContainer params={params} setParams={setParams} />
      {!!data?.data.length ? (
        <ScrollView>
          <VStack space={5} m={3} alignItems="stretch">
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
        </ScrollView>
      ) : (
        <>
          {params.type ?? params.status ?? params.fromDate ? (
            <VStack space={5} mx={15} mt={15} alignItems="center">
              <Text>За заданими параметрами нічого не знайдено</Text>
            </VStack>
          ) : (
            <VStack space={5} mx={15} mt={15} alignItems="center">
              <Text>Ви ще не створили жодного запиту</Text>
              <Button onPress={handleAddRequest}>Створити</Button>
            </VStack>
          )}
        </>
      )}
    </View>
  )
}
