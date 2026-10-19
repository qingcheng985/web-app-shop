import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { REGIONS, type RegionId } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function Header() {
  const { t, i18n } = useTranslation()
  const { count, region, setRegion } = useShop()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(() => params.get('q') ?? '')
  const toggleLang = () => void i18n.changeLanguage(i18n.language.startsWith('zh') ? 'en' : 'zh')

  useEffect(() => {
    setQuery(params.get('q') ?? '')
  }, [params])

  return (
    <header className="sticky top-0 z-30 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 rounded-3xl border border-ink/10 bg-foam/95 px-3 py-2.5 shadow-[0_10px_40px_-24px_rgba(26,23,20,0.45)] backdrop-blur-md sm:gap-3 sm:rounded-full sm:px-4 sm:py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Link
            to="/"
            className="min-w-0 shrink truncate px-1 font-serif text-[1.45rem] leading-none tracking-[-0.03em] sm:text-[1.65rem]"
          >
            Northline
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <label className="sr-only" htmlFor="region">
              {t('cart.shipTo')}
            </label>
            <select
              id="region"
              value={region.id}
              onChange={(event) => setRegion(event.target.value as RegionId)}
              className="max-w-[5.5rem] truncate rounded-full bg-paper px-2 py-2 text-xs text-ink sm:max-w-[11rem] sm:bg-transparent sm:px-3 sm:text-sm"
            >
              {REGIONS.map((item) => (
                <option key={item.id} value={item.id}>
                  {t('nav.shipTo', { region: t(`regions.${item.id}.label`) })}
                </option>
              ))}
            </select>
            <LangButton label={t('nav.language')} onClick={toggleLang} />
            <NavLink
              to="/cart"
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-3 text-sm text-foam transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:min-h-11 sm:gap-2 sm:px-4"
            >
              <span className="max-w-[4.5rem] truncate sm:max-w-none">{t('nav.bag')}</span>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-foam/15 px-1 text-xs tabular-nums sm:h-6 sm:min-w-6">
                {count}
              </span>
            </NavLink>
          </div>
        </div>

        <form
          className="flex min-w-0"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            const next = query.trim()
            navigate(next ? `/?q=${encodeURIComponent(next)}` : '/')
          }}
        >
          <label className="sr-only" htmlFor="search">
            {t('nav.search')}
          </label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('nav.placeholder')}
            className="min-h-11 w-full min-w-0 rounded-full bg-paper px-4 text-base text-ink outline-none placeholder:text-mute/80"
          />
        </form>
      </div>
    </header>
  )
}

function LangButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-ink/10 px-2.5 text-xs active:scale-[0.98] sm:min-h-11 sm:px-3 sm:text-sm"
    >
      {label}
    </button>
  )
}
