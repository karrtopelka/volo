import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Routes } from '@/constants'
import { AccountEditInterestsScreen, AccountEditScreen } from '@/screens'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export const AccountEditTabsNavigator = (): JSX.Element => (
  <Navigator initialRouteName={Routes.ACCOUNT_EDIT_PERSONAL_DATA}>
    <Screen
      name={Routes.ACCOUNT_EDIT_PERSONAL_DATA}
      component={AccountEditScreen}
      options={{ title: 'Персональні дані' }}
    />
    <Screen
      name={Routes.ACCOUNT_EDIT_INTERESTS}
      component={AccountEditInterestsScreen}
      options={{ title: 'Інтереси' }}
    />
  </Navigator>
)
