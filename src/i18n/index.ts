import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './locale-manager'
import LanguageDetector from 'i18next-browser-languagedetector'

const DETECTION_OPTIONS = {
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    compatibilityJSON: 'v3',
    resources,
    detection: DETECTION_OPTIONS,
    fallbackLng: 'uk',
    supportedLngs: ['en', 'uk'],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    react: {
      useSuspense: false,
    },
  })
