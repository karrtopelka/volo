import {
  Card,
  CardAttribute,
  ControlledInput,
  Layout,
  SelectLanguageContainer,
} from '@/components'
import { useAuthContext, useMutationWrapper, useSignIn } from '@/hooks'
import {
  Box,
  Heading,
  Spinner,
  VStack,
  Text,
  Button,
  Checkbox,
} from 'native-base'
import { useTranslation } from 'react-i18next'
import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '@/types'
import { Routes } from '@/constants'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

export type LoginFormData = {
  email: string
  password: string
  isRemember: boolean
}

export const LoginScreen = (): JSX.Element => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { t } = useTranslation('auth')
  const { login } = useAuthContext()
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const { mutateAsync: signIn, isLoading } = useMutationWrapper(useSignIn)

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: 'lviv@email.com',
      password: 'Hello1!t',
      isRemember: true,
    },
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setErrorMsg(t('requiredData.location')!)

        return
      }

      const location = await Location.getCurrentPositionAsync({})

      setLocation(location)
    })()
  }, [])

  const onRegisterClick = () =>
    navigation.navigate(Routes.REGISTER, { location: location! })

  const onSubmit = async ({ email, password, isRemember }: LoginFormData) => {
    const { latitude, longitude } = location!.coords

    await signIn(
      { email, password, latitude, longitude },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          login(accessToken, refreshToken, isRemember)
        },
      }
    )
  }

  if (errorMsg) {
    return (
      <Box bg="white" flex={1} safeArea={true} position="relative" zIndex={0}>
        <VStack space="5" justifyContent="center" h="100%" mx={5}>
          <Heading ml={2}>{errorMsg}</Heading>
          <SelectLanguageContainer />
        </VStack>
      </Box>
    )
  }

  if (!location) {
    return (
      <Layout centered={true}>
        <VStack space={5} alignItems="center">
          <Spinner size="sm" />
          <Text>
            Отримуємо ваше поточне місцеположення, зачекайте будь ласка
          </Text>
          <Text size="sm" style={{ alignSelf: 'flex-start' }}>
            Безпека понад усе
          </Text>
        </VStack>
      </Layout>
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
            title={t('login.title')!}
            footerActions={
              <VStack space={1}>
                <Button onPress={handleSubmit(onSubmit)} isLoading={isLoading}>
                  {t('login.submit')!}
                </Button>
                <Button onPress={onRegisterClick} variant="ghost">
                  {t('shared.register')!}
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
