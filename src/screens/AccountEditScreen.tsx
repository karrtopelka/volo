import { VStack, Button, Skeleton } from 'native-base'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Routes, USER_ROLES } from '@/constants'
import { BucketNames, MainTabsParamList, UserRole } from '@/types'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import {
  Card,
  CardAttribute,
  ControlledInput,
  ControlledPhoneInput,
  ControlledPhotoInput,
  ControlledSelect,
  Layout,
} from '@/components'
import { useMe, useMutationWrapper, usePatchUsers } from '@/hooks'
import { useTranslation } from 'react-i18next'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const accountEditSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().nullable(),
  avatar: yup.string().nullable(),
  role: yup.string().required(),
  phoneNumber: yup.string().nullable(),
})

export type AccountEditFormData = {
  email: string
  name: string | null
  avatar: string | null
  role: string
  phoneNumber: string | null
}

export const AccountEditScreen = (): JSX.Element => {
  const { i18n } = useTranslation('account')
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { mutateAsync: updateUser, isLoading: isUpdateUserLoading } =
    useMutationWrapper(usePatchUsers)
  const { data: user } = useMe()

  const { control, handleSubmit } = useForm<AccountEditFormData>({
    resolver: yupResolver(accountEditSchema),
    defaultValues: {
      email: user?.email ?? '',
      name: user?.name ?? null,
      avatar: user?.avatar ?? null,
      role: user?.role ?? UserRole.VOLUNTEER,
      phoneNumber: user?.phoneNumber ?? null,
    },
  })

  const onSubmit = async (data: AccountEditFormData) => {
    await updateUser(
      { ...data, role: data.role as UserRole },
      {
        successMessageKey: 'Дані успішно оновлено',
        errorMessageKey: 'Не вдалося оновити дані',
        onSuccess: () => {
          navigation.navigate(Routes.ACCOUNT, {
            id: user!.id,
          })
        },
      }
    )
  }

  if (isUpdateUserLoading) {
    return (
      <Layout>
        <VStack space={5}>
          <Skeleton h="40" />
          <Skeleton.Text />
          <Skeleton h="20" />
          <Skeleton.Text />
        </VStack>
      </Layout>
    )
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card
          footerActions={
            <Button onPress={handleSubmit(onSubmit)}>Оновити</Button>
          }
          m={4}
        >
          <VStack space={5}>
            <CardAttribute title="Електронна пошта">
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
            <CardAttribute title="Імʼя (та прізвище)">
              <ControlledInput
                control={control}
                name="name"
                inputMode="text"
                returnKeyType="next"
                placeholder="Ryan Gosling"
              />
            </CardAttribute>
            <CardAttribute title="Аватар">
              <ControlledPhotoInput
                control={control}
                name="avatar"
                bucketName={BucketNames.AVATARS}
              />
            </CardAttribute>
            <VStack space={5}>
              <CardAttribute title="Роль">
                <ControlledSelect
                  control={control}
                  name="role"
                  label="Role"
                  options={USER_ROLES.map(({ labelUk, labelEn, value }) => ({
                    label: i18n.language === 'uk' ? labelUk : labelEn,
                    value,
                  }))}
                />
              </CardAttribute>
              <CardAttribute title="Телефон">
                <ControlledPhoneInput
                  control={control}
                  name="phoneNumber"
                  inputMode="tel"
                  returnKeyType="next"
                  placeholder="+380672080558"
                />
              </CardAttribute>
            </VStack>
          </VStack>
        </Card>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}
