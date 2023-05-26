import {
  Card,
  CardAttribute,
  ControlledInput,
  ControlledTagSelect,
  TagSelectOption,
} from '@/components'
import { useTags } from '@/hooks'
import { FormComponentProps } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, KeyboardAvoidingView, VStack, View } from 'native-base'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const requestCreateAdditionalInformationSchema = yup.object({
  monobankBucketLink: yup.string(),
  tags: yup.array().of(yup.number()),
})

export type RequestCreateAdditionalInformationFormData = {
  monobankBucketLink: string | null
  tags: number[]
}

export const RequestAdditionalInformationForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: FormComponentProps<RequestCreateAdditionalInformationFormData>): JSX.Element => {
  const { data: tags } = useTags()
  const [tagsSelect, setTagsSelect] = useState<TagSelectOption[]>([])
  const { i18n } = useTranslation()

  const { control, handleSubmit, reset } =
    useForm<RequestCreateAdditionalInformationFormData>({
      resolver: yupResolver(requestCreateAdditionalInformationSchema),
      defaultValues,
    })

  useEffect(() => {
    if (tags) {
      const isUkrainian = i18n.language === 'uk'
      const tagsSelect = tags.map(({ nameUk, nameEn, id }) => ({
        name: isUkrainian ? nameUk : nameEn,
        id,
      }))

      setTagsSelect(tagsSelect)
      reset({
        tags: defaultValues?.tags,
      })
    }

    return () => setTagsSelect([])
  }, [tags])

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <VStack space={3} p={2}>
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
            isLoading={isLoading}
          >
            {defaultValues ? 'Зберегти' : 'Наступний крок'}
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  )
}
