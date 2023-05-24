import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Routes } from '@/constants'
import { FeedDonationScreen, FeedScreen, FeedSupportScreen } from '@/screens'
import { useTranslation } from 'react-i18next'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export const FeedTabsNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')

  return (
    <Navigator
      initialRouteName={Routes.FEED_ALL}
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Screen
        name={Routes.FEED_ALL}
        options={{ title: t('feed_all')! }}
        component={FeedScreen}
      />
      <Screen
        name={Routes.FEED_DONATION}
        options={{ title: t('feed_donation')! }}
        component={FeedDonationScreen}
      />
      <Screen
        name={Routes.FEED_SUPPORT}
        options={{ title: t('feed_support')! }}
        component={FeedSupportScreen}
      />
    </Navigator>
  )
}
