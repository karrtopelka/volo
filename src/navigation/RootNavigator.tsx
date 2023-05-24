import { Routes } from '@/constants'
import { RootStackParamList } from '@/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainTabsNavigator } from './MainTabsNavigator'
import { useAuthContext } from '@/hooks'
import { Layout } from '@/components'
import { AuthStackNavigator } from './AuthStackNavigator'
import { useEffect, useState } from 'react'
import { NoAccessScreen } from '@/screens'
import {
  NetworkStateType,
  getNetworkStateAsync,
  NetworkState,
} from 'expo-network'
import { Spinner } from 'native-base'

const { Screen, Navigator } = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  const { isLoggedIn } = useAuthContext()
  const [networkState, setNetworkState] = useState<NetworkState | null>(null)

  const getNetworkState = async () => {
    const state = await getNetworkStateAsync()

    setNetworkState(state)
  }

  useEffect(() => {
    getNetworkState()
  }, [])

  if (isLoggedIn === undefined || networkState === null) {
    return (
      <Layout centered={true}>
        <Spinner />
      </Layout>
    )
  }

  return (
    <Navigator>
      {networkState.type === NetworkStateType.VPN ? (
        <Screen
          name={Routes.NO_ACCESS}
          component={NoAccessScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          {isLoggedIn ? (
            <Screen
              name={Routes.MAIN_NAVIGATOR}
              component={MainTabsNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Screen
              name={Routes.AUTH_NAVIGATOR}
              component={AuthStackNavigator}
              options={{ headerShown: false }}
            />
          )}
        </>
      )}
    </Navigator>
  )
}
