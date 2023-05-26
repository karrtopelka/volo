import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import {
  RequestCreateGeneralInformationFormData,
  RequestGeneralInformationForm,
} from '@/features'
import { VStack } from 'native-base'
import { StepperContainer } from '@/components'

export const RequestCreateGeneralInformationScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const onSubmit = (data: RequestCreateGeneralInformationFormData) => {
    navigation.navigate(Routes.REQUEST_CREATE_CATEGORY, {
      data,
    })
  }

  return (
    <VStack space={3} p={2} flex={1}>
      <StepperContainer
        numberOfSteps={4}
        currentStep={1}
        title="Основна інформація"
      />
      <RequestGeneralInformationForm onSubmit={onSubmit} />
    </VStack>
  )
}
