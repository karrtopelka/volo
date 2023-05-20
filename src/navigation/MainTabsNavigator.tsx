import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabsParamList } from '@/types'
import { Routes } from '@/constants'
import { BottomTabBarContainer } from './BottomTabBarContainer'
import { Icon, IconProps } from '@ui-kitten/components'
import { FeedTabsNavigator } from './FeedTabsNavigator'
import { useTranslation } from 'react-i18next'
import { AccountStackNavigator } from './AccountStackNavigator'
import { RequestStackNavigator } from './RequestStackNavigator'
import { RequestCreateScreen } from '@/screens'
import { ChatStackNavigator } from './ChatStackNavigator'
import { useEffect } from 'react'
import { socketUser } from '@/utils'
import { useMe } from '@/hooks'
import { useOnlineUsers } from '@/contexts'

const { Screen, Navigator } = createBottomTabNavigator<MainTabsParamList>()

export const HomeIcon = (props: IconProps) => (
  <Icon style={{ width: 28, height: 28 }} name="home-outline" {...props} />
)

export const RequestIcon = (props: IconProps) => (
  <Icon
    style={{ width: 28, height: 28 }}
    name="shopping-bag-outline"
    {...props}
  />
)

export const AccountIcon = (props: IconProps) => (
  <Icon style={{ width: 28, height: 28 }} name="person-outline" {...props} />
)

export const MessageIcon = (props: IconProps) => (
  <Icon
    style={{ width: 28, height: 28 }}
    name="message-square-outline"
    {...props}
  />
)

// export const NotificationIcon = (props: IconProps) => (
//   <Icon style={{ width: 28, height: 28 }} name="bell-outline" {...props} />
// )

export const AddIcon = (props: IconProps) => (
  <Icon
    style={{ width: 28, height: 28 }}
    name="plus-circle-outline"
    {...props}
  />
)

export const MainTabsNavigator = (): JSX.Element => {
  const { t } = useTranslation('tabs')
  const { data: me } = useMe()
  const { updateUserIds } = useOnlineUsers()

  useEffect(() => {
    socketUser.on('users', (data) => {
      if (!Array.isArray(data[0])) {
        updateUserIds(data)
      }
    })

    socketUser.emit('check-in', me!.id)

    return () => {
      socketUser.off('users')
    }
  }, [])

  return (
    <Navigator
      tabBar={(props) => (
        <BottomTabBarContainer
          tabs={[
            { icon: HomeIcon },
            { icon: RequestIcon },
            { icon: AddIcon },
            { icon: MessageIcon },
            { icon: AccountIcon },
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
        name={Routes.REQUEST_CREATE}
        component={RequestCreateScreen}
        initialParams={{ id: undefined }}
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
