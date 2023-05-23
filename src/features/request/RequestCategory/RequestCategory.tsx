import { CardAttribute, Card } from '@/components'
import { Category } from '@/types'
import { VStack, Heading } from 'native-base'
import { useTranslation } from 'react-i18next'

export type RequestCategoryProps = {
  category: Category
}

export const RequestCategory = ({
  category,
}: RequestCategoryProps): JSX.Element => {
  const { i18n } = useTranslation()
  const { nameUk, nameEn, descriptionUk, descriptionEn } = category

  return (
    <CardAttribute title="Категорія">
      <VStack space={1}>
        <Heading variant="xs">
          {i18n.language === 'uk' ? nameUk : nameEn}
        </Heading>
        <Card status="info" sectionsPadding="12px 24px">
          <>{i18n.language === 'uk' ? descriptionUk : descriptionEn}</>
        </Card>
      </VStack>
    </CardAttribute>
  )
}
