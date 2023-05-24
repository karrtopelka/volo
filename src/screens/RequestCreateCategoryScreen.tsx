import {
  Card,
  CardAttribute,
  ControlledSelect,
  SelectOption,
  StepperContainer,
} from '@/components'
import { REQUEST_STATUSES, REQUEST_TYPES, Routes } from '@/constants'
import { useCategories } from '@/hooks'
import { MainTabsParamList, RequestStatus, RequestType } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, KeyboardAvoidingView, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const requestCreateCategorySchema = yup.object({
  categoryId: yup.number().required(),
  type: yup.string().required(),
  status: yup.string(),
})

type RequestCreateCategoryFormData = {
  categoryId: number
  type: string
  status: string | null
}

type RequestCreateCategoryScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_CREATE_CATEGORY
>

export const RequestCreateCategoryScreen = ({
  route,
}: RequestCreateCategoryScreenProps): JSX.Element => {
  const { data: generalInformationData } = route.params
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { i18n } = useTranslation()

  const { data: categories } = useCategories()
  const [categoriesSelect, setCategoriesSelect] = useState<SelectOption[]>([])

  useEffect(() => {
    if (categories) {
      const isUkrainian = i18n.language === 'uk'
      const categoriesSelect = categories.map(({ nameUk, nameEn, id }) => ({
        label: isUkrainian ? nameUk : nameEn,
        value: id.toString(),
      }))

      setCategoriesSelect(categoriesSelect)
    }

    return () => setCategoriesSelect([])
  }, [categories])

  const requestTypes: SelectOption[] = REQUEST_TYPES.map(
    ({ labelUk, labelEn, value }) => ({
      label: i18n.language === 'uk' ? labelUk : labelEn,
      value,
    })
  )

  const requestStatuses: SelectOption[] = REQUEST_STATUSES.map(
    ({ labelUk, labelEn, value }) => ({
      label: i18n.language === 'uk' ? labelUk : labelEn,
      value,
    })
  )

  const { control, handleSubmit } = useForm<RequestCreateCategoryFormData>({
    resolver: yupResolver(requestCreateCategorySchema),
  })

  const onSubmit = (data: RequestCreateCategoryFormData) => {
    const formattedData = {
      ...generalInformationData,
      ...data,
      status: data.status as RequestStatus,
      type: data.type as RequestType,
    }

    navigation.navigate(Routes.REQUEST_CREATE_PHOTOS, {
      data: formattedData,
    })
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <VStack space={3} p={2}>
        <StepperContainer
          numberOfSteps={4}
          currentStep={2}
          title="Стан та категорія"
        />
        <Card shortDescription="Яка на даний момент ситуація з запитом?">
          <VStack space={5}>
            <CardAttribute title="Категорія" isRequired={true}>
              <ControlledSelect
                control={control}
                name="categoryId"
                label="Категорія"
                options={categoriesSelect}
              />
              <Button
                size="xs"
                variant="ghost"
                colorScheme="purple"
                alignSelf="flex-start"
                ml={-2.5}
              >
                Додаткова інформація про категорію запиту
              </Button>
            </CardAttribute>
            <CardAttribute title="Тип запиту" isRequired={true}>
              <ControlledSelect
                control={control}
                name="type"
                label="Тип запиту"
                options={requestTypes}
              />
              <Button
                size="xs"
                variant="ghost"
                colorScheme="purple"
                alignSelf="flex-start"
                ml={-2.5}
              >
                Додаткова інформація про тип запиту
              </Button>
            </CardAttribute>
            <CardAttribute title="Стан запиту">
              <ControlledSelect
                control={control}
                name="status"
                label="Стан запиту"
                options={requestStatuses}
              />
              <Button
                size="xs"
                variant="ghost"
                colorScheme="purple"
                alignSelf="flex-start"
                ml={-2.5}
              >
                Додаткова інформація про стан запиту
              </Button>
            </CardAttribute>
          </VStack>
        </Card>
        <Box mt={4}>
          <Button onPress={handleSubmit(onSubmit)} size="lg" width="100%">
            Наступний крок
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  )
}
