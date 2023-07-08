import { RequestCard, RequestCardSkeleton } from '@/components'
import { useRequests } from '@/hooks'
import { RequestType } from '@/types'
import { flatListKeyExtractor } from '@/utils'
import { FlatList, Spacer, Spinner, Text } from 'native-base'
import { useEffect, useState } from 'react'

type FeedRequestsContainerProps = {
  type?: RequestType
}

export const FeedRequestsContainer = ({
  type,
}: FeedRequestsContainerProps): JSX.Element => {
  const [requestParams, setRequestParams] = useState({ limit: 5, offset: 0 })

  useEffect(() => {
    if (type) {
      setRequestParams((prev) => ({ ...prev, type }))
    }
  }, [])

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useRequests(requestParams)

  const handleLoadMore = () => hasNextPage && fetchNextPage()

  if (isLoading) {
    return <RequestCardSkeleton />
  }

  return (
    <FlatList
      data={data?.pages.map((page) => page.data).flat()}
      keyExtractor={flatListKeyExtractor}
      renderItem={({ item }) => <RequestCard request={item} maxW="full" />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
      ItemSeparatorComponent={() => <Spacer mx={2} pb={5} />}
      ListEmptyComponent={<Text>Не знайдено жодного запиту</Text>}
    />
  )
}
