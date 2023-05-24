import { ChatRow, Layout } from '@/components'
import { useChats } from '@/hooks'
import { LimitedSearchRequestParams } from '@/types'
import {
  Button,
  Divider,
  Heading,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
} from 'native-base'
import { useState } from 'react'

export const ChatsScreen = (): JSX.Element => {
  const [params, setParams] = useState<LimitedSearchRequestParams>({
    limit: 10,
    offset: 0,
  })
  const { data, isLoading } = useChats(params)

  const handleLoadMore = () => {
    setParams((prev) => ({ ...prev, limit: (prev.limit ?? 10) + 10 }))
  }

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <ScrollView mx={3} my={3}>
      {!!data?.data?.length ? (
        <VStack space={1}>
          {data.data.map((chat) => (
            <VStack key={chat.id}>
              <ChatRow chat={chat} />
              <Divider borderColor="gray.300" mt={2} />
            </VStack>
          ))}
        </VStack>
      ) : (
        <Layout centered={true}>
          <Heading>Немає чатів</Heading>
          <Spacer my={3} />
          <Text>
            Ви можете почати спілкуватись з людиною на сторінці з запитом
          </Text>
        </Layout>
      )}
      {data?.hasMore && (
        <Button onPress={handleLoadMore} mt={3}>
          Завантажити більше
        </Button>
      )}
    </ScrollView>
  )
}
