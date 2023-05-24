import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import {
  AccountScreen,
  CreateChatScreen,
  RequestAddCommentScreen,
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
    {/* <Screen
      name={Routes.REQUEST_CREATE}
      component={RequestCreateScreen}
      options={{ headerShown: false }}
    /> */}
    <Screen
      name={Routes.ACCOUNT}
      component={AccountScreen}
      options={{ headerTitle: 'Автор запиту' }}
    />
    <Screen
      name={Routes.ACCOUNT_VIEW}
      component={AccountScreen}
      options={{ headerTitle: 'Коментатор' }}
    />
    <Screen
      name={Routes.CREATE_CHAT}
      component={CreateChatScreen}
      options={{ headerTitle: 'Новий чат' }}
    />
  </Navigator>
)
