import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { RequestScreen } from '@/screens'
import { RequestEditStackNavigator } from './RequestEditStackNavigator'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const RequestInfoStackNavigator = (): JSX.Element => (
  <Navigator initialRouteName={Routes.REQUEST}>
    <Screen
      name={Routes.REQUEST}
      component={RequestScreen}
      options={{ headerTitle: 'Запит' }}
    />
    <Screen
      name={Routes.REQUEST_EDIT_NAVIGATOR}
      component={RequestEditStackNavigator}
      options={{ headerShown: false }}
    />
  </Navigator>
)
