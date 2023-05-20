import { MainTabsParamList } from '@/types'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import { ImageProps } from 'react-native'

export type TabBarTabProps = {
  title?: string
  icon?: RenderProp<Partial<ImageProps>>
}

export type TabBarContainerProps = {
  tabs: TabBarTabProps[]
}

export type BottomTabBarContainerProps = TabBarContainerProps &
  BottomTabBarProps

export const BottomTabBarContainer = ({
  tabs,
  state,
}: BottomTabBarContainerProps): JSX.Element | null => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  return (
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ height: 75, borderTopWidth: 1, borderTopColor: '#E4E9F2' }}
    >
      {tabs.map((tab, index) => (
        <BottomNavigationTab key={index} title={tab.title} icon={tab.icon} />
      ))}
    </BottomNavigation>
  )
}
