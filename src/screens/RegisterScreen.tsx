import { CardAttribute, ControlledInput, SelectLanguage } from '@/components'
import { useAuthContext, useMutationWrapper, useSignUp } from '@/hooks'
import { Button, Card, CheckBox, Spinner, Text } from '@ui-kitten/components'
import { Box, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'
import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '@/types'
import { Routes } from '@/constants'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const LoadingIndicator = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    <Spinner status="basic" size="small" />
  </View>
)

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

type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  Routes.REGISTER
>

export const RegisterScreen = ({ route }: RegisterScreenProps): JSX.Element => {
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
            disabled={true}
            header={
              <Box alignSelf="center">
                <Text category="h4">{t('register.title')!}</Text>
              </Box>
            }
            footer={
              <VStack space={1}>
                <Button
                  onPress={handleSubmit(onSubmit)}
                  accessoryLeft={isLoading ? LoadingIndicator : undefined}
                >
                  {isLoading ? '' : t('register.submit')!}
                </Button>
                <Button onPress={onLoginClick} appearance="ghost">
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
                render={({ field: { onChange, value } }) => (
                  <CheckBox checked={value} onChange={() => onChange(!value)}>
                    {t('isRemember')!}
                  </CheckBox>
                )}
              />
            </VStack>
          </Card>
          <Card disabled={true}>
            <CardAttribute title={t('common:language')!}>
              <SelectLanguage />
            </CardAttribute>
          </Card>
        </VStack>
      </TouchableWithoutFeedback>
    </Box>
  )
}
