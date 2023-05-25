import { RequestCard, RequestCardSkeleton } from '@/components'
import { useMe, useUserRequests } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { flatListKeyExtractor } from '@/utils'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, Spinner, useToast, Text, FlatList, Spacer } from 'native-base'

export type AccountRequestsContainerProps = {
  userId: number | undefined
}

export const AccountRequestsContainer = ({
  userId,
}: AccountRequestsContainerProps): JSX.Element => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserRequests(userId, {})
  const { show } = useToast()
  const { data: me } = useMe()
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleLoadMore = () => hasNextPage && fetchNextPage()
  const isOwnProfile = () => userId === me?.id

  if (!userId) {
    show({
      render: () => (
        <Box bg="#FC4984" px="4" py="3" rounded="sm">
          <Text color="#1D171A">Щось пішло не так, спробуйте знову</Text>
        </Box>
      ),
      placement: 'top',
      variant: 'subtle',
      duration: 2500,
    })

    navigation.goBack()

    return <></>
  }

  if (isLoading) {
    return <RequestCardSkeleton />
  }

  return (
    <FlatList
      horizontal={true}
      data={data?.pages.map((page) => page.data).flat()}
      keyExtractor={flatListKeyExtractor}
      renderItem={({ item }) => (
        <RequestCard request={item} isSelfRequest={isOwnProfile()} />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={isFetchingNextPage ? <Spinner /> : null}
      ItemSeparatorComponent={() => <Spacer mx={2} />}
      ListEmptyComponent={<Text>Не знайдено жодного запиту</Text>}
    />
  )
}
