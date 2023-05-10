import { CardAttribute, Layout, SelectLanguage } from '@/components'
import { Card, Text } from '@ui-kitten/components'
import { VStack } from 'native-base'
import { useTranslation } from 'react-i18next'

export const NoAccessScreen = (): JSX.Element => {
  const { t } = useTranslation('errors')

  const text = t('requiredData.noAccess')!.split('. ')

  return (
    <Layout centered={true}>
      <VStack space={10}>
        <VStack space={2}>
          {text.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </VStack>
        <Card disabled={true}>
          <CardAttribute title={t('common:language')!}>
            <SelectLanguage />
          </CardAttribute>
        </Card>
      </VStack>
    </Layout>
  )
}
