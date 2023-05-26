import {
  CardAttribute,
  ControlledTagSelect,
  Layout,
  TagSelectOption,
} from '@/components'
import { Routes } from '@/constants'
import {
  useInterests,
  useMe,
  useMutationWrapper,
  usePatchInterests,
} from '@/hooks'
import { MainTabsParamList } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Box, Button, Spinner, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

const accountEditInterestsSchema = yup.object({
  interests: yup.array().of(yup.number()),
})

export type AccountEditInterestsFormData = {
  interests: number[]
}

export const AccountEditInterestsScreen = (): JSX.Element => {
  const { i18n } = useTranslation('account')
  const { data: interests } = useInterests()
  const [interestsSelect, setInterestsSelect] = useState<TagSelectOption[]>([])
  const { data: user } = useMe()
  const {
    mutateAsync: updateUserInterests,
    isLoading: isUpdateUserInterestsLoading,
  } = useMutationWrapper(usePatchInterests)
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const { control, handleSubmit } = useForm<AccountEditInterestsFormData>({
    resolver: yupResolver(accountEditInterestsSchema),
    defaultValues: {
      interests: user?.interests.map(({ id }) => id) ?? [],
    },
  })

  useEffect(() => {
    if (interests) {
      const isUkrainian = i18n.language === 'uk'
      const interestsSelect = interests.map(({ nameUk, nameEn, id }) => ({
        name: isUkrainian ? nameUk : nameEn,
        id,
      }))

      setInterestsSelect(interestsSelect)
    }

    return () => setInterestsSelect([])
  }, [interests])

  const onSubmit = async (data: AccountEditInterestsFormData) => {
    await updateUserInterests(data, {
      successMessageKey: 'Дані успішно оновлено',
      errorMessageKey: 'Не вдалося оновити дані',
      onSuccess: () => {
        navigation.navigate(Routes.ACCOUNT, {
          id: user!.id,
        })
      },
    })
  }

  if (isUpdateUserInterestsLoading) {
    return (
      <Layout centered={true}>
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <Box bg="white" flex={1} position="relative" zIndex={0} p={4}>
      <VStack space={5} h="100%">
        <CardAttribute title="Інтереси">
          <ControlledTagSelect
            control={control}
            name="interests"
            label="Інтереси"
            options={interestsSelect}
          />
        </CardAttribute>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isUpdateUserInterestsLoading}
        >
          Оновити
        </Button>
      </VStack>
    </Box>
  )
}
