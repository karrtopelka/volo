import { LANGUAGES } from '@/constants'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const SelectLanguage = () => {
  const { i18n } = useTranslation('common')

  const [selectedIndex, setSelectedIndex] = useState(
    new IndexPath(i18n.languages.findIndex((item) => item === i18n.language))
  )

  const changeLanguage = (language: IndexPath) => {
    setSelectedIndex(language as IndexPath)
    i18n.changeLanguage(LANGUAGES[language.row].code)
    dayjs.locale(LANGUAGES[language.row].code)
  }

  return (
    <Select
      selectedIndex={selectedIndex}
      value={LANGUAGES.find((item) => item.code === i18n.language)?.title}
      onSelect={(index) => changeLanguage(index as IndexPath)}
    >
      {LANGUAGES.map(({ title }) => (
        <SelectItem key={title} title={title} />
      ))}
    </Select>
  )
}
