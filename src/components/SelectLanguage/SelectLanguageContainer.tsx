import { Card } from '../Card'
import { SelectLanguage } from './SelectLanguage'
import { useTranslation } from 'react-i18next'

export const SelectLanguageContainer = (): JSX.Element => {
  const { t } = useTranslation('common')

  return (
    <Card title={t('common:language')!}>
      <SelectLanguage />
    </Card>
  )
}
