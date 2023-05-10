import { Box, ScrollView, VStack } from 'native-base'
import { Button, Card, Spinner } from '@ui-kitten/components'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Routes, USER_ROLES } from '@/constants'
import { MainTabsParamList, UserRole } from '@/types'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import {
  CardAttribute,
  ControlledInput,
  ControlledPhoneInput,
  ControlledPhotoInput,
  ControlledSelect,
  ControlledTagSelect,
  TagSelectOption,
} from '@/components'
import { useInterests, useMutationWrapper, usePatchUsers } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'

const accountEditSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string(),
  avatar: yup.string(),
  role: yup.string(),
  phoneNumber: yup.string(),
  interests: yup.array().of(yup.number()),
})

export type AccountEditFormData = {
  email: string
  name: string
  avatar: string
  role: string
  phoneNumber: string
  interests: number[]
}

type AccountEditScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.ACCOUNT_EDIT
>

export const AccountEditScreen = ({
  route,
}: AccountEditScreenProps): JSX.Element => {
  const { user } = route.params
  const { i18n } = useTranslation('account')
  const { data: interests } = useInterests()
  const [interestsSelect, setInterestsSelect] = useState<TagSelectOption[]>([])
  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useMutationWrapper(usePatchUsers)
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const { control, handleSubmit } = useForm<AccountEditFormData>({
    resolver: yupResolver(accountEditSchema),
    defaultValues: {
      email: user?.email ?? '',
      name: user?.name ?? '',
      avatar: user?.avatar ?? '',
      role: user?.role ?? '',
      phoneNumber: user?.phoneNumber ?? '',
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

  const onSubmit = async (data: AccountEditFormData) => {
    await updateUser(
      { ...data, role: data.role as UserRole },
      {
        onSuccess: () => navigation.goBack(),
      }
    )
  }

  return (
    <ScrollView>
      <Box bg="white" flex={1} position="relative" zIndex={0} p={4}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {isUpdateUserLoading ? (
            <Spinner size="small" status="basic" />
          ) : (
            <VStack space={5} h="100%">
              <Card disabled={true}>
                <VStack space={5}>
                  <CardAttribute title="email">
                    <ControlledInput
                      control={control}
                      name="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      inputMode="email"
                      returnKeyType="next"
                      placeholder="email@email.com"
                    />
                  </CardAttribute>
                  <CardAttribute title="name">
                    <ControlledInput
                      control={control}
                      name="name"
                      inputMode="text"
                      returnKeyType="next"
                      placeholder="Ryan Gosling"
                    />
                  </CardAttribute>
                  <CardAttribute title="photo">
                    <ControlledPhotoInput control={control} name="avatar" />
                  </CardAttribute>
                  <CardAttribute title="role">
                    <ControlledSelect
                      control={control}
                      name="role"
                      label="Role"
                      options={USER_ROLES.map(
                        ({ labelUk, labelEn, value }) => ({
                          label: i18n.language === 'uk' ? labelUk : labelEn,
                          value,
                        })
                      )}
                    />
                  </CardAttribute>
                  <CardAttribute title="phone">
                    <ControlledPhoneInput
                      control={control}
                      name="phoneNumber"
                      inputMode="tel"
                      returnKeyType="next"
                      placeholder="+380672080558"
                    />
                  </CardAttribute>
                  <CardAttribute title="interests">
                    <ControlledTagSelect
                      control={control}
                      name="interests"
                      label="Interests"
                      options={interestsSelect}
                    />
                  </CardAttribute>
                </VStack>
              </Card>
              <Button style={{ flex: 1.5 }} onPress={handleSubmit(onSubmit)}>
                Save
              </Button>
            </VStack>
          )}
        </TouchableWithoutFeedback>
      </Box>
    </ScrollView>
  )
}
