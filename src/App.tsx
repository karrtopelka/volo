import Providers from './contexts/Providers'
import { registerRootComponent } from 'expo'
import { RootNavigator } from './navigation'
import { LogBox } from 'react-native'
import { preventAutoHideAsync } from 'expo-splash-screen'

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]) // Ignore the specific warning

import './setupDayjs'
import './i18n'

import 'intl-pluralrules'
import { useEffect } from 'react'

if (__DEV__) {
  import('../reactotron-config')
}

const App = () => {
  useEffect(() => {
    preventAutoHideAsync()
  }, [])

  return (
    <Providers>
      <RootNavigator />
    </Providers>
  )
}

registerRootComponent(App)
