import { Card, ControlledTextArea } from '@/components'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useForm } from 'react-hook-form'
import { useMutationWrapper, usePostChat } from '@/hooks'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
        onSuccess: (data) => {
          const recipient = data.users.find((user) => user.id === recipientId)!
          const recipientName = recipient?.name ?? recipient.email.split('@')[0]

          return navigation.navigate(Routes.CHAT_NAVIGATOR, {
            screen: Routes.CHAT,
            params: {
              id: data.id,
              recipientId,
              recipientName,
            },
          })
        },
      }
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
          title="Нове повідомлення"
          shortDescription="Напишіть до прикладу що ви хочете дізнатись"
          footerActions={
            <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
              Надіслати
            </Button>
          }
          m={4}
        >
          <ControlledTextArea
            name="message"
            control={control}
            placeholder="Тут ви можете написати повідомлення"
            totalLines={4}
          />
        </Card>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  )
}
