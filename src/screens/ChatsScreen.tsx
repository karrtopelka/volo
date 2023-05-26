import { ChatRow, ChatsSkeleton, Layout } from '@/components'
import { useChats } from '@/hooks'
import { Chat } from '@/types'
import { flatListKeyExtractor } from '@/utils'
import {
  Divider,
  FlatList,
  Heading,
  Spacer,
  Spinner,
  VStack,
  Text,
} from 'native-base'

const renderData = ({ item }: { item: Chat }): JSX.Element => (
  <VStack>
    <ChatRow chat={item} />
    <Divider borderColor="gray.300" mt={2} />
  </VStack>
)

const renderEmptyList = (): JSX.Element => (
  <Layout centered={true}>
    <Heading>Немає чатів</Heading>
    <Spacer my={3} />
    <Text>Ви можете почати спілкуватись з людиною на сторінці з запитом</Text>
  </Layout>
)

export const ChatsScreen = (): JSX.Element => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChats({})

  const handleLoadMore = () => hasNextPage && fetchNextPage()

  if (isLoading) {
    return (
      <Layout>
        <ChatsSkeleton />
      </Layout>
    )
  }

  return (
    <Layout>
      <FlatList
        data={data?.pages.map((page) => page.data).flat()}
        keyExtractor={flatListKeyExtractor}
        renderItem={renderData}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={renderEmptyList}
      />
    </Layout>
  )
}
