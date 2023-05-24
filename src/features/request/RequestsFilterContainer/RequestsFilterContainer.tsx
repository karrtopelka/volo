import { Card } from '@/components'
import { REQUEST_FROM_DATE, REQUEST_STATUSES, REQUEST_TYPES } from '@/constants'
import { RequestSearchRequestParams, RequestStatus, RequestType } from '@/types'
import { CheckIcon, HStack, Select, VStack, Text } from 'native-base'
import { Dispatch, SetStateAction } from 'react'
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
    <Card m={3} title="Фільтр" sectionsPadding={3} sectionSpace={1}>
      <HStack space={3} py={2}>
        <VStack space={2} flex={1}>
          <Text size="sm" h="auto">
            Тип
          </Text>
          <Select
            selectedValue={params.type?.toString()}
            placeholder="Тип"
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
          <Text size="sm" h="auto">
            Статус
          </Text>
          <Select
            selectedValue={params.status?.toString()}
            placeholder="Стан"
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
          <Text size="sm" h="auto">
            Дата
          </Text>
          <Select
            selectedValue={params.fromDate?.toString()}
            placeholder="За"
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
    </Card>
  )
}
