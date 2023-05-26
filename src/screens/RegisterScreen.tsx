import {
  Card,
  CardAttribute,
  ControlledInput,
  SelectLanguageContainer,
} from '@/components'
import { useAuthContext, useMutationWrapper, useSignUp } from '@/hooks'
import { Box, Button, Checkbox, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'
import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { AuthStackParamList } from '@/types'
import { Routes } from '@/constants'

const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  passwordConfirmation: yup.string().test(
    'passwords-match',

    function (value) {
      return this.parent.password === value
    }
  ),
})

export type RegisterFormData = {
  email: string
  password: string
  passwordConfirmation: string
  isRemember: boolean
}

export const RegisterScreen = (): JSX.Element => {
  const route = useRoute<RouteProp<AuthStackParamList, Routes.REGISTER>>()
  const { t } = useTranslation('auth')
  const { login } = useAuthContext()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  const { location } = route.params

  const { mutateAsync: signUp, isLoading } = useMutationWrapper(useSignUp)

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  })

  const onLoginClick = () => navigation.navigate(Routes.LOGIN, { location })

  const onSubmit = async ({
    email,
    password,
    isRemember,
  }: RegisterFormData) => {
    const { latitude, longitude } = location!.coords

    await signUp(
      { email, password, latitude, longitude },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          login(accessToken, refreshToken, isRemember)
        },
      }
    )
  }

  return (
    <Box bg="white" flex={1} safeArea={true} position="relative" zIndex={0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack space="5" justifyContent="center" h="100%" mx={5}>
          <Image
            source={require('@assets/volo-logo.png')}
            style={{
              height: 108,
              alignSelf: 'center',
              aspectRatio: '16 / 9',
            }}
            resizeMode="contain"
          />
          <Card
            title={t('register.title')!}
            footerActions={
              <VStack space={1}>
                <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
                  {t('register.submit')!}
                </Button>
                <Button onPress={onLoginClick} variant="ghost">
                  {t('shared.login')!}
                </Button>
              </VStack>
            }
          >
            <VStack space={5}>
              <CardAttribute title={t('shared.email')!}>
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
              <CardAttribute title={t('shared.password')!}>
                <ControlledInput
                  control={control}
                  name="password"
                  autoComplete="password-new"
                  autoCorrect={false}
                  inputMode="text"
                  secureTextEntry={true}
                  placeholder="********"
                />
              </CardAttribute>
              <CardAttribute title={t('shared.passwordConfirmation')!}>
                <ControlledInput
                  control={control}
                  name="passwordConfirmation"
                  autoComplete="password-new"
                  autoCorrect={false}
                  inputMode="text"
                  secureTextEntry={true}
                  placeholder="********"
                />
              </CardAttribute>
              <Controller
                control={control}
                name="isRemember"
                render={({ field: { onChange } }) => (
                  <Checkbox
                    value="Remember me"
                    onChange={(isSelected) => onChange(isSelected)}
                  >
                    {t('isRemember')!}
                  </Checkbox>
                )}
              />
            </VStack>
          </Card>
          <SelectLanguageContainer />
        </VStack>
      </TouchableWithoutFeedback>
    </Box>
  )
}
