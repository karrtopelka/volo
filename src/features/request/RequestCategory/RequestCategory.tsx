import { CardAttribute } from '@/components'
import { Category } from '@/types'
import { VStack } from 'native-base'
import { useTranslation } from 'react-i18next'
import { Card, Text } from '@ui-kitten/components'

export type RequestCategoryProps = {
  category: Category
}

export const RequestCategory = ({
  category,
}: RequestCategoryProps): JSX.Element => {
  const { i18n } = useTranslation()
  const { nameUk, nameEn, descriptionUk, descriptionEn } = category

  return (
    <CardAttribute title="Category">
      <VStack space={1}>
        <Text category="h6">{i18n.language === 'uk' ? nameUk : nameEn}</Text>
        <Card status="info" disabled={true}>
          <Text category="c2">
            {i18n.language === 'uk' ? descriptionUk : descriptionEn}
          </Text>
        </Card>
      </VStack>
    </CardAttribute>
  )
}
