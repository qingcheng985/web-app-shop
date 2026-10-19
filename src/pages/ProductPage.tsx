import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { formatMoney, FREE_SHIPPING_AT, getProduct } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function ProductRoute() {
  const { id } = useParams()
  return <ProductPage key={id} />
}

function ProductPage() {
  const { id } = useParams()
  const product = getProduct(id ?? '')
  const { add, region } = useShop()
  const [variant, setVariant] = useState(product?.variants[0].name ?? '')
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="font-serif text-4xl tracking-[-0.03em]">This piece is not in the edit.</p>
        <Link to="/" className="mt-6 inline-flex min-h-11 items-center text-clay underline">
          Back to goods
        </Link>
      </div>
    )
  }

  const selected = product.variants.find((item) => item.name === variant) ?? product.variants[0]

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-12">
      <div className="overflow-hidden rounded-[1.8rem] bg-[#e7e0d6] lg:sticky lg:top-28 lg:self-start">
        <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
      </div>
      <div className="pb-24 lg:py-6">
        <Link to="/" className="text-[11px] uppercase tracking-[0.18em] text-mute">
          {product.category}
        </Link>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
          {product.name}
        </h1>
        <p className="mt-4 font-serif text-3xl tabular-nums">{formatMoney(product.price)}</p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-mute">{product.blurb}</p>
        <p className="mt-3 max-w-md leading-relaxed">{product.details}</p>

        <fieldset className="mt-8">
          <legend className="text-[11px] uppercase tracking-[0.18em] text-mute">
            Color · {selected.name}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.variants.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={item.name === selected.name}
                onClick={() => setVariant(item.name)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm ${
                  item.name === selected.name ? 'border-ink bg-foam' : 'border-transparent bg-foam/60'
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-ink/20"
                  style={{ background: item.swatch }}
                />
                {item.name}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex min-h-11 items-center rounded-full bg-foam">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              onClick={() => setQty((value) => Math.max(1, value - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center tabular-nums">{qty}</span>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              onClick={() => setQty((value) => Math.min(9, value + 1))}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => add(product.id, selected.name, qty)}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm text-foam transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            Add to bag
          </button>
        </div>

        <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">
          Shipping to {region.label} in {region.window}. Orders from {formatMoney(FREE_SHIPPING_AT)}{' '}
          ship free. Import duties, if any, are collected by the carrier on delivery.
        </p>
      </div>
    </div>
  )
}
