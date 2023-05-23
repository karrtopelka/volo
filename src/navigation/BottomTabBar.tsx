import {
  Box,
  Center,
  HStack,
  Icon as MaterialIcon,
  Pressable,
} from 'native-base'
import { BottomTabBarProps as BottomTabBarPropsRN } from '@react-navigation/bottom-tabs'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainTabsParamList } from '@/types'
import { MaterialIcons } from '@expo/vector-icons'

type TabBarTabProps = {
  iconName: keyof typeof MaterialIcons.glyphMap
}

type TabBarContainerProps = {
  tabs: TabBarTabProps[]
}

export type BottomTabBarProps = TabBarContainerProps & BottomTabBarPropsRN

export const BottomTabBar = ({
  tabs,
  state,
}: BottomTabBarProps): JSX.Element => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()

  return (
    <Box width="100%">
      <HStack bg="gray.200" alignItems="center" safeAreaBottom shadow={6}>
        {tabs.map(({ iconName }, index) => (
          <Pressable
            key={index}
            opacity={state.index === index ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() =>
              navigation.navigate(
                state.routeNames[index] as keyof MainTabsParamList
              )
            }
          >
            <Center>
              <MaterialIcon
                as={<MaterialIcons name={iconName} />}
                color="black"
                size="lg"
              />
            </Center>
          </Pressable>
        ))}
      </HStack>
    </Box>
  )
}
