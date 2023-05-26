import { Card, Layout, RequestCard, RequestCardSkeleton } from '@/components'
import { Routes } from '@/constants'
import { RequestsFilterContainer } from '@/features'
import { useMyRequests } from '@/hooks'
import { MainTabsParamList, RequestSearchRequestParams } from '@/types'
import { flatListKeyExtractor } from '@/utils'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, Spinner, VStack, Text, FlatList, Spacer } from 'native-base'
import { useState } from 'react'

export const MyRequestsScreen = (): JSX.Element => {
  const [params, setParams] = useState<RequestSearchRequestParams>({})

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyRequests(params)
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleLoadMore = () => hasNextPage && fetchNextPage()

  const handleAddRequest = () =>
    navigation.navigate(Routes.REQUEST_CREATE_NAVIGATOR)

  if (isLoading) {
    return (
      <Layout>
        <VStack space={5} flex={1}>
          {new Array(2).fill(0).map((_, index) => (
            <RequestCardSkeleton key={index} />
          ))}
        </VStack>
      </Layout>
    )
  }

  return (
    <Layout>
      <FlatList
        data={data?.pages.map((page) => page.data).flat()}
        keyExtractor={flatListKeyExtractor}
        renderItem={({ item }) => (
          <RequestCard request={item} isSelfRequest={true} maxW="100%" />
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
        ItemSeparatorComponent={() => <Spacer my={2} />}
        ListHeaderComponent={
          <RequestsFilterContainer params={params} setParams={setParams} />
        }
        ListHeaderComponentStyle={{ marginBottom: 16 }}
        ListEmptyComponent={
          <Card>
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
        }
      />
    </Layout>
  )
}
