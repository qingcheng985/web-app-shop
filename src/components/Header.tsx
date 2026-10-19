import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { REGIONS, type RegionId } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function Header() {
  const { count, region, setRegion } = useShop()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const urlQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[1.7rem] border border-ink/10 bg-foam/90 px-3 py-2 shadow-[0_10px_40px_-24px_rgba(26,23,20,0.45)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:rounded-full sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="px-2 font-serif text-[1.65rem] leading-none tracking-[-0.03em]">
            Northline
          </Link>
          <NavLink
            to="/cart"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-foam transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:hidden"
          >
            Bag
            <span className="tabular-nums">{count}</span>
          </NavLink>
        </div>

        <form
          className="flex min-w-0 flex-1"
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            const next = query.trim()
            navigate(next ? `/?q=${encodeURIComponent(next)}` : '/')
          }}
        >
          <label className="sr-only" htmlFor="search">
            Search goods
          </label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search totes, flasks, shells…"
            className="min-h-11 w-full rounded-full bg-paper px-4 text-base text-ink outline-none placeholder:text-mute/80"
          />
        </form>

        <div className="hidden items-center gap-2 sm:flex">
          <label className="sr-only" htmlFor="region">
            Ship to
          </label>
          <select
            id="region"
            value={region.id}
            onChange={(event) => setRegion(event.target.value as RegionId)}
            className="min-h-11 rounded-full bg-transparent px-3 text-sm text-ink"
          >
            {REGIONS.map((item) => (
              <option key={item.id} value={item.id}>
                Ship to {item.label}
              </option>
            ))}
          </select>
          <NavLink
            to="/cart"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-foam transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            Bag
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-foam/15 px-1 tabular-nums">
              {count}
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
