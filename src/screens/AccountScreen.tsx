import { CardAttribute, Layout, SelectLanguage } from '@/components'
import { Routes } from '@/constants'
import { AccountInformation, AccountRequestsContainer } from '@/features'
import MyReviews from '@/features/account/MyReviews/MyReviews'
import { useAuthContext, useMe } from '@/hooks'
import { useUser } from '@/hooks/api/useUser'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Card, Text } from '@ui-kitten/components'
import { Box, HStack, ScrollView, Spinner, VStack } from 'native-base'
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
    navigation.navigate(Routes.ACCOUNT_EDIT, { user: me! })

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
    <ScrollView>
      <Layout
        style={{
          flex: 1,
          justifyContent: 'space-between',
          gap: 12,
          padding: 12,
        }}
      >
        <VStack space={5}>
          <Card
            disabled
            header={
              <HStack justifyContent="space-between">
                <Text category="h4">{t('personalData')!}</Text>
                {isOwnAccount && (
                  <Button appearance="ghost" onPress={handleAccountEditPress}>
                    {t('common:edit')!}
                  </Button>
                )}
              </HStack>
            }
          >
            <AccountInformation
              data={data}
              isLoading={!isOwnAccount && isGuestUserLoading}
            />
          </Card>
          <Card
            disabled
            header={
              <Box>
                <Text category="h4">{t('requests')!}</Text>
              </Box>
            }
          >
            <AccountRequestsContainer userId={data?.id} />
          </Card>
          {!!data?.receivedReviews.length && (
            <Card
              disabled
              header={
                <Box>
                  <Text category="h4">{t('reviews')!}</Text>
                </Box>
              }
            >
              <MyReviews reviews={data.receivedReviews} />
            </Card>
          )}
          <Card disabled>
            <CardAttribute title={t('common:language')!}>
              <SelectLanguage />
            </CardAttribute>
          </Card>
        </VStack>
        {isOwnAccount && <Button onPress={logout}>{t('auth:logOut')!}</Button>}
      </Layout>
    </ScrollView>
  )
}
