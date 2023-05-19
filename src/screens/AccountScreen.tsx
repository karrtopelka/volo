import { CardAttribute, Layout, SelectLanguage } from '@/components'
import { Routes } from '@/constants'
import { AccountInformation, MyRequests } from '@/features'
import MyReviews from '@/features/account/MyReviews/MyReviews'
import { useAuthContext, useMe } from '@/hooks'
import { MainTabsParamList } from '@/types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Button, Card, Text } from '@ui-kitten/components'
import { Box, HStack, ScrollView, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'

export const AccountScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<MainTabsParamList>>()
  const { t } = useTranslation('account')
  const { logout } = useAuthContext()
  const { data, isLoading } = useMe()

  const handleAccountEditPress = () =>
    navigation.navigate(Routes.ACCOUNT_EDIT, { user: data! })

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
                <Text category="h4">{t('title')!}</Text>
                <Button appearance="ghost" onPress={handleAccountEditPress}>
                  {t('common:edit')!}
                </Button>
              </HStack>
            }
          >
            <AccountInformation data={data} isLoading={isLoading} />
          </Card>
          <Card
            disabled
            header={
              <Box>
                <Text category="h4">{t('requests')!}</Text>
              </Box>
            }
          >
            <MyRequests />
          </Card>
          <Card
            disabled
            header={
              <Box>
                <Text category="h4">{t('reviews')!}</Text>
              </Box>
            }
          >
            {data?.receivedReviews ? (
              <MyReviews reviews={data.receivedReviews} />
            ) : (
              <Text>Немає відгуків</Text>
            )}
          </Card>
          <Card disabled>
            <CardAttribute title={t('common:language')!}>
              <SelectLanguage />
            </CardAttribute>
          </Card>
        </VStack>
        <Button onPress={logout}>{t('auth:logOut')!}</Button>
      </Layout>
    </ScrollView>
  )
}
