import { ReactChildren } from '@/types'
import { AsyncStorageProvider } from './AsyncStorageContext'
import { ReactQueryContext } from './ReactQueryContext'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { default as theme } from '../../theme_dark_gray.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/utils'
import { ApiProvider } from './ApiContext'
import { AuthProvider } from './AuthContext'
import { NativeBaseProvider } from 'native-base'
import { SupabaseProvider } from './SupabaseContext'

const Providers = ({ children }: ReactChildren) => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NativeBaseProvider>
        <AsyncStorageProvider>
          <ReactQueryContext>
            <SupabaseProvider>
              <NavigationContainer ref={navigationRef}>
                <ApiProvider>
                  <AuthProvider>{children}</AuthProvider>
                </ApiProvider>
              </NavigationContainer>
            </SupabaseProvider>
          </ReactQueryContext>
        </AsyncStorageProvider>
      </NativeBaseProvider>
    </ApplicationProvider>
  </>
)

export default Providers
