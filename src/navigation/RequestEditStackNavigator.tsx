import { Routes } from '@/constants'
import {
  RequestEditAdditionalInformationScreen,
  RequestEditCategoryScreen,
  RequestEditGeneralInformationScreen,
  RequestEditInitialScreen,
  RequestEditPhotosScreen,
} from '@/screens'
import { MainTabsParamList } from '@/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const RequestEditStackNavigator = (): JSX.Element => (
  <Navigator initialRouteName={Routes.REQUEST_EDIT}>
    <Screen
      name={Routes.REQUEST_EDIT}
      component={RequestEditInitialScreen}
      options={{
        headerTitle: '',
      }}
    />
    <Screen
      name={Routes.REQUEST_EDIT_GENERAL_INFORMATION}
      component={RequestEditGeneralInformationScreen}
      options={{
        headerTitle: 'Загальна інформація',
      }}
    />
    <Screen
      name={Routes.REQUEST_EDIT_CATEGORY}
      component={RequestEditCategoryScreen}
      options={{
        headerTitle: 'Категорія',
      }}
    />
    <Screen
      name={Routes.REQUEST_EDIT_ADDITIONAL_INFORMATION}
      component={RequestEditAdditionalInformationScreen}
      options={{
        headerTitle: 'Додаткова інформація',
      }}
    />
    <Screen
      name={Routes.REQUEST_EDIT_PHOTOS}
      component={RequestEditPhotosScreen}
      options={{
        headerTitle: 'Фотознимки',
      }}
    />
  </Navigator>
)
