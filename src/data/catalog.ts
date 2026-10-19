export const REGIONS = [
  { id: 'US', fee: 9 },
  { id: 'UK', fee: 14 },
  { id: 'EU', fee: 16 },
  { id: 'AU', fee: 18 },
  { id: 'JP', fee: 12 },
] as const

export type RegionId = (typeof REGIONS)[number]['id']

export const FREE_SHIPPING_AT = 75

export const categories = ['Bags', 'Apparel', 'Drinkware', 'Audio', 'Care'] as const

export type CategoryId = (typeof categories)[number]

export type Variant = {
  key: string
  swatch: string
}

export type Product = {
  id: string
  category: CategoryId
  price: number
  image: string
  variants: Variant[]
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

export const products: Product[] = [
  {
    id: 'field-tote',
    category: 'Bags',
    price: 88,
    image: img('photo-1590874103328-eac38a683ce7'),
    variants: [
      { key: 'Sand', swatch: '#c4b29a' },
      { key: 'Ink', swatch: '#1a1714' },
      { key: 'Olive', swatch: '#5c6748' },
    ],
  },
  {
    id: 'weekender',
    category: 'Bags',
    price: 164,
    image: img('photo-1553062407-98eeb64c6a62'),
    variants: [
      { key: 'Charcoal', swatch: '#3a3835' },
      { key: 'Navy', swatch: '#243044' },
    ],
  },
  {
    id: 'pack-pouch',
    category: 'Bags',
    price: 42,
    image: img('photo-1553531889-56cc480ac5cb'),
    variants: [
      { key: 'Stone', swatch: '#b7b1a8' },
      { key: 'Clay', swatch: '#8f4630' },
    ],
  },
  {
    id: 'rain-shell',
    category: 'Apparel',
    price: 128,
    image: img('photo-1591047139829-d91aecb6caea'),
    variants: [
      { key: 'Fog', swatch: '#d5d8dc' },
      { key: 'Black', swatch: '#111111' },
    ],
  },
  {
    id: 'merino-scarf',
    category: 'Apparel',
    price: 58,
    image: img('photo-1520903920243-00d872a2d1c9'),
    variants: [
      { key: 'Oat', swatch: '#e6d7c3' },
      { key: 'Rust', swatch: '#8f4630' },
      { key: 'Pine', swatch: '#2f4738' },
    ],
  },
  {
    id: 'wool-beanie',
    category: 'Apparel',
    price: 36,
    image: img('photo-1576871337632-b9aef4c17ab9'),
    variants: [
      { key: 'Camel', swatch: '#b08968' },
      { key: 'Ink', swatch: '#1a1714' },
    ],
  },
  {
    id: 'flask',
    category: 'Drinkware',
    price: 34,
    image: img('photo-1602143407151-7111542de6e8'),
    variants: [
      { key: 'Bone', swatch: '#efeae2' },
      { key: 'Sage', swatch: '#7d8b78' },
      { key: 'Ink', swatch: '#1a1714' },
    ],
  },
  {
    id: 'pour-over',
    category: 'Drinkware',
    price: 46,
    image: img('photo-1495474472287-4d71bcdd2085'),
    variants: [
      { key: 'Clear', swatch: '#d9d3cb' },
      { key: 'Amber', swatch: '#c47a45' },
    ],
  },
  {
    id: 'headphones',
    category: 'Audio',
    price: 148,
    image: img('photo-1505740420928-5e560c06d30e'),
    variants: [
      { key: 'Graphite', swatch: '#4a4a4a' },
      { key: 'Cream', swatch: '#efe6d6' },
    ],
  },
  {
    id: 'earbuds',
    category: 'Audio',
    price: 79,
    image: img('photo-1590658268037-6bf12165a8df'),
    variants: [
      { key: 'White', swatch: '#f4f1ea' },
      { key: 'Black', swatch: '#1a1714' },
    ],
  },
  {
    id: 'card-sleeve',
    category: 'Care',
    price: 28,
    image: img('photo-1627123424574-724758594e93'),
    variants: [
      { key: 'Tan', swatch: '#a97449' },
      { key: 'Black', swatch: '#1a1714' },
    ],
  },
  {
    id: 'eye-mask',
    category: 'Care',
    price: 24,
    image: img('photo-1541781774459-bb2af2f05b55'),
    variants: [
      { key: 'Ivory', swatch: '#f3eadf' },
      { key: 'Slate', swatch: '#6d7278' },
    ],
  },
]

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id)
}

export function regionById(id: RegionId) {
  return REGIONS.find((region) => region.id === id) ?? REGIONS[0]
}

export function shippingFee(subtotal: number, regionId: RegionId) {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_AT) return 0
  return regionById(regionId).fee
}
