import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Routes } from '@/constants'
import {
  FeedFinancialScreen,
  FeedScreen,
  FeedCollectionScreen,
  FeedMaterialScreen,
  FeedThingsScreen,
} from '@/screens'
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
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 120 },
      }}
    >
      <Screen
        name={Routes.FEED_ALL}
        options={{ title: t('feed_all')! }}
        component={FeedScreen}
      />
      <Screen
        name={Routes.FEED_FINANCIAL}
        options={{ title: t('feed_financial')! }}
        component={FeedFinancialScreen}
      />
      <Screen
        name={Routes.FEED_SUPPORT}
        options={{ title: t('feed_collection')! }}
        component={FeedCollectionScreen}
      />
      <Screen
        name={Routes.FEED_MATERIAL}
        options={{ title: t('feed_material')! }}
        component={FeedMaterialScreen}
      />
      <Screen
        name={Routes.FEED_THINGS}
        options={{ title: t('feed_things')! }}
        component={FeedThingsScreen}
      />
    </Navigator>
  )
}
