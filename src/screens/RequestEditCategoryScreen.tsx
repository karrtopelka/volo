import { Routes } from '@/constants'
import { RequestCategoryForm, RequestCreateCategoryFormData } from '@/features'
import { useMutationWrapper, usePatchRequest } from '@/hooks'
import { MainTabsParamList, RequestStatus, RequestType } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { VStack } from 'native-base'

type RequestEditCategoryScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_EDIT_CATEGORY
>

export const RequestEditCategoryScreen = ({
  route,
}: RequestEditCategoryScreenProps): JSX.Element => {
  const { data } = route.params

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { mutateAsync: updateCategory, isLoading } = useMutationWrapper(
    usePatchRequest.bind(null, data.id)
  )

  const onSubmit = async (newData: RequestCreateCategoryFormData) => {
    const formattedData = {
      ...newData,
      categoryId: Number(newData.categoryId),
      type: newData.type as RequestType,
      status: newData.status as RequestStatus,
    }

    await updateCategory(formattedData, {
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
      <RequestCategoryForm
        onSubmit={onSubmit}
        defaultValues={{
          categoryId: data.categoryId.toString(),
          type: data.type,
          status: data.status,
        }}
        isLoading={isLoading}
      />
    </VStack>
  )
}
