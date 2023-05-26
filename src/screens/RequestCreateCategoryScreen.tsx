import { StepperContainer } from '@/components'
import { Routes } from '@/constants'
import { RequestCategoryForm, RequestCreateCategoryFormData } from '@/features'
import { MainTabsParamList, RequestStatus, RequestType } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { VStack } from 'native-base'

type RequestCreateCategoryScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_CREATE_CATEGORY
>

export const RequestCreateCategoryScreen = ({
  route,
}: RequestCreateCategoryScreenProps): JSX.Element => {
  const { data: generalInformationData } = route.params
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  const onSubmit = (data: RequestCreateCategoryFormData) => {
    const formattedData = {
      ...generalInformationData,
      ...data,
      status: data.status as RequestStatus,
      type: data.type as RequestType,
    }

    navigation.navigate(Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION, {
      data: formattedData,
    })
  }

  return (
    <VStack space={3} p={2} flex={1}>
      <StepperContainer
        numberOfSteps={4}
        currentStep={2}
        title="Стан та категорія"
      />
      <RequestCategoryForm onSubmit={onSubmit} />
    </VStack>
  )
}
