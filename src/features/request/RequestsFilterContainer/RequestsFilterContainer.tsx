import { REQUEST_FROM_DATE, REQUEST_STATUSES, REQUEST_TYPES } from '@/constants'
import { RequestSearchRequestParams, RequestStatus, RequestType } from '@/types'
import { Box, CheckIcon, HStack, Select, VStack } from 'native-base'
import { Dispatch, SetStateAction } from 'react'
import { Text } from '@ui-kitten/components'
import { useTranslation } from 'react-i18next'

export type RequestsFilterContainerProps = {
  params: RequestSearchRequestParams
  setParams: Dispatch<SetStateAction<RequestSearchRequestParams>>
}

export const RequestsFilterContainer = ({
  params,
  setParams,
}: RequestsFilterContainerProps): JSX.Element => {
  const { i18n } = useTranslation()

  const handleSelectType = (item: string) => {
    if (!item) {
      setParams((prev) => ({
        ...prev,
        type: undefined,
      }))

      return
    }

    setParams((prev) => ({
      ...prev,
      type: item as RequestType,
    }))
  }

  const handleSelectStatus = (item: string) => {
    if (!item) {
      setParams((prev) => ({
        ...prev,
        status: undefined,
      }))

      return
    }

    setParams((prev) => ({
      ...prev,
      status: item as RequestStatus,
    }))
  }

  const handleSelectFromDate = (item: string) => {
    if (!item) {
      setParams((prev) => ({
        ...prev,
        fromDate: undefined,
      }))

      return
    }

    setParams((prev) => ({
      ...prev,
      fromDate: item,
    }))
  }

  return (
    <Box m={3}>
      <Text category="h4">Фільтр</Text>
      <HStack space={3} py={2}>
        <VStack space={2} flex={1}>
          <Text category="c1">Тип</Text>
          <Select
            selectedValue={params.type?.toString()}
            placeholder="Type"
            onValueChange={(itemValue) => handleSelectType(itemValue)}
            _selectedItem={{
              bg: 'green.300',
              endIcon: <CheckIcon size="5" />,
            }}
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
        </VStack>
        <VStack space={2} flex={1}>
          <Text category="c1">Статус</Text>
          <Select
            selectedValue={params.status?.toString()}
            placeholder="Status"
            onValueChange={(itemValue) => handleSelectStatus(itemValue)}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
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
        </VStack>
        <VStack space={2} flex={1}>
          <Text category="c1">Дата</Text>
          <Select
            selectedValue={params.fromDate?.toString()}
            placeholder="From date"
            onValueChange={(itemValue) => handleSelectFromDate(itemValue)}
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
          >
            <Select.Item
              label={i18n.language === 'uk' ? 'Всі' : 'All'}
              value=""
            />
            {REQUEST_FROM_DATE.map(({ labelEn, labelUk, value }) => (
              <Select.Item
                key={value}
                label={i18n.language === 'uk' ? labelUk : labelEn}
                value={value}
              />
            ))}
          </Select>
        </VStack>
      </HStack>
    </Box>
  )
}
