import {
  Card,
  CardAttribute,
  ControlledSelect,
  SelectOption,
} from '@/components'
import { REQUEST_STATUSES, REQUEST_TYPES } from '@/constants'
import { useCategories } from '@/hooks'
import { FormComponentProps } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
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

export type RequestCreateCategoryFormData = {
  categoryId: number
  type: string
  status: string | null
}

export const RequestCategoryForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: FormComponentProps<RequestCreateCategoryFormData>): JSX.Element => {
  const { i18n } = useTranslation()

  const { data: categories } = useCategories()
  const [categoriesSelect, setCategoriesSelect] = useState<SelectOption[]>([])

  const { control, handleSubmit } = useForm<RequestCreateCategoryFormData>({
    resolver: yupResolver(requestCreateCategorySchema),
  })

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

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <VStack space={3} p={2}>
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
          <Button
            onPress={handleSubmit(onSubmit)}
            size="lg"
            width="100%"
            isLoading={isLoading}
          >
            {defaultValues ? 'Зберегти' : 'Наступний крок'}
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  )
}
