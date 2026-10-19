import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.ts'
import zh from './zh.ts'

const stored = localStorage.getItem('northline-lang')
const lng = stored === 'zh' || stored === 'en' ? stored : 'en'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

function applyLanguage(language: string) {
  localStorage.setItem('northline-lang', language)
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
}

applyLanguage(lng)
i18n.on('languageChanged', applyLanguage)

export default i18n
