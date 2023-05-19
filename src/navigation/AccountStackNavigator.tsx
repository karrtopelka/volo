import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { AccountScreen, AccountEditScreen, UserAccountScreen } from '@/screens'
import { useTranslation } from 'react-i18next'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const AccountStackNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')

  return (
    <Navigator initialRouteName={Routes.ACCOUNT}>
      <Screen
        name={Routes.ACCOUNT}
        component={AccountScreen}
        options={{ headerTitle: t('account')! }}
      />
      <Screen
        name={Routes.ACCOUNT_EDIT}
        component={AccountEditScreen}
        options={{ headerTitle: t('account_edit')! }}
      />
      <Screen
        name={Routes.USER_ACCOUNT}
        component={UserAccountScreen}
        options={{ headerTitle: t('account')! }}
      />
    </Navigator>
  )
}
