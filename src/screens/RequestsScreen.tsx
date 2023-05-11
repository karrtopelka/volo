import { Layout, RequestCard } from '@/components'
import { REQUEST_STATUSES, REQUEST_TYPES } from '@/constants'
import { useMyRequests } from '@/hooks'
import { RequestType, SearchRequestParams } from '@/types'
import { Button, Spinner, Text } from '@ui-kitten/components'
import {
  Box,
  CheckIcon,
  HStack,
  ScrollView,
  Select,
  VStack,
  View,
} from 'native-base'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const RequestsScreen = (): JSX.Element => {
  const { i18n } = useTranslation()
  const [params, setParams] = useState<SearchRequestParams>({
    limit: 3,
    offset: 0,
    type: '',
    status: '',
  })
  const { data, isLoading } = useMyRequests(params)

  const handleLoadMore = () => {
    setParams({
      ...params,
      limit: (params.limit ?? 10) + 10,
    })
  }

  const handleSelectType = (item: string) => {
    setParams({
      ...params,
      type: item,
    })
  }

  const handleSelectStatus = (item: string) => {
    setParams({
      ...params,
      status: item,
    })
  }

  if (isLoading) {
    return (
      <Layout centered={true}>
        <Spinner />
      </Layout>
    )
  }

  return (
    <View>
      <Box m={3}>
        <Text category="h4">Фільтр</Text>
        <HStack space={3} py={2}>
          <Select
            selectedValue={params.type?.toString()}
            placeholder="Type"
            onValueChange={(itemValue) => handleSelectType(itemValue)}
            _selectedItem={{
              bg: 'green.300',
              endIcon: <CheckIcon size="5" />,
            }}
            flex={1}
          >
            <Select.Item
              label={i18n.language === 'uk' ? 'Всі' : 'All'}
              value=""
            />
            {REQUEST_TYPES.map(({ labelEn, labelUk, value }) => (
              <Select.Item
                key={value}
                label={i18n.language === 'uk' ? labelUk : labelEn}
                value={value}
              />
            ))}
          </Select>
          <Select
            selectedValue={params.status?.toString()}
            placeholder="Status"
            onValueChange={(itemValue) => handleSelectStatus(itemValue)}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            flex={1}
          >
            <Select.Item
              label={i18n.language === 'uk' ? 'Всі' : 'All'}
              value=""
            />
            {REQUEST_STATUSES.map(({ labelEn, labelUk, value }) => (
              <Select.Item
                key={value}
                label={i18n.language === 'uk' ? labelUk : labelEn}
                value={value}
              />
            ))}
          </Select>
        </HStack>
      </Box>
      <ScrollView>
        <VStack space={5} m={3} alignItems="stretch">
          <>
            {data?.data.map((request) => (
              <RequestCard key={request.id} request={request} maxW="100%" />
            ))}
            {data?.hasMore && (
              <Button onPress={handleLoadMore}>Load more</Button>
            )}
          </>
        </VStack>
      </ScrollView>
    </View>
  )
}
