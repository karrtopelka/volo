import { Box, VStack, Button, Spinner, KeyboardAvoidingView } from 'native-base'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { USER_ROLES } from '@/constants'
import { BucketNames, UserRole } from '@/types'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import {
  Card,
  CardAttribute,
  ControlledInput,
  ControlledPhoneInput,
  ControlledPhotoInput,
  ControlledSelect,
} from '@/components'
import { useMe, useMutationWrapper, usePatchUsers } from '@/hooks'
import { useTranslation } from 'react-i18next'

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
    await updateUser({ ...data, role: data.role as UserRole })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      h={{
        base: '200px',
        lg: 'auto',
      }}
    >
      <Box bg="white" flex={1} position="relative" zIndex={0} p={4}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {isUpdateUserLoading ? (
            <Spinner size="sm" />
          ) : (
            <VStack space={5} h="100%">
              <Card>
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
                  <CardAttribute title="Роль">
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
              </Card>
              <Button onPress={handleSubmit(onSubmit)}>Оновити</Button>
            </VStack>
          )}
        </TouchableWithoutFeedback>
      </Box>
    </KeyboardAvoidingView>
  )
}
