import { RequestCard } from '@/components'
import { useUserRequests } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  Box,
  HStack,
  ScrollView,
  Spinner,
  useToast,
  Text,
  IconButton,
} from 'native-base'
import { useState } from 'react'

export type AccountRequestsContainerProps = {
  userId: number | undefined
}

export const AccountRequestsContainer = ({
  userId,
}: AccountRequestsContainerProps): JSX.Element => {
  const [limit, setLimit] = useState(5)
  const { data, isLoading } = useUserRequests(userId, { limit })
  const { show } = useToast()
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const handleLimit = () => setLimit((prev) => prev + 5)

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
    return (
      <HStack space={3} alignSelf="center" m={5}>
        <Box>
          <Spinner size="sm" />
        </Box>
        <Text>Loading</Text>
      </HStack>
    )
  }

  return (
    <ScrollView horizontal={true}>
      <HStack space={3}>
        {data && !!data.data.length ? (
          data.data.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              isSelfRequest={true}
            />
          ))
        ) : (
          <Text>Не знайдено жодного запиту</Text>
        )}
        {data?.hasMore && (
          <IconButton
            size="lg"
            variant="filled"
            _icon={{
              as: MaterialIcons,
              name: 'plus-circle-outline',
            }}
            onPress={handleLimit}
            disabled={isLoading}
          />
        )}
      </HStack>
    </ScrollView>
  )
}
