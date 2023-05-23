import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { AccountScreen, AccountEditScreen } from '@/screens'
import { useTranslation } from 'react-i18next'
import { useMe } from '@/hooks'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const AccountStackNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')
  const { data: me } = useMe()

  return (
    <Navigator initialRouteName={Routes.ACCOUNT}>
      <Screen
        name={Routes.ACCOUNT}
        component={AccountScreen}
        options={{ headerTitle: t('account')! }}
        initialParams={{ id: me?.id }}
      />
      <Screen
        name={Routes.ACCOUNT_EDIT}
        component={AccountEditScreen}
        options={{ headerTitle: t('account_edit')! }}
      />
      <Screen
        name={Routes.ACCOUNT_VIEW}
        component={AccountScreen}
        options={{ headerTitle: t('account')! }}
      />
    </Navigator>
  )
}
