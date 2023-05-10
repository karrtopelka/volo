import { MainTabsParamList } from '@/types'
import {
  NavigationProp,
  ParamListBase,
  TabNavigationState,
  useNavigation,
} from '@react-navigation/native'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import { ImageProps } from 'react-native'

export type TabBarTabProps = {
  title?: string
  icon?: RenderProp<Partial<ImageProps>>
}

export type TabBarContainerProps = {
  tabs: TabBarTabProps[]
  state: TabNavigationState<ParamListBase>
}

export const BottomTabBarContainer = ({
  tabs,
  state,
}: TabBarContainerProps): JSX.Element => {
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
