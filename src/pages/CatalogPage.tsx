import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard.tsx'
import {
  FREE_SHIPPING_AT,
  categories,
  formatMoney,
  products,
} from '../data/catalog.ts'

const priceIds = ['all', 'under40', 'mid', 'over80'] as const
const sortIds = ['featured', 'price-asc', 'price-desc', 'name'] as const

function inPrice(price: number, band: string) {
  if (band === 'under40') return price < 40
  if (band === 'mid') return price >= 40 && price <= 80
  if (band === 'over80') return price > 80
  return true
}

export function CatalogPage() {
  const { t, i18n } = useTranslation()
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') ?? '').trim().toLowerCase()
  const category = params.get('cat') ?? 'all'
  const price = params.get('price') ?? 'all'
  const sort = params.get('sort') ?? 'featured'

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      const name = t(`products.${product.id}.name`).toLowerCase()
      const blurb = t(`products.${product.id}.blurb`).toLowerCase()
      const categoryLabel = t(`categories.${product.category}`).toLowerCase()
      const matchesQuery =
        !query ||
        name.includes(query) ||
        blurb.includes(query) ||
        categoryLabel.includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.id.includes(query)
      const matchesCategory = category === 'all' || product.category === category
      return matchesQuery && matchesCategory && inPrice(product.price, price)
    })
    const next = [...filtered]
    if (sort === 'price-asc') next.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') next.sort((a, b) => b.price - a.price)
    if (sort === 'name') {
      next.sort((a, b) =>
        t(`products.${a.id}.name`).localeCompare(t(`products.${b.id}.name`), i18n.language),
      )
    }
    return next
  }, [query, category, price, sort, t, i18n.language])

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === 'all' || value === 'featured') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const priceLabel = (id: (typeof priceIds)[number]) => {
    if (id === 'all') return t('filters.any')
    if (id === 'under40') return t('filters.under40')
    if (id === 'mid') return t('filters.mid')
    return t('filters.over80')
  }

  const sortLabel = (id: (typeof sortIds)[number]) => {
    if (id === 'featured') return t('sort.featured')
    if (id === 'price-asc') return t('sort.priceAsc')
    if (id === 'price-desc') return t('sort.priceDesc')
    return t('sort.name')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-12">
      <section className="grid items-end gap-6 border-b border-line pb-8 md:grid-cols-[1.35fr_0.75fr] md:gap-8 md:pb-10">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.22em] text-clay">{t('hero.eyebrow')}</p>
          <h1 className="mt-3 max-w-xl break-words font-serif text-[2.35rem] leading-[1.05] tracking-[-0.04em] sm:text-[3.1rem] sm:leading-[0.92] md:text-7xl">
            {t('hero.titleLine1')}
            <br />
            {t('hero.titleLine2')}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mute sm:mt-5 sm:text-lg">
            {t('hero.lead', { amount: formatMoney(FREE_SHIPPING_AT) })}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line text-sm sm:rounded-[1.6rem]">
          {[
            [t('facts.currency'), t('facts.currencyValue')],
            [t('facts.freeShip'), formatMoney(FREE_SHIPPING_AT)],
            [t('facts.returns'), t('facts.returnsValue')],
            [t('facts.duties'), t('facts.dutiesValue')],
          ].map(([label, value]) => (
            <div key={label} className="bg-foam px-3 py-3 sm:px-4 sm:py-4">
              <dt className="text-[10px] uppercase tracking-[0.16em] text-mute sm:text-[11px]">{label}</dt>
              <dd className="mt-1 break-words font-serif text-xl tracking-[-0.03em] sm:text-2xl">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[13rem_1fr] lg:gap-12">
        <aside className="flex min-w-0 flex-col gap-4 sm:gap-6">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mute">{t('filters.category')}</p>
            <div className="chip-scroll mt-3 lg:flex-col lg:overflow-visible">
              <FilterButton active={category === 'all'} onClick={() => setParam('cat', 'all')}>
                {t('filters.all')}
              </FilterButton>
              {categories.map((item) => (
                <FilterButton
                  key={item}
                  active={category === item}
                  onClick={() => setParam('cat', item)}
                >
                  {t(`categories.${item}`)}
                </FilterButton>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mute">{t('filters.price')}</p>
            <div className="chip-scroll mt-3 lg:flex-col lg:overflow-visible">
              {priceIds.map((item) => (
                <FilterButton
                  key={item}
                  active={price === item}
                  onClick={() => setParam('price', item)}
                >
                  {priceLabel(item)}
                </FilterButton>
              ))}
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <p className="text-sm text-mute">
              {t('catalog.count', { count: visible.length })}
              {query ? t('catalog.forQuery', { query: params.get('q') }) : ''}
            </p>
            <label className="flex items-center gap-2 text-sm text-mute">
              <span className="shrink-0">{t('sort.label')}</span>
              <select
                value={sort}
                onChange={(event) => setParam('sort', event.target.value)}
                className="min-h-11 min-w-0 flex-1 rounded-full bg-foam px-3 text-ink sm:flex-none"
              >
                {sortIds.map((item) => (
                  <option key={item} value={item}>
                    {sortLabel(item)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-line px-6 py-16 text-center">
              <p className="font-serif text-3xl tracking-[-0.03em]">{t('catalog.emptyTitle')}</p>
              <p className="mx-auto mt-2 max-w-sm text-mute">{t('catalog.emptyBody')}</p>
              <button
                type="button"
                onClick={() => setParams(new URLSearchParams())}
                className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-foam active:scale-[0.98]"
              >
                {t('catalog.clear')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 xl:grid-cols-3">
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
