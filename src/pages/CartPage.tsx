import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FREE_SHIPPING_AT, formatMoney, REGIONS, type RegionId } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function CartPage() {
  const { t } = useTranslation()
  const { lines, region, setRegion, setQty, remove, subtotal, shipping, total } = useShop()
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal)

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.2em] text-clay">{t('cart.eyebrow')}</p>
        <h1 className="mt-3 break-words font-serif text-[2.5rem] tracking-[-0.04em] sm:text-5xl">
          {t('cart.emptyTitle')}
        </h1>
        <p className="mt-3 text-mute">{t('cart.emptyBody')}</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-foam"
        >
          {t('cart.browse')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:gap-10 sm:px-6 sm:py-8 lg:grid-cols-[1fr_20rem] lg:py-12">
      <div className="min-w-0">
        <h1 className="break-words font-serif text-[2.5rem] tracking-[-0.04em] sm:text-5xl">
          {t('cart.title')}
        </h1>
        <ul className="mt-6 divide-y divide-line sm:mt-8">
          {lines.map((line) => {
            const name = t(`products.${line.product.id}.name`)
            return (
              <li key={`${line.productId}-${line.variant}`} className="flex gap-3 py-5 sm:gap-4 sm:py-6">
                <Link
                  to={`/product/${line.product.id}`}
                  className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#e7e0d6] sm:h-28 sm:w-24"
                >
                  <img src={line.product.image} alt="" className="h-full w-full object-cover" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/product/${line.product.id}`}
                        className="block break-words font-serif text-xl leading-tight sm:text-2xl"
                      >
                        {name}
                      </Link>
                      <p className="text-sm text-mute">{t(`variants.${line.variant}`)}</p>
                    </div>
                    <p className="shrink-0 tabular-nums">
                      {formatMoney(line.product.price * line.qty)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <div className="inline-flex min-h-11 items-center rounded-full bg-foam">
                      <button
                        type="button"
                        className="grid h-11 w-10 place-items-center sm:w-11"
                        aria-label={t('cart.decrease', { name })}
                        onClick={() => setQty(line.productId, line.variant, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        className="grid h-11 w-10 place-items-center sm:w-11"
                        aria-label={t('cart.increase', { name })}
                        onClick={() =>
                          setQty(line.productId, line.variant, Math.min(9, line.qty + 1))
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.productId, line.variant)}
                      className="min-h-11 px-2 text-sm text-mute underline-offset-4 hover:underline"
                    >
                      {t('cart.remove')}
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <aside className="h-fit rounded-2xl bg-foam p-4 sm:rounded-[1.6rem] sm:p-5 lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl tracking-[-0.03em] sm:text-3xl">{t('cart.summary')}</h2>
        <label className="mt-5 block text-[11px] uppercase tracking-[0.16em] text-mute" htmlFor="ship">
          {t('cart.shipTo')}
        </label>
        <select
          id="ship"
          value={region.id}
          onChange={(event) => setRegion(event.target.value as RegionId)}
          className="mt-2 min-h-11 w-full rounded-full bg-paper px-3"
        >
          {REGIONS.map((item) => (
            <option key={item.id} value={item.id}>
              {t(`regions.${item.id}.label`)}
            </option>
          ))}
        </select>
        <p className="mt-3 text-sm leading-relaxed text-mute">
          {shipping === 0
            ? t('cart.freeLine', {
                region: t(`regions.${region.id}.label`),
                window: t(`regions.${region.id}.window`),
              })
            : t('cart.away', {
                amount: formatMoney(remaining),
                fee: formatMoney(region.fee),
                window: t(`regions.${region.id}.window`),
              })}
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt>{t('cart.subtotal')}</dt>
            <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>{t('cart.shipping')}</dt>
            <dd className="tabular-nums">{shipping === 0 ? t('cart.free') : formatMoney(shipping)}</dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-line pt-3 font-serif text-xl sm:text-2xl">
            <dt>{t('cart.total')}</dt>
            <dd className="tabular-nums">{formatMoney(total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-mute">{t('cart.duties')}</p>
        <Link
          to="/checkout"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink text-sm text-foam active:scale-[0.98]"
        >
          {t('cart.review')}
        </Link>
      </aside>
    </div>
  )
}
