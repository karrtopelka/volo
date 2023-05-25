import { StepperContainer } from '@/components'
import { Routes } from '@/constants'
import {
  RequestAdditionalInformationForm,
  RequestCreateAdditionalInformationFormData,
} from '@/features'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { VStack } from 'native-base'

type RequestCreateAdditionalInformationScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION
>

export const RequestCreateAdditionalInformationScreen = ({
  route,
}: RequestCreateAdditionalInformationScreenProps): JSX.Element => {
  const { data: requestInformationData } = route.params
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const onSubmit = async (data: RequestCreateAdditionalInformationFormData) => {
    const formattedData = {
      ...requestInformationData,
      ...data,
    }

    navigation.navigate(Routes.REQUEST_CREATE_PHOTOS, {
      data: formattedData,
    })
  }

  return (
    <VStack space={3} p={2} flex={1}>
      <StepperContainer
        numberOfSteps={4}
        currentStep={3}
        title="Додаткова інформація"
      />
      <RequestAdditionalInformationForm onSubmit={onSubmit} />
    </VStack>
  )
}
