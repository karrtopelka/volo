import { Tab, TabBar } from '@ui-kitten/components'
import { TabBarContainerProps } from './BottomTabBarContainer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AllNavigatorsParamList } from '@/types'
import { Routes } from '@/constants'
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

export type TopTabBarContainerProps = TabBarContainerProps &
  MaterialTopTabBarProps

export const TopTabBarContainer = ({
  tabs,
  state,
}: TopTabBarContainerProps) => {
  const navigation = useNavigation<NavigationProp<AllNavigatorsParamList>>()

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) =>
        navigation.navigate(state.routeNames[index] as Routes)
      }
      style={{ height: 50 }}
    >
      {tabs.map((tab, index) => (
        <Tab key={index} title={tab.title} icon={tab.icon} />
      ))}
    </TabBar>
  )
}
