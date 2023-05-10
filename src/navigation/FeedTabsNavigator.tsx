import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { TopTabBarContainer } from './TopTabBarContainer'
import { Routes } from '@/constants'
import { FeedDonationScreen, FeedScreen, FeedSupportScreen } from '@/screens'
import { useTranslation } from 'react-i18next'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export const FeedTabsNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')

  return (
    <Navigator
      tabBar={({ state }) => (
        <TopTabBarContainer
          tabs={[
            { title: t('feed_all')! },
            { title: t('feed_donation')! },
            { title: t('feed_support')! },
          ]}
          state={state}
        />
      )}
      initialRouteName={Routes.FEED_ALL}
    >
      <Screen name={Routes.FEED_ALL} component={FeedScreen} />
      <Screen name={Routes.FEED_DONATION} component={FeedDonationScreen} />
      <Screen name={Routes.FEED_SUPPORT} component={FeedSupportScreen} />
    </Navigator>
  )
}
