import { Routes } from '@/constants'
import { ChatScreen, ChatsScreen } from '@/screens'
import { MainTabsParamList } from '@/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Screen, Navigator } = createNativeStackNavigator<MainTabsParamList>()

export const ChatStackNavigator = (): JSX.Element => (
  <Navigator initialRouteName={Routes.CHATS}>
    <Screen
      name={Routes.CHATS}
      component={ChatsScreen}
      options={{
        headerTitle: 'Повідомлення',
      }}
    />
    <Screen name={Routes.CHAT} component={ChatScreen} />
  </Navigator>
)
