import { Request } from '@/types'
import { HStack, VStack, Icon, Text, Heading, Divider } from 'native-base'
import { RequestCategory } from '../RequestCategory'
import { RequestCollectedAmount } from '../RequestCollectedAmount'
import { Card, CardAttribute, Tag } from '@/components'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'

export type RequestGeneralInformationProps = {
  data: Request
}

export const RequestGeneralInformation = ({
  data,
}: RequestGeneralInformationProps): JSX.Element => {
  const { i18n } = useTranslation()

  return (
    <Card
      title="Загальна інформація"
      titleAction={
        <HStack space={1} alignItems="center">
          <Icon
            as={MaterialIcons}
            name="visibility"
            color="gray.400"
            size="sm"
          />
          <Heading size="xs" color="gray.400">
            {data.viewsCount}
          </Heading>
        </HStack>
      }
    >
      <VStack space={5}>
        <Text>{data.description}</Text>
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
              <Tag
                key={tag.id}
                name={i18n.language === 'uk' ? tag.nameUk : tag.nameEn}
              />
            ))}
          </HStack>
        </CardAttribute>
      </VStack>
    </Card>
  )
}
