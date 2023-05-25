import { Box, Button, VStack, KeyboardAvoidingView } from 'native-base'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainTabsParamList } from '@/types'
import { useForm } from 'react-hook-form'
import { Routes } from '@/constants'
import {
  Card,
  CardAttribute,
  ControlledInput,
  ControlledTextArea,
  StepperContainer,
} from '@/components'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const requestCreateGeneralInformationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  goalAmount: yup.number(),
  totalCollected: yup
    .number()
    .test(
      'is-less-than-goal',
      'Зібрана сума не може бути вища за необхідну',
      function (value) {
        const { goalAmount } = this.parent // Get the value of goalAmount from the parent object

        return value === undefined || value < goalAmount
      }
    ),
})

type RequestCreateGeneralInformationFormData = {
  title: string
  description: string
  goalAmount: number | null
  totalCollected: number | null
}

export const RequestCreateGeneralInformationScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const { control, handleSubmit } =
    useForm<RequestCreateGeneralInformationFormData>({
      resolver: yupResolver(requestCreateGeneralInformationSchema),
    })

  const onSubmit = (data: RequestCreateGeneralInformationFormData) => {
    navigation.navigate(Routes.REQUEST_CREATE_CATEGORY, {
      data,
    })
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled={true} flex={1}>
      <VStack space={3} p={2} justifyContent="flex-end">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <StepperContainer
            numberOfSteps={5}
            currentStep={1}
            title="Основна інформація"
          />
          <Card shortDescription="Загальна інформація про запит">
            <VStack space={5}>
              <CardAttribute title="Назва запиту" isRequired={true}>
                <ControlledInput
                  control={control}
                  name="title"
                  placeholder="Введіть назву запиту"
                />
              </CardAttribute>
              <CardAttribute title="Опис запиту" isRequired={true}>
                <ControlledTextArea
                  control={control}
                  name="description"
                  placeholder="Введіть опис запиту"
                  totalLines={6}
                />
              </CardAttribute>
              <CardAttribute title="Необхідна сума">
                <ControlledInput
                  control={control}
                  name="goalAmount"
                  placeholder="Введіть необхідну суму"
                  keyboardType="numeric"
                />
              </CardAttribute>
              <CardAttribute title="Зібрано">
                <ControlledInput
                  control={control}
                  name="totalCollected"
                  placeholder="Введіть зібрану суму"
                  keyboardType="numeric"
                />
              </CardAttribute>
            </VStack>
          </Card>
        </TouchableWithoutFeedback>
        <Box mt={4}>
          <Button onPress={handleSubmit(onSubmit)} size="lg" width="100%">
            Наступний крок
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  )
}
