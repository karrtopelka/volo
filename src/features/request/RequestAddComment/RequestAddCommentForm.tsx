import { CardAttribute, ControlledInput } from '@/components'
import { useMutationWrapper, usePostComment } from '@/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { Button, Card, Spinner } from '@ui-kitten/components'
import { HStack } from 'native-base'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
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

const LoadingIndicator = (): React.ReactElement => (
  <View
    style={[
      {
        justifyContent: 'center',
        alignItems: 'center',
      },
    ]}
  >
    <Spinner size="small" status="basic" />
  </View>
)

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
      disabled={true}
      footer={
        <HStack justifyContent="space-between">
          <Button
            disabled={isLoading}
            appearance="ghost"
            onPress={() => navigation.goBack()}
          >
            Відміна
          </Button>
          <Button
            disabled={isLoading}
            onPress={handleSubmit(onSubmit)}
            accessoryRight={isLoading ? LoadingIndicator : undefined}
          >
            Додати
          </Button>
        </HStack>
      }
    >
      <CardAttribute title="Коментар">
        <ControlledInput
          control={control}
          name="content"
          placeholder="Введіть коментар"
          multiline={true}
          numberOfLines={3}
        />
      </CardAttribute>
    </Card>
  )
}
