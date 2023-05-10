import { Request } from '@/types'
import { Card, Text, Divider, IconElement, Icon } from '@ui-kitten/components'
import { Center, HStack, VStack } from 'native-base'
import { RequestCategory } from '../RequestCategory'
import { RequestCollectedAmount } from '../RequestCollectedAmount'
import { CardAttribute } from '@/components'
import { useTranslation } from 'react-i18next'

export type RequestGeneralInformationProps = {
  data: Request
}

const EyeIcon = (): IconElement => (
  <Icon style={{ width: 20, height: 20 }} fill="gray" name="eye-outline" />
)

export const RequestGeneralInformation = ({
  data,
}: RequestGeneralInformationProps): JSX.Element => {
  const { i18n } = useTranslation()

  return (
    <Card
      disabled={true}
      header={
        <HStack justifyContent="space-between" alignItems="center">
          <Text category="h4">Загальна інформація</Text>
          <HStack space={1} alignItems="center">
            <EyeIcon />
            <Text category="s1" style={{ color: 'gray' }}>
              {data.viewsCount}
            </Text>
          </HStack>
        </HStack>
      }
    >
      <VStack space={5}>
        <Text category="p1">{data.description}</Text>
        <Divider />
        <RequestCollectedAmount
          totalCollected={data.totalCollected}
          goalAmount={data.goalAmount}
        />
        <RequestCategory category={data.category} />
        <Divider />
        <CardAttribute title="Теги">
          <HStack space={2} flexWrap="wrap">
            {data.tags.map((tag) => (
              <Center
                key={tag.id}
                backgroundColor="gray.300"
                p={2}
                px={4}
                my={1}
                borderRadius={4}
                _text={{ color: 'gray.600' }}
              >
                {i18n.language === 'uk' ? tag.nameUk : tag.nameEn}
              </Center>
            ))}
          </HStack>
        </CardAttribute>
      </VStack>
    </Card>
  )
}
