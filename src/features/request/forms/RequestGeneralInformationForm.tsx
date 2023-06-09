import {
  Card,
  CardAttribute,
  ControlledInput,
  ControlledTextArea,
} from '@/components'
import { FormComponentProps, Request } from '@/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, VStack } from 'native-base'
import { useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const requestCreateGeneralInformationSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  goalAmount: yup.number().nullable(),
  totalCollected: yup
    .number()
    .test(
      'is-less-than-goal',
      'Зібрана сума не може бути вища за необхідну',
      function (value) {
        const { goalAmount } = this.parent // Get the value of goalAmount from the parent object

        return value === undefined || value < goalAmount
      }
    )
    .nullable(),
})

export type RequestCreateGeneralInformationFormData = {
  totalCollected: string | null
  goalAmount: string | null
} & Pick<Request, 'title' | 'description'>

export const RequestGeneralInformationForm = ({
  defaultValues,
  onSubmit,
  isLoading,
}: FormComponentProps<RequestCreateGeneralInformationFormData>): JSX.Element => {
  const { control, handleSubmit } =
    useForm<RequestCreateGeneralInformationFormData>({
      resolver: yupResolver(requestCreateGeneralInformationSchema),
      defaultValues,
    })

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={true}
    >
      <VStack space={3} p={2} justifyContent="flex-end">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        <Box mt={2}>
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
    </KeyboardAwareScrollView>
  )
}
