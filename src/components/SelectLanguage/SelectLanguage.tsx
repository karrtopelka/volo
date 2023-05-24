import { LANGUAGES } from '@/constants'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Select, ChevronDownIcon } from 'native-base'

export const SelectLanguage = () => {
  const { i18n } = useTranslation('common')
  const [selectedLanguageCode, setSelectedLanguageCode] = useState(
    i18n.language
  )

  const handleChangeLanguage = (language: string): void => {
    setSelectedLanguageCode(language)
    i18n.changeLanguage(language)
    dayjs.locale(language)
  }

  return (
    <Select
      selectedValue={selectedLanguageCode}
      onValueChange={(itemValue) => handleChangeLanguage(itemValue)}
      _selectedItem={{
        endIcon: <ChevronDownIcon size="5" />,
      }}
      w="full"
      h={12}
    >
      {LANGUAGES.map(({ title, code }) => (
        <Select.Item key={title} label={title} value={code} />
      ))}
    </Select>
  )
}
