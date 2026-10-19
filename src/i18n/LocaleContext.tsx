import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { t, type Locale, type MessageKey } from './messages.ts'

const STORAGE_KEY = 'northline-locale'

type LocaleValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey, vars?: Record<string, string | number>) => string
}

const LocaleContext = createContext<LocaleValue | null>(null)

function readLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'zh' || raw === 'en') return raw
  } catch {
    /* ignore */
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readLocale())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title =
      locale === 'zh' ? 'Northline — 远行好物' : 'Northline — Goods for the long way'
  }, [locale])

  const value = useMemo<LocaleValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: (key, vars) => t(locale, key, vars),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
