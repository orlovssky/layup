import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { LOCALE } from './lib/constants/LOCALE'
import enTranslation from './lib/static/translations/en.json'
import ruTranslation from './lib/static/translations/ru.json'
import { getLocal } from './lib/utils/localStorage'

export { default as LocaleToggle } from './ui/Toggle'

i18n
  .use(initReactI18next)
  .init({
    lng: getLocal() || LOCALE.RUSSIAN,
    fallbackLng: LOCALE.RUSSIAN,
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    },
    react: {
      useSuspense: false,
    },
    resources: {
      en: { translation: enTranslation },
      ru: { translation: ruTranslation },
    },
    returnNull: false,
  })
  .then(() => {
    // do nothing
  })
