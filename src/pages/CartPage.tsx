import { Link } from 'react-router-dom'
import { FREE_SHIPPING_AT, formatMoney, REGIONS, type RegionId } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function CartPage() {
  const { lines, region, setRegion, setQty, remove, subtotal, shipping, total } = useShop()
  const remaining = Math.max(0, FREE_SHIPPING_AT - subtotal)

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-clay">Your bag</p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em]">Nothing packed yet.</h1>
        <p className="mt-3 text-mute">Add a piece from the edit. It stays in this browser.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-foam"
        >
          Browse goods
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_20rem] lg:py-12">
      <div>
        <h1 className="font-serif text-5xl tracking-[-0.04em]">Your bag</h1>
        <ul className="mt-8 divide-y divide-line">
          {lines.map((line) => (
            <li key={`${line.productId}-${line.variant}`} className="flex gap-4 py-6">
              <Link
                to={`/product/${line.product.id}`}
                className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#e7e0d6]"
              >
                <img src={line.product.image} alt="" className="h-full w-full object-cover" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/product/${line.product.id}`} className="font-serif text-2xl">
                      {line.product.name}
                    </Link>
                    <p className="text-sm text-mute">{line.variant}</p>
                  </div>
                  <p className="tabular-nums">{formatMoney(line.product.price * line.qty)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex min-h-11 items-center rounded-full bg-foam">
                    <button
                      type="button"
                      className="grid h-11 w-11 place-items-center"
                      aria-label={`Decrease ${line.product.name}`}
                      onClick={() => setQty(line.productId, line.variant, line.qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-6 text-center tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      className="grid h-11 w-11 place-items-center"
                      aria-label={`Increase ${line.product.name}`}
                      onClick={() => setQty(line.productId, line.variant, Math.min(9, line.qty + 1))}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.productId, line.variant)}
                    className="min-h-11 px-2 text-sm text-mute underline-offset-4 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-[1.6rem] bg-foam p-5 lg:sticky lg:top-28">
        <h2 className="font-serif text-3xl tracking-[-0.03em]">Summary</h2>
        <label className="mt-5 block text-[11px] uppercase tracking-[0.16em] text-mute" htmlFor="ship">
          Ship to
        </label>
        <select
          id="ship"
          value={region.id}
          onChange={(event) => setRegion(event.target.value as RegionId)}
          className="mt-2 min-h-11 w-full rounded-full bg-paper px-3"
        >
          {REGIONS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <p className="mt-3 text-sm text-mute">
          {shipping === 0
            ? `Free shipping to ${region.label}. Arrives in ${region.window}.`
            : `${formatMoney(remaining)} away from free shipping. Standard fee ${formatMoney(region.fee)}, ${region.window}.`}
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="tabular-nums">{shipping === 0 ? 'Free' : formatMoney(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(total)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-mute">
          Duties are not included. They are collected locally on delivery.
        </p>
        <Link
          to="/checkout"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-ink text-sm text-foam active:scale-[0.98]"
        >
          Review order
        </Link>
      </aside>
    </div>
  )
}
