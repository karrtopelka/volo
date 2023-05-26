import { Routes } from '@/constants'
import {
  RequestAdditionalInformationForm,
  RequestCreateAdditionalInformationFormData,
} from '@/features'
import { useMutationWrapper, usePatchRequest } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { VStack } from 'native-base'

type RequestEditAdditionalInformationScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_EDIT_ADDITIONAL_INFORMATION
>

export const RequestEditAdditionalInformationScreen = ({
  route,
}: RequestEditAdditionalInformationScreenProps): JSX.Element => {
  const { data } = route.params
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const { mutateAsync: updateAdditionalInformation, isLoading } =
    useMutationWrapper(usePatchRequest.bind(null, data.id))

  const onSubmit = async (
    newData: RequestCreateAdditionalInformationFormData
  ) => {
    await updateAdditionalInformation(newData, {
      successMessageKey: 'Дані успішно оновлено',
      onSuccess: () => {
        navigation.navigate(Routes.REQUEST, {
          id: data.id,
          isSelfRequest: true,
        })
      },
    })
  }

  return (
    <VStack space={3} p={2} flex={1}>
      <RequestAdditionalInformationForm
        onSubmit={onSubmit}
        defaultValues={{
          monobankBucketLink: data.monobankBucketLink,
          tags: data.tags.map((tag) => tag.id),
        }}
        isLoading={isLoading}
      />
    </VStack>
  )
}
