import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { formatMoney, type Product } from '../data/catalog.ts'
import { useShop } from '../context/ShopContext.tsx'

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation()
  const { add } = useShop()
  const variant = product.variants[0]
  const name = t(`products.${product.id}.name`)

  return (
    <article className="flex flex-col">
      <Link to={`/product/${product.id}`} className="group block">
        <div className="overflow-hidden rounded-[1.7rem] bg-[#e7e0d6]">
          <img
            src={product.image}
            alt={name}
            className="aspect-[4/5] w-full object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-mute">
              {t(`categories.${product.category}`)}
            </p>
            <h2 className="mt-1 font-serif text-[1.7rem] leading-none tracking-[-0.03em]">{name}</h2>
          </div>
          <p className="pt-5 text-sm tabular-nums">{formatMoney(product.price)}</p>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => add(product.id, variant.key)}
        className="mt-3 inline-flex min-h-11 w-fit items-center rounded-full border border-ink/15 px-4 text-sm transition duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-ink hover:text-foam active:scale-[0.98]"
      >
        {t('product.add')} · {t(`variants.${variant.key}`)}
      </button>
    </article>
  )
}
