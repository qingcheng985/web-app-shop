import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { formatMoney } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function CheckoutPage() {
  const { t } = useTranslation()
  const shop = useShop()
  const [placed, setPlaced] = useState<{
    id: string
    total: number
    regionId: string
    count: number
  } | null>(null)

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:py-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-clay">
          {t('checkout.order', { id: placed.id })}
        </p>
        <h1 className="mt-3 break-words font-serif text-[2.5rem] leading-[1.05] tracking-[-0.04em] sm:text-5xl sm:leading-[0.95]">
          {t('checkout.packed', { region: t(`regions.${placed.regionId}.label`) })}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">
          {t('checkout.done', {
            count: placed.count,
            unit: t('checkout.unit', { count: placed.count }),
            total: formatMoney(placed.total),
          })}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-foam"
        >
          {t('checkout.continue')}
        </Link>
      </div>
    )
  }

  if (shop.lines.length === 0) return <Navigate to="/cart" replace />

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:grid-cols-[1fr_20rem] lg:py-12">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">
          <Link to="/cart" className="underline-offset-4 hover:underline">
            {t('checkout.bag')}
          </Link>{' '}
          / {t('checkout.reviewCrumb')}
        </p>
        <h1 className="mt-3 break-words font-serif text-[2.5rem] tracking-[-0.04em] sm:text-5xl">
          {t('checkout.title')}
        </h1>
        <ul className="mt-6 divide-y divide-line sm:mt-8">
          {shop.lines.map((line) => (
            <li
              key={`${line.productId}-${line.variant}`}
              className="flex items-start justify-between gap-3 py-4 sm:items-center sm:gap-4"
            >
              <div className="min-w-0">
                <p className="break-words font-serif text-xl sm:text-2xl">
                  {t(`products.${line.product.id}.name`)}
                </p>
                <p className="text-sm text-mute">
                  {t('checkout.qty', {
                    variant: t(`variants.${line.variant}`),
                    qty: line.qty,
                  })}
                </p>
              </div>
              <p className="shrink-0 tabular-nums">{formatMoney(line.product.price * line.qty)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-mute">
          {t('checkout.note', {
            region: t(`regions.${shop.region.id}.label`),
            window: t(`regions.${shop.region.id}.window`),
          })}
        </p>
      </div>
      <aside className="h-fit rounded-2xl bg-foam p-4 sm:rounded-[1.6rem] sm:p-5">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt>{t('checkout.subtotal')}</dt>
            <dd className="tabular-nums">{formatMoney(shop.subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>{t('checkout.shipping')}</dt>
            <dd className="tabular-nums">
              {shop.shipping === 0 ? t('checkout.free') : formatMoney(shop.shipping)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-line pt-3 font-serif text-xl sm:text-2xl">
            <dt>{t('checkout.total')}</dt>
            <dd className="tabular-nums">{formatMoney(shop.total)}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-sage text-sm text-foam active:scale-[0.98]"
          onClick={() => {
            setPlaced({
              id: `NL-${Date.now().toString().slice(-6)}`,
              total: shop.total,
              regionId: shop.region.id,
              count: shop.count,
            })
            shop.clear()
          }}
        >
          {t('checkout.place')}
        </button>
      </aside>
    </div>
  )
}
