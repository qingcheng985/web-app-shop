export const REGIONS = [
  { id: 'US', label: 'United States', fee: 9, window: '3–5 business days' },
  { id: 'UK', label: 'United Kingdom', fee: 14, window: '5–7 business days' },
  { id: 'EU', label: 'European Union', fee: 16, window: '5–8 business days' },
  { id: 'AU', label: 'Australia', fee: 18, window: '6–10 business days' },
  { id: 'JP', label: 'Japan', fee: 12, window: '4–7 business days' },
] as const

export type RegionId = (typeof REGIONS)[number]['id']

export const FREE_SHIPPING_AT = 75

export type Variant = {
  name: string
  swatch: string
}

export type Product = {
  id: string
  name: string
  category: 'Bags' | 'Apparel' | 'Drinkware' | 'Audio' | 'Care'
  price: number
  image: string
  blurb: string
  details: string
  variants: Variant[]
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`

export const products: Product[] = [
  {
    id: 'field-tote',
    name: 'Field Tote',
    category: 'Bags',
    price: 88,
    image: img('photo-1590874103328-eac38a683ce7'),
    blurb: 'A structured canvas tote that stands up in a train rack and folds flat in a hotel drawer.',
    details:
      'Heavy cotton canvas, vegetable-tanned leather handles, and an interior sleeve for a passport. Unlined so sand and crumbs shake out.',
    variants: [
      { name: 'Sand', swatch: '#c4b29a' },
      { name: 'Ink', swatch: '#1a1714' },
      { name: 'Olive', swatch: '#5c6748' },
    ],
  },
  {
    id: 'weekender',
    name: 'Cabin Weekender',
    category: 'Bags',
    price: 164,
    image: img('photo-1553062407-98eeb64c6a62'),
    blurb: 'Sized for overhead bins on short-haul flights. One main compartment, no puzzle of pockets.',
    details:
      'Water-resistant nylon, lockable zippers, and a shoe pocket that unzips from the outside. 38 × 24 × 20 cm.',
    variants: [
      { name: 'Charcoal', swatch: '#3a3835' },
      { name: 'Navy', swatch: '#243044' },
    ],
  },
  {
    id: 'pack-pouch',
    name: 'Packing Pouch Set',
    category: 'Bags',
    price: 42,
    image: img('photo-1553531889-56cc480ac5cb'),
    blurb: 'Three nested pouches so a carry-on stays sorted between cities.',
    details: 'Recycled ripstop with matte black hardware. The smallest pouch fits a toothbrush and charger.',
    variants: [
      { name: 'Stone', swatch: '#b7b1a8' },
      { name: 'Clay', swatch: '#8f4630' },
    ],
  },
  {
    id: 'rain-shell',
    name: 'City Rain Shell',
    category: 'Apparel',
    price: 128,
    image: img('photo-1591047139829-d91aecb6caea'),
    blurb: 'A hip-length shell that packs into its own pocket when the weather turns.',
    details: 'Two-layer recycled polyester, taped seams, and a visor brim that stays out of your eyes.',
    variants: [
      { name: 'Fog', swatch: '#d5d8dc' },
      { name: 'Black', swatch: '#111111' },
    ],
  },
  {
    id: 'merino-scarf',
    name: 'Merino Wrap',
    category: 'Apparel',
    price: 58,
    image: img('photo-1520903920243-00d872a2d1c9'),
    blurb: 'Fine merino that works as a scarf on the plane and a light layer in a cold lobby.',
    details: '170 gsm extra-fine merino. Machine wash cold, dry flat. 70 × 200 cm.',
    variants: [
      { name: 'Oat', swatch: '#e6d7c3' },
      { name: 'Rust', swatch: '#8f4630' },
      { name: 'Pine', swatch: '#2f4738' },
    ],
  },
  {
    id: 'wool-beanie',
    name: 'Watch Cap',
    category: 'Apparel',
    price: 36,
    image: img('photo-1576871337632-b9aef4c17ab9'),
    blurb: 'A dense wool cap that keeps its shape after a week in a coat pocket.',
    details: 'Lambswool blend, folded brim, one size with a soft stretch.',
    variants: [
      { name: 'Camel', swatch: '#b08968' },
      { name: 'Ink', swatch: '#1a1714' },
    ],
  },
  {
    id: 'flask',
    name: 'Day Flask',
    category: 'Drinkware',
    price: 34,
    image: img('photo-1602143407151-7111542de6e8'),
    blurb: '600 ml stainless steel that fits a car cup holder and a bike cage.',
    details: 'Double wall, leak-proof straw lid, and a powder coat that hides fingerprints. Keeps ice for 18 hours.',
    variants: [
      { name: 'Bone', swatch: '#efeae2' },
      { name: 'Sage', swatch: '#7d8b78' },
      { name: 'Ink', swatch: '#1a1714' },
    ],
  },
  {
    id: 'pour-over',
    name: 'Travel Pour-over',
    category: 'Drinkware',
    price: 46,
    image: img('photo-1495474472287-4d71bcdd2085'),
    blurb: 'A collapsible dripper and a cup that nests together for hotel mornings.',
    details: 'Borosilicate cone, silicone sleeve, and a linen filter set for ten brews.',
    variants: [
      { name: 'Clear', swatch: '#d9d3cb' },
      { name: 'Amber', swatch: '#c47a45' },
    ],
  },
  {
    id: 'headphones',
    name: 'Transit Headphones',
    category: 'Audio',
    price: 148,
    image: img('photo-1505740420928-5e560c06d30e'),
    blurb: 'Closed cups with enough isolation for a cabin, light enough for a full day.',
    details: '40 hour battery, USB-C, and a folding hinge. Includes a 3.5 mm cable for older seat screens.',
    variants: [
      { name: 'Graphite', swatch: '#4a4a4a' },
      { name: 'Cream', swatch: '#efe6d6' },
    ],
  },
  {
    id: 'earbuds',
    name: 'Pocket Buds',
    category: 'Audio',
    price: 79,
    image: img('photo-1590658268037-6bf12165a8df'),
    blurb: 'Small buds with a case that charges from the same cable as your phone.',
    details: 'IPX4, six-hour buds, and a case that adds two more charges. Touch controls, no app required.',
    variants: [
      { name: 'White', swatch: '#f4f1ea' },
      { name: 'Black', swatch: '#1a1714' },
    ],
  },
  {
    id: 'card-sleeve',
    name: 'Card Sleeve',
    category: 'Care',
    price: 28,
    image: img('photo-1627123424574-724758594e93'),
    blurb: 'Four cards and a folded bill. Thin enough to forget it is in a front pocket.',
    details: 'Vegetable-tanned leather, hand-burnished edges, unlined.',
    variants: [
      { name: 'Tan', swatch: '#a97449' },
      { name: 'Black', swatch: '#1a1714' },
    ],
  },
  {
    id: 'eye-mask',
    name: 'Cabin Eye Mask',
    category: 'Care',
    price: 24,
    image: img('photo-1541781774459-bb2af2f05b55'),
    blurb: 'A contoured mask that does not press on your lashes during a red-eye.',
    details: 'Mulberry silk face, memory-foam rim, and an adjustable strap that stays put when you turn.',
    variants: [
      { name: 'Ivory', swatch: '#f3eadf' },
      { name: 'Slate', swatch: '#6d7278' },
    ],
  },
]

export const categories = ['Bags', 'Apparel', 'Drinkware', 'Audio', 'Care'] as const

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
