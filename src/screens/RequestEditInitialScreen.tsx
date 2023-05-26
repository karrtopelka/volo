import { Card, Layout, RequestSkeleton } from '@/components'
import { RequestEditRoutes, Routes } from '@/constants'
import { useRequest } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Icon, VStack } from 'native-base'
import { useEffect } from 'react'

type RequestEditInitialScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.REQUEST_EDIT
>

export const RequestEditInitialScreen = ({
  route,
}: RequestEditInitialScreenProps): JSX.Element => {
  const { id } = route.params
  const { data, isLoading } = useRequest({ id })

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          variant="ghost"
          onPress={() => navigation.goBack()}
          leftIcon={
            <Icon as={MaterialIcons} name="arrow-back-ios" size="xs" mr={-1} />
          }
        >
          Назад
        </Button>
      ),
    })
  }, [])

  const handleEdit = (page: RequestEditRoutes) => {
    switch (page) {
      case RequestEditRoutes.GENERAL_INFORMATION:
        navigation.navigate(Routes.REQUEST_EDIT_GENERAL_INFORMATION, {
          data: data!,
        })
        break
      case RequestEditRoutes.CATEGORY:
        navigation.navigate(Routes.REQUEST_EDIT_CATEGORY, {
          data: data!,
        })
        break
      case RequestEditRoutes.ADDITIONAL_INFORMATION:
        navigation.navigate(Routes.REQUEST_EDIT_ADDITIONAL_INFORMATION, {
          data: data!,
        })
        break
      case RequestEditRoutes.PHOTOS:
        navigation.navigate(Routes.REQUEST_EDIT_PHOTOS, {
          data: data!,
        })
        break
      default:
        break
    }
  }

  if (isLoading) {
    return (
      <Layout justifyContent="center">
        <RequestSkeleton />
      </Layout>
    )
  }

  return (
    <Layout centered={true} bgColor="white">
      <Card
        mt={5}
        title="Редагування запиту"
        shortDescription="Виберіть категорію запиту, яку ви хочете редагувати"
      >
        <VStack space={4}>
          <Button
            size="lg"
            onPress={() => handleEdit(RequestEditRoutes.GENERAL_INFORMATION)}
          >
            Загальна інформація
          </Button>
          <Button
            size="lg"
            onPress={() => handleEdit(RequestEditRoutes.CATEGORY)}
          >
            Категорія та стан
          </Button>
          <Button
            size="lg"
            onPress={() => handleEdit(RequestEditRoutes.ADDITIONAL_INFORMATION)}
          >
            Додаткова інформація
          </Button>
          <Button
            size="lg"
            onPress={() => handleEdit(RequestEditRoutes.PHOTOS)}
          >
            Фотознимки
          </Button>
        </VStack>
      </Card>
    </Layout>
  )
}
