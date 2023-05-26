import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import {
  RequestCreateGeneralInformationFormData,
  RequestGeneralInformationForm,
} from '@/features'
import { VStack } from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useMutationWrapper, usePatchRequest } from '@/hooks'

type RequestEditGeneralInformationScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_EDIT_GENERAL_INFORMATION
>

export const RequestEditGeneralInformationScreen = ({
  route,
}: RequestEditGeneralInformationScreenProps): JSX.Element => {
  const { data } = route.params

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { mutateAsync: updateGeneralInformation, isLoading } =
    useMutationWrapper(usePatchRequest.bind(null, data.id))

  const onSubmit = async (newData: RequestCreateGeneralInformationFormData) => {
    const formattedData = {
      ...newData,
      totalCollected: Number(newData.totalCollected),
      goalAmount: Number(newData.goalAmount),
    }

    await updateGeneralInformation(formattedData, {
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
      <RequestGeneralInformationForm
        onSubmit={onSubmit}
        defaultValues={{
          title: data.title,
          description: data.description,
          totalCollected: data.totalCollected
            ? data.totalCollected.toString()
            : null,
          goalAmount: data.goalAmount ? data.goalAmount.toString() : null,
        }}
        isLoading={isLoading}
      />
    </VStack>
  )
}
