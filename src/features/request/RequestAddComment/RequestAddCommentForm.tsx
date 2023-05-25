import { Card, CardAttribute, ControlledTextArea } from '@/components'
import { useMutationWrapper, usePostComment } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { Button, HStack } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  content: yup.string().required(),
})

type RequestAddCommentFormData = {
  content: string
}

export type RequestAddCommentFormProps = {
  requestId: number
}

export const RequestAddCommentForm = ({
  requestId,
}: RequestAddCommentFormProps): JSX.Element => {
  const navigation = useNavigation()
  const { mutateAsync: postComment, isLoading } = useMutationWrapper(
    usePostComment.bind(null, requestId)
  )

  const { control, handleSubmit } = useForm<RequestAddCommentFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: RequestAddCommentFormData) => {
    await postComment(data, {
      successMessageKey: 'Коментар додано',
      errorMessageKey: 'Виникла помилка при додаванні',
      onSuccess: () => {
        navigation.goBack()
      },
    })
  }

  return (
    <Card
      footerActions={
        <HStack justifyContent="space-between">
          <Button
            isLoading={isLoading}
            variant="ghost"
            onPress={() => navigation.goBack()}
          >
            Відміна
          </Button>
          <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
            Додати
          </Button>
        </HStack>
      }
    >
      <CardAttribute title="Коментар">
        <ControlledTextArea
          control={control}
          name="content"
          placeholder="Введіть коментар"
          totalLines={3}
        />
      </CardAttribute>
    </Card>
  )
}
