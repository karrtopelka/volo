import { ReactChildren } from '@/types'
import { AsyncStorageProvider } from './AsyncStorageContext'
import { ReactQueryContext } from './ReactQueryContext'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/utils'
import { ApiProvider } from './ApiContext'
import { AuthProvider } from './AuthContext'
import { NativeBaseProvider } from 'native-base'
import { SupabaseProvider } from './SupabaseContext'
import { OnlineUsersContextProvider } from './OnlineUsersContext'

const Providers = ({ children }: ReactChildren) => (
  <>
    <NativeBaseProvider>
      <AsyncStorageProvider>
        <ReactQueryContext>
          <SupabaseProvider>
            <NavigationContainer ref={navigationRef}>
              <ApiProvider>
                <AuthProvider>
                  <OnlineUsersContextProvider>
                    {children}
                  </OnlineUsersContextProvider>
                </AuthProvider>
              </ApiProvider>
            </NavigationContainer>
          </SupabaseProvider>
        </ReactQueryContext>
      </AsyncStorageProvider>
    </NativeBaseProvider>
  </>
)

export default Providers
