import { Card, Layout, SelectLanguageContainer } from '@/components'
import { Routes } from '@/constants'
import { AccountInformation, AccountRequestsContainer } from '@/features'
import MyReviews from '@/features/account/MyReviews/MyReviews'
import { useAuthContext, useMe } from '@/hooks'
import { useUser } from '@/hooks/api/useUser'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, ScrollView, Spinner, VStack } from 'native-base'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type AccountScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.ACCOUNT | Routes.ACCOUNT_VIEW
>

export const AccountScreen = ({ route }: AccountScreenProps): JSX.Element => {
  const { id } = route.params
  const { data: me } = useMe()
  const isOwnAccount = me?.id === id

  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { t } = useTranslation('account')
  const { logout } = useAuthContext()
  const { data: guestUser, isLoading: isGuestUserLoading } = useUser({
    id: isOwnAccount ? undefined : id,
  })

  const handleAccountEditPress = () =>
    navigation.navigate(Routes.ACCOUNT_EDIT_NAVIGATOR)

  useEffect(() => {
    if (!isOwnAccount) {
      navigation.setOptions({
        title: guestUser?.name ?? guestUser?.email ?? 'Акаунт користувача',
      })
    }

    return () => {
      navigation.setOptions({
        title: 'Акаунт',
      })
    }
  }, [id])

  const data = isOwnAccount ? me : guestUser

  if (!isOwnAccount && isGuestUserLoading) {
    return (
      <Layout centered={true}>
        <Spinner size="sm" />
      </Layout>
    )
  }

  return (
    <ScrollView nestedScrollEnabled={true}>
      <VStack space={5} p={3}>
        <VStack space={5}>
          <Card
            title={t('personalData')!}
            titleAction={
              isOwnAccount && (
                <Button variant="ghost" onPress={handleAccountEditPress}>
                  {t('common:edit')!}
                </Button>
              )
            }
          >
            <AccountInformation
              data={data}
              isLoading={!isOwnAccount && isGuestUserLoading}
            />
          </Card>
          <Card title={t('requests')!}>
            <AccountRequestsContainer userId={data?.id} />
          </Card>
          {!!data?.receivedReviews.length && (
            <Card title={t('reviews')!}>
              <MyReviews reviews={data.receivedReviews} />
            </Card>
          )}
          <SelectLanguageContainer />
        </VStack>
        {isOwnAccount && <Button onPress={logout}>{t('auth:logOut')!}</Button>}
      </VStack>
    </ScrollView>
  )
}
