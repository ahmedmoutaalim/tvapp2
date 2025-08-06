import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

import en from './src/locales/en/translation.json'
import fr from './src/locales/fr/translation.json'
import ar from './src/locales/ar/translation.json'
import es from './src/locales/es/translation.json'

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {translation: en},
    fr: {translation: fr},
    ar: {translation: ar},
    es: {translation: es}
  },
  interpolation: {
    escapeValue: false
  }
})

export default i18n
