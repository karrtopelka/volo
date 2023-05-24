import {
  Card,
  CardAttribute,
  ControlledInput,
  ControlledTagSelect,
  StepperContainer,
  TagSelectOption,
} from '@/components'
import { Routes } from '@/constants'
import { useMutationWrapper, usePostRequest, useTags } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, KeyboardAvoidingView, VStack, View } from 'native-base'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const requestCreateAdditionalInformationSchema = yup.object({
  monobankBucketLink: yup.string(),
  tags: yup.array().of(yup.number()),
})

type RequestCreateAdditionalInformationFormData = {
  monobankBucketLink: string | null
  tags: number[]
}

type RequestCreateAdditionalInformationScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION
>

export const RequestCreateAdditionalInformationScreen = ({
  route,
}: RequestCreateAdditionalInformationScreenProps): JSX.Element => {
  const { data: requestInformationData } = route.params
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { data: tags } = useTags()
  const [tagsSelect, setTagsSelect] = useState<TagSelectOption[]>([])

  const { mutateAsync: postRequest, isLoading: isPosting } =
    useMutationWrapper(usePostRequest)

  const { i18n } = useTranslation()

  const { control, handleSubmit } =
    useForm<RequestCreateAdditionalInformationFormData>({
      resolver: yupResolver(requestCreateAdditionalInformationSchema),
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

  const onSubmit = async (data: RequestCreateAdditionalInformationFormData) => {
    const requestData = {
      ...requestInformationData,
      ...data,
    }

    await postRequest(requestData, {
      successMessageKey: 'Запит успішно створено',
      errorMessageKey: 'Виникла помилка при створенні запиту',
      onSuccess: (data) => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: Routes.REQUEST_NAVIGATOR,
              params: {
                screen: Routes.REQUEST,
                params: {
                  id: data.id,
                  isSelfRequest: true,
                },
              },
            },
          ],
        })
      },
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
          currentStep={4}
          title="Додаткова інформація"
        />
        <View>
          <Card shortDescription="Банка моно та як асоціювати ваш запит">
            <VStack space={5}>
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
                  label="Теги"
                  options={tagsSelect}
                />
              </CardAttribute>
            </VStack>
          </Card>
        </View>

        <Box mt={4}>
          <Button
            onPress={handleSubmit(onSubmit)}
            size="lg"
            width="100%"
            isLoading={isPosting}
          >
            Створити запит
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  )
}
