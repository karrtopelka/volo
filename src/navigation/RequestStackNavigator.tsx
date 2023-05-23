import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import {
  AccountScreen,
  RequestAddCommentScreen,
  RequestCreateScreen,
  RequestScreen,
  RequestsScreen,
} from '@/screens'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const RequestStackNavigator = (): JSX.Element => (
  <Navigator initialRouteName={Routes.REQUESTS}>
    <Screen
      name={Routes.REQUESTS}
      component={RequestsScreen}
      options={{ headerTitle: 'Мої запити' }}
    />
    <Screen
      name={Routes.REQUEST}
      component={RequestScreen}
      options={{ headerTitle: 'Запит' }}
    />
    <Screen
      name={Routes.REQUEST_ADD_COMMENT}
      component={RequestAddCommentScreen}
      options={{ headerTitle: 'Додати коментар' }}
    />
    <Screen
      name={Routes.REQUEST_CREATE}
      component={RequestCreateScreen}
      options={{ headerShown: false }}
    />
    <Screen name={Routes.ACCOUNT} component={AccountScreen} />
  </Navigator>
)
