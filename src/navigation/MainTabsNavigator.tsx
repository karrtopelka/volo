import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { FeedTabsNavigator } from './FeedTabsNavigator'
import { useTranslation } from 'react-i18next'
import { AccountStackNavigator } from './AccountStackNavigator'
import { RequestStackNavigator } from './RequestStackNavigator'
import { ChatStackNavigator } from './ChatStackNavigator'
import { useEffect, useState } from 'react'
import { socketUser } from '@/utils'
import { useMe } from '@/hooks'
import { useOnlineUsers } from '@/contexts'
import { BottomTabBar } from './BottomTabBar'
import { RequestCreateStackNavigator } from './RequestCreateStackNavigator'
import { AppState, AppStateStatus } from 'react-native'

const { Screen, Navigator } = createBottomTabNavigator<MainTabsParamList>()

export const MainTabsNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')
  const { data: me } = useMe()
  const { updateUserIds } = useOnlineUsers()

  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const appState = AppState.addEventListener('change', _handleAppStateChange)

    socketUser.on('users', (data) => {
      if (!Array.isArray(data[0])) {
        updateUserIds(data)
      }
    })

    socketUser.emit('check-in', me!.id)

    return () => {
      appState.remove()
      socketUser.off('users')
    }
  }, [])

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState === 'active' && nextAppState.match(/inactive|background/)) {
      socketUser.emit('check-out', me!.id)
    } else if (
      appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      socketUser.emit('check-in', me!.id)
    }
    setAppState(nextAppState)
  }

  return (
    <Navigator
      tabBar={(props) => (
        <BottomTabBar
          tabs={[
            { iconName: 'home' },
            { iconName: 'request-page' },
            { iconName: 'add-circle' },
            { iconName: 'chat' },
            { iconName: 'person' },
            // { icon: NotificationIcon },
          ]}
          {...props}
        />
      )}
    >
      <Screen
        name={Routes.FEED}
        component={FeedTabsNavigator}
        options={{ title: t('feed')! }}
      />
      <Screen
        name={Routes.REQUEST_NAVIGATOR}
        component={RequestStackNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name={Routes.REQUEST_CREATE_NAVIGATOR}
        component={RequestCreateStackNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name={Routes.CHAT_NAVIGATOR}
        component={ChatStackNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name={Routes.ACCOUNT_NAVIGATOR}
        component={AccountStackNavigator}
        options={{ headerShown: false }}
      />

      {/*
      <Screen
        name={Routes.ACCOUNT_NAVIGATOR}
        component={AccountStackNavigator}
        options={{ headerShown: false }}
      /> */}
    </Navigator>
  )
}
