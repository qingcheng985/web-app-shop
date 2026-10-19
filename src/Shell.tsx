import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header.tsx'
import { useShop } from './context/ShopContext.tsx'

export function Shell() {
  const { t, i18n } = useTranslation()
  const { notice, count } = useShop()
  const { pathname } = useLocation()
  const showBagBar = count > 0 && pathname !== '/cart' && pathname !== '/checkout'

  useEffect(() => {
    document.title = t('meta.title')
  }, [t, i18n.language])

  const noticeText = notice
    ? t('notice', {
        name: t(`products.${notice.productId}.name`),
        variant: t(`variants.${notice.variant}`),
      })
    : null

  return (
    <div className="min-h-[100dvh]">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-mute sm:flex-row sm:justify-between sm:px-6">
        <p className="font-serif text-xl text-ink">Northline</p>
        <p>{t('footer')}</p>
      </footer>
      {noticeText && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-3 text-sm text-foam shadow-[0_16px_40px_-20px_rgba(26,23,20,0.8)] sm:bottom-8"
        >
          {noticeText}
        </div>
      )}
      {showBagBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-foam/95 p-3 backdrop-blur-md sm:hidden">
          <Link
            to="/cart"
            className="flex min-h-12 items-center justify-between rounded-full bg-ink px-5 text-sm text-foam"
          >
            <span>{t('nav.viewBag')}</span>
            <span className="tabular-nums">{count}</span>
          </Link>
        </div>
      )}
    </div>
  )
}
