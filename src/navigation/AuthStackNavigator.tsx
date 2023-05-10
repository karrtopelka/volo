import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@/types'
import { Routes } from '@/constants'
import { LoginScreen, RegisterScreen } from '@/screens'

const { Screen, Navigator } = createNativeStackNavigator<AuthStackParamList>()

export const AuthStackNavigator = (): JSX.Element => (
  <Navigator
    initialRouteName={Routes.LOGIN}
    screenOptions={{ headerShown: false }}
  >
    <Screen name={Routes.LOGIN} component={LoginScreen} />
    <Screen name={Routes.REGISTER} component={RegisterScreen} />
  </Navigator>
)
