import { CardAttribute, Layout, SelectLanguage } from '@/components'
import { Routes } from '@/constants'
import { AccountInformation, MyRequests } from '@/features'
import MyReviews from '@/features/account/MyReviews/MyReviews'
import { useUser } from '@/hooks/api/useUser'
import { MainTabsParamList } from '@/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Card, Text } from '@ui-kitten/components'
import { Box, HStack, ScrollView, VStack } from 'native-base'
import { useTranslation } from 'react-i18next'

type UserAccountScreenProps = NativeStackScreenProps<
  MainTabsParamList,
  Routes.USER_ACCOUNT
>

export const UserAccountScreen = ({
  route,
}: UserAccountScreenProps): JSX.Element => {
  const { t } = useTranslation('account')
  const { id } = route.params
  const { data, isLoading } = useUser({ id })

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
      </Layout>
    </ScrollView>
  )
}