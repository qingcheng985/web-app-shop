import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { formatMoney } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function CheckoutPage() {
  const shop = useShop()
  const [placed, setPlaced] = useState<{
    id: string
    total: number
    region: string
    count: number
  } | null>(null)

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <p className="text-[11px] uppercase tracking-[0.2em] text-clay">Order {placed.id}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em]">
          Packed for {placed.region}.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-mute">
          This is a demo checkout. Nothing was charged. {placed.count}{' '}
          {placed.count === 1 ? 'piece' : 'pieces'} · {formatMoney(placed.total)} USD, shipping
          included in that total.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-foam"
        >
          Continue browsing
        </Link>
      </div>
    )
  }

  if (shop.lines.length === 0) return <Navigate to="/cart" replace />

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_20rem] lg:py-12">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-mute">
          <Link to="/cart" className="underline-offset-4 hover:underline">
            Bag
          </Link>{' '}
          / Review
        </p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.04em]">Review order</h1>
        <ul className="mt-8 divide-y divide-line">
          {shop.lines.map((line) => (
            <li
              key={`${line.productId}-${line.variant}`}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="font-serif text-2xl">{line.product.name}</p>
                <p className="text-sm text-mute">
                  {line.variant} · Qty {line.qty}
                </p>
              </div>
              <p className="tabular-nums">{formatMoney(line.product.price * line.qty)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-mute">
          No account and no card. Placing the order only confirms the bag in this browser and
          clears it. Ship to {shop.region.label}, {shop.region.window}.
        </p>
      </div>
      <aside className="h-fit rounded-[1.6rem] bg-foam p-5">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="tabular-nums">{formatMoney(shop.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="tabular-nums">{shop.shipping === 0 ? 'Free' : formatMoney(shop.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatMoney(shop.total)}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sage text-sm text-foam active:scale-[0.98]"
          onClick={() => {
            const id = `NL-${Date.now().toString().slice(-6)}`
            setPlaced({
              id,
              total: shop.total,
              region: shop.region.label,
              count: shop.count,
            })
            shop.clear()
          }}
        >
          Place demo order
        </button>
      </aside>
    </div>
  )
}
