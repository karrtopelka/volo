import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import {
  RequestAddCommentScreen,
  RequestCreateScreen,
  RequestScreen,
  RequestsScreen,
} from '@/screens'
import { useTranslation } from 'react-i18next'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const RequestStackNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')

  return (
    <Navigator initialRouteName={Routes.MY_REQUESTS}>
      <Screen
        name={Routes.MY_REQUESTS}
        component={RequestsScreen}
        options={{ headerTitle: t('my_requests')! }}
      />
      <Screen
        name={Routes.REQUEST}
        component={RequestScreen}
        options={{ headerTitle: t('request')! }}
      />
      <Screen
        name={Routes.REQUEST_ADD_COMMENT}
        component={RequestAddCommentScreen}
        options={{ headerTitle: t('request_add_comment')! }}
      />
      <Screen
        name={Routes.REQUEST_CREATE}
        component={RequestCreateScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}
