import {
  CardAttribute,
  ControlledInput,
  ControlledSelect,
  ControlledTagSelect,
  Layout,
  SelectOption,
  TagSelectOption,
} from '@/components'
import { REQUEST_STATUSES, REQUEST_TYPES, Routes } from '@/constants'
import { RequestManagePhotos } from '@/features'
import {
  useCategories,
  useMutationWrapper,
  usePatchRequest,
  usePostRequest,
  useRequest,
  useTags,
} from '@/hooks'
import { MainTabsParamList, RequestStatus, RequestType } from '@/types'
import { isUrl, uploadImageToStorage } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Card, Spinner, Text } from '@ui-kitten/components'
import { Box, HStack, ScrollView, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import * as yup from 'yup'

const LoadingIndicator = (): React.ReactElement => (
  <View
    style={[
      {
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    <Spinner size="small" status="basic" />
  </View>
)

type RequestCreateScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_CREATE
>

const requestCreateSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  categoryId: yup.number().required(),
  type: yup.string().required(),
  status: yup.string(),
  goalAmount: yup.number(),
  totalCollected: yup.number(),
  monobankBucketLink: yup.string(),
  tags: yup.array().of(yup.number()),
  attachments: yup.array().of(yup.string()),
})

export type RequestCreateFormData = {
  title: string
  description: string | null
  categoryId: string
  type: string
  status: string | null
  goalAmount: string | null
  totalCollected: string | null
  monobankBucketLink: string | null
  tags: number[]
  attachments: string[]
}

export const RequestCreateScreen = ({
  route,
}: RequestCreateScreenProps): JSX.Element => {
  const { id } = route.params

  console.log('🚀 ~ file: RequestCreateScreen.tsx:81 ~ id:', id)
  const { data, isInitialLoading, isRefetching } = useRequest({ id })

  const { i18n } = useTranslation()
  const { data: tags } = useTags()
  const { data: categories } = useCategories()
  const [tagsSelect, setTagsSelect] = useState<TagSelectOption[]>([])
  const [categoriesSelect, setCategoriesSelect] = useState<SelectOption[]>([])
  const { mutateAsync: postRequest, isLoading: isPosting } =
    useMutationWrapper(usePostRequest)
  const { mutateAsync: patchRequest, isLoading: isPatching } =
    useMutationWrapper(usePatchRequest.bind(null, id ?? 0))
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

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

  const { control, handleSubmit } = useForm<RequestCreateFormData>({
    resolver: yupResolver(requestCreateSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      categoryId: data?.categoryId?.toString() ?? '',
      type: data?.type ?? '',
      status: data?.status ?? '',
      goalAmount: data?.goalAmount?.toString() ?? '',
      totalCollected: data?.totalCollected?.toString() ?? '',
      monobankBucketLink: data?.monobankBucketLink ?? '',
      tags: data?.tags.map(({ id }) => id) ?? [],
      attachments: data?.attachments.map(({ fileUrl }) => fileUrl) ?? [],
    },
  })

  useEffect(() => {
    if (tags) {
      const isUkrainian = i18n.language === 'uk'
      const tagsSelect = tags.map(({ nameUk, nameEn, id }) => ({
        name: isUkrainian ? nameUk : nameEn,
        id,
      }))

      setTagsSelect(tagsSelect)
    }

    return () => setTagsSelect([])
  }, [tags])

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

  const onSubmit = async (data: RequestCreateFormData) => {
    const { attachments } = data

    const newAttachments = await Promise.all(
      attachments.map(async (attachment) => {
        if (!isUrl(attachment)) {
          const fileUrl = await uploadImageToStorage({
            base64: attachment,
            bucketName: 'requests',
          })

          return fileUrl
        }

        return attachment
      })
    )

    const formattedData = {
      ...data,
      type: data.type as RequestType,
      status: data.status as RequestStatus,
      goalAmount: Number(data.goalAmount),
      totalCollected: Number(data.totalCollected),
      categoryId: Number(data.categoryId),
      attachments: newAttachments,
    }

    if (id) {
      await patchRequest(formattedData, {
        successMessageKey: 'Запит успішно оновлено',
        errorMessageKey: 'Виникла помилка при оновленні запиту',
        onSuccess: (data) => {
          navigation.navigate(Routes.REQUEST, {
            id: data.id,
            isSelfRequest: true,
          })
        },
      })
    } else {
      await postRequest(formattedData, {
        successMessageKey: 'Запит успішно створено',
        errorMessageKey: 'Виникла помилка при створенні запиту',
        onSuccess: (data) => {
          navigation.navigate(Routes.REQUEST, {
            id: data.id,
            isSelfRequest: true,
          })
        },
      })
    }
  }

  if (isInitialLoading || isRefetching) {
    return (
      <Layout centered={true}>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Box safeAreaTop={id ? undefined : true}>
      <ScrollView>
        <Box bg="white" flex={1} position="relative" zIndex={0} p={4}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <VStack space={5} h="100%">
              {!id && (
                <Text category="h4" style={{ alignSelf: 'center' }}>
                  Створити запит
                </Text>
              )}

              <Card
                disabled={true}
                header={
                  <Box>
                    <Text category="h5">Основна інформація</Text>
                  </Box>
                }
              >
                <VStack space={5}>
                  <CardAttribute title="Назва" isRequired={true}>
                    <ControlledInput
                      control={control}
                      name="title"
                      returnKeyType="next"
                      placeholder="Запит"
                    />
                  </CardAttribute>
                  <CardAttribute title="Опис">
                    <ControlledInput
                      control={control}
                      name="description"
                      returnKeyType="next"
                      placeholder="Опис"
                      multiline={true}
                      textStyle={{ minHeight: 64 }}
                    />
                  </CardAttribute>
                  <CardAttribute title="Категорія" isRequired={true}>
                    <ControlledSelect
                      control={control}
                      name="categoryId"
                      label="Категорія"
                      options={categoriesSelect}
                    />
                  </CardAttribute>
                  <CardAttribute title="Тип запиту" isRequired={true}>
                    <ControlledSelect
                      control={control}
                      name="type"
                      label="Тип запиту"
                      options={requestTypes}
                    />
                  </CardAttribute>

                  <CardAttribute title="Ціль (грн)">
                    <ControlledInput
                      control={control}
                      name="goalAmount"
                      returnKeyType="next"
                      placeholder="1000"
                      keyboardType="numeric"
                    />
                  </CardAttribute>
                  <CardAttribute title="Вже зібрано (грн)">
                    <ControlledInput
                      control={control}
                      name="totalCollected"
                      returnKeyType="next"
                      placeholder="1000"
                      keyboardType="numeric"
                    />
                  </CardAttribute>
                </VStack>
              </Card>
              <Card
                disabled={true}
                header={
                  <Box>
                    <Text category="h5">Фотознимки</Text>
                  </Box>
                }
              >
                <RequestManagePhotos control={control} name="attachments" />
              </Card>
              <Card
                disabled={true}
                header={
                  <Box>
                    <Text category="h5">Додаткова інформація</Text>
                  </Box>
                }
              >
                <VStack space={5}>
                  <CardAttribute title="Стан запиту">
                    <ControlledSelect
                      control={control}
                      name="status"
                      label="Стан запиту"
                      options={requestStatuses}
                    />
                  </CardAttribute>
                  <CardAttribute title="Посилання на monoБанку">
                    <ControlledInput
                      control={control}
                      name="monobankBucketLink"
                      returnKeyType="next"
                      placeholder="monobank.ua/banka"
                    />
                  </CardAttribute>
                  <CardAttribute title="Теги">
                    <ControlledTagSelect
                      control={control}
                      name="tags"
                      label="Tags"
                      options={tagsSelect}
                    />
                  </CardAttribute>
                </VStack>
              </Card>
              <HStack justifyContent="space-between" space={3}>
                <Button
                  onPress={() => navigation.goBack()}
                  appearance="outline"
                >
                  Скасувати
                </Button>
                <Button
                  style={{ flex: 1 }}
                  onPress={handleSubmit(onSubmit)}
                  disabled={isPosting || isPatching}
                  accessoryLeft={
                    isPosting || isPatching ? LoadingIndicator : undefined
                  }
                >
                  {id ? 'Оновити' : 'Створити'}
                </Button>
              </HStack>
            </VStack>
          </TouchableWithoutFeedback>
        </Box>
      </ScrollView>
    </Box>
  )
}
