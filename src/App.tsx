import Providers from './contexts/Providers'
import { registerRootComponent } from 'expo'
import { RootNavigator } from './navigation'
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]) // Ignore the specific warning

import './setupDayjs'
import './i18n'

import 'intl-pluralrules'

if (__DEV__) {
  import('../reactotron-config')
}

const App = () => (
  <Providers>
    <RootNavigator />
  </Providers>
)

registerRootComponent(App)
