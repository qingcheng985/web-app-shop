import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard.tsx'
import {
  FREE_SHIPPING_AT,
  categories,
  formatMoney,
  products,
} from '../data/catalog.ts'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price, low to high' },
  { id: 'price-desc', label: 'Price, high to low' },
  { id: 'name', label: 'Name' },
] as const

const prices = [
  { id: 'all', label: 'Any price' },
  { id: 'under40', label: 'Under $40' },
  { id: 'mid', label: '$40–$80' },
  { id: 'over80', label: '$80 and up' },
] as const

function inPrice(price: number, band: string) {
  if (band === 'under40') return price < 40
  if (band === 'mid') return price >= 40 && price <= 80
  if (band === 'over80') return price > 80
  return true
}

export function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') ?? '').trim().toLowerCase()
  const category = params.get('cat') ?? 'all'
  const price = params.get('price') ?? 'all'
  const sort = params.get('sort') ?? 'featured'

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.blurb.toLowerCase().includes(query)
      const matchesCategory = category === 'all' || product.category === category
      return matchesQuery && matchesCategory && inPrice(product.price, price)
    })
    const next = [...filtered]
    if (sort === 'price-asc') next.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') next.sort((a, b) => b.price - a.price)
    if (sort === 'name') next.sort((a, b) => a.name.localeCompare(b.name))
    return next
  }, [query, category, price, sort])

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === 'all' || value === 'featured') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pt-12">
      <section className="grid items-end gap-8 border-b border-line pb-10 md:grid-cols-[1.35fr_0.75fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay">For shoppers abroad</p>
          <h1 className="mt-3 max-w-xl font-serif text-[3.1rem] leading-[0.92] tracking-[-0.04em] sm:text-7xl">
            Carry less.
            <br />
            Arrive ready.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">
            Twelve pieces for trains, cabins, and long weekends. Priced in USD. Free shipping from{' '}
            {formatMoney(FREE_SHIPPING_AT)}.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.6rem] bg-line text-sm">
          {[
            ['Currency', 'USD'],
            ['Free ship', formatMoney(FREE_SHIPPING_AT)],
            ['Returns', '30 days'],
            ['Duties', 'At delivery'],
          ].map(([label, value]) => (
            <div key={label} className="bg-foam px-4 py-4">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-mute">{label}</dt>
              <dd className="mt-1 font-serif text-2xl tracking-[-0.03em]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-8 grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-12">
        <aside className="flex flex-col gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-mute">Category</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col">
              <FilterButton active={category === 'all'} onClick={() => setParam('cat', 'all')}>
                All goods
              </FilterButton>
              {categories.map((item) => (
                <FilterButton
                  key={item}
                  active={category === item}
                  onClick={() => setParam('cat', item)}
                >
                  {item}
                </FilterButton>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-mute">Price</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col">
              {prices.map((item) => (
                <FilterButton
                  key={item.id}
                  active={price === item.id}
                  onClick={() => setParam('price', item.id)}
                >
                  {item.label}
                </FilterButton>
              ))}
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <p className="text-sm text-mute">
              {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
              {query ? ` for “${params.get('q')}”` : ''}
            </p>
            <label className="text-sm text-mute">
              Sort
              <select
                value={sort}
                onChange={(event) => setParam('sort', event.target.value)}
                className="ml-2 min-h-11 rounded-full bg-foam px-3 text-ink"
              >
                {sorts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-line px-6 py-16 text-center">
              <p className="font-serif text-3xl tracking-[-0.03em]">Nothing in this cut.</p>
              <p className="mx-auto mt-2 max-w-sm text-mute">
                Try another word, or clear the filters and look through the full edit.
              </p>
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-foam active:scale-[0.98]"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 shrink-0 rounded-full px-4 text-left text-sm transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:w-full ${
        active ? 'bg-ink text-foam' : 'bg-foam text-ink hover:bg-white'
      }`}
    >
      {children}
    </button>
  )
}
