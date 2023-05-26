import { Card, ControlledTextArea } from '@/components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useForm } from 'react-hook-form'
import { useMutationWrapper, usePostChat } from '@/hooks'
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { KeyboardAvoidingView, VStack, Button } from 'native-base'

const createChatFormSchema = yup.object({
  message: yup.string().required(),
})

type CreateChatFormFormData = {
  message: string
}

export type CreateChatFormProps = {
  recipientId: number
}

export const CreateChatForm = ({
  recipientId,
}: CreateChatFormProps): JSX.Element => {
  const { mutateAsync: createChat, isLoading } = useMutationWrapper(usePostChat)
  const { control, handleSubmit } = useForm<CreateChatFormFormData>({
    resolver: yupResolver(createChatFormSchema),
  })
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const onSubmit = async (data: CreateChatFormFormData) => {
    await createChat(
      { ...data, recipientId },
      {
        successMessageKey: 'Чат створено',
        errorMessageKey: 'Виникла помилка при створенні',
        onSuccess: (data) =>
          navigation.dispatch(
            CommonActions.navigate({
              name: Routes.CHAT_NAVIGATOR,
              params: {
                screen: Routes.CHAT,
                params: {
                  id: data.id,
                },
              },
            })
          ),
      }
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" enabled={true} flex={1}>
      <VStack space={3} p={2} justifyContent="flex-end">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Card
            title="Нове повідомлення"
            shortDescription="Напишіть до прикладу що ви хочете дізнатись"
            footerActions={
              <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
                Надіслати
              </Button>
            }
          >
            <ControlledTextArea
              name="message"
              control={control}
              placeholder="Тут ви можете написати повідомлення"
              totalLines={4}
            />
          </Card>
        </TouchableWithoutFeedback>
      </VStack>
    </KeyboardAvoidingView>
  )
}
