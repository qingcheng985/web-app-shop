import { Link, Outlet, useLocation } from 'react-router-dom'
import { Header } from './components/Header.tsx'
import { useShop } from './context/ShopContext.tsx'

export function Shell() {
  const { notice, count } = useShop()
  const { pathname } = useLocation()
  const showBagBar = count > 0 && pathname !== '/cart' && pathname !== '/checkout'

  return (
    <div className="min-h-[100dvh]">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-mute sm:px-6 sm:flex-row sm:justify-between">
        <p className="font-serif text-xl text-ink">Northline</p>
        <p>USD · US, UK, EU, AU, JP · Demo shop, no live payment</p>
      </footer>
      {notice && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-3 text-sm text-foam shadow-[0_16px_40px_-20px_rgba(26,23,20,0.8)] sm:bottom-8"
        >
          {notice}
        </div>
      )}
      {showBagBar && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-foam/95 p-3 backdrop-blur-md sm:hidden">
          <Link
            to="/cart"
            className="flex min-h-12 items-center justify-between rounded-full bg-ink px-5 text-sm text-foam"
          >
            <span>View bag</span>
            <span className="tabular-nums">{count}</span>
          </Link>
        </div>
      )}
    </div>
  )
}
