import { Routes } from '@/constants'
import {
  RequestCreateAdditionalInformationScreen,
  RequestCreateCategoryScreen,
  RequestCreateGeneralInformationScreen,
  RequestCreateInitialScreen,
  RequestCreatePhotosScreen,
} from '@/screens'
import { MainTabsParamList } from '@/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const RequestCreateStackNavigator = (): JSX.Element => (
  <Navigator initialRouteName={Routes.REQUEST_CREATE_INITIAL}>
    <Screen
      name={Routes.REQUEST_CREATE_INITIAL}
      component={RequestCreateInitialScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name={Routes.REQUEST_CREATE_GENERAL_INFORMATION}
      component={RequestCreateGeneralInformationScreen}
      options={{
        headerTitle: 'Загальна інформація',
      }}
    />
    <Screen
      name={Routes.REQUEST_CREATE_CATEGORY}
      component={RequestCreateCategoryScreen}
      options={{
        headerTitle: 'Категорія',
      }}
    />
    <Screen
      name={Routes.REQUEST_CREATE_PHOTOS}
      component={RequestCreatePhotosScreen}
      options={{
        headerTitle: 'Фотознимки',
      }}
    />
    <Screen
      name={Routes.REQUEST_CREATE_ADDITIONAL_INFORMATION}
      component={RequestCreateAdditionalInformationScreen}
      options={{
        headerTitle: 'Додаткова інформація',
      }}
    />
  </Navigator>
)
