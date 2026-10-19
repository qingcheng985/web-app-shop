import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import {
  getProduct,
  regionById,
  shippingFee,
  type Product,
  type RegionId,
} from '../data/catalog.ts'

export type CartLine = {
  productId: string
  variant: string
  qty: number
}

export type DetailedLine = CartLine & { product: Product }

type State = {
  lines: CartLine[]
  region: RegionId
  notice: string | null
}

type Action =
  | { type: 'add'; productId: string; variant: string; qty: number }
  | { type: 'setQty'; productId: string; variant: string; qty: number }
  | { type: 'remove'; productId: string; variant: string }
  | { type: 'region'; region: RegionId }
  | { type: 'clear' }
  | { type: 'clearNotice' }

const STORAGE_KEY = 'northline-shop'
const REGION_IDS: RegionId[] = ['US', 'UK', 'EU', 'AU', 'JP']

function isRegion(value: unknown): value is RegionId {
  return typeof value === 'string' && REGION_IDS.includes(value as RegionId)
}

function readPersisted(): Pick<State, 'lines' | 'region'> {
  const fallback = { lines: [] as CartLine[], region: 'US' as RegionId }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const data = JSON.parse(raw) as { lines?: CartLine[]; region?: unknown }
    const lines = Array.isArray(data.lines)
      ? data.lines.filter(
          (line) =>
            !!line &&
            typeof line.productId === 'string' &&
            typeof line.variant === 'string' &&
            typeof line.qty === 'number' &&
            line.qty > 0 &&
            getProduct(line.productId),
        )
      : []
    return { lines, region: isRegion(data.region) ? data.region : 'US' }
  } catch {
    return fallback
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find(
        (line) => line.productId === action.productId && line.variant === action.variant,
      )
      const lines = existing
        ? state.lines.map((line) =>
            line === existing ? { ...line, qty: line.qty + action.qty } : line,
          )
        : [
            ...state.lines,
            { productId: action.productId, variant: action.variant, qty: action.qty },
          ]
      const product = getProduct(action.productId)
      return {
        ...state,
        lines,
        notice: product ? `Added ${product.name} · ${action.variant}` : 'Added to bag',
      }
    }
    case 'setQty': {
      if (action.qty <= 0) {
        return {
          ...state,
          lines: state.lines.filter(
            (line) => !(line.productId === action.productId && line.variant === action.variant),
          ),
        }
      }
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.productId === action.productId && line.variant === action.variant
            ? { ...line, qty: action.qty }
            : line,
        ),
      }
    }
    case 'remove':
      return {
        ...state,
        lines: state.lines.filter(
          (line) => !(line.productId === action.productId && line.variant === action.variant),
        ),
      }
    case 'region':
      return { ...state, region: action.region }
    case 'clear':
      return { ...state, lines: [] }
    case 'clearNotice':
      return { ...state, notice: null }
    default:
      return state
  }
}

type ShopValue = {
  lines: DetailedLine[]
  region: ReturnType<typeof regionById>
  notice: string | null
  count: number
  subtotal: number
  shipping: number
  total: number
  add: (productId: string, variant: string, qty?: number) => void
  setQty: (productId: string, variant: string, qty: number) => void
  remove: (productId: string, variant: string) => void
  setRegion: (region: RegionId) => void
  clear: () => void
}

const ShopContext = createContext<ShopValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const persisted = useMemo(() => readPersisted(), [])
  const [state, dispatch] = useReducer(reducer, {
    ...persisted,
    notice: null,
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lines: state.lines, region: state.region }),
    )
  }, [state.lines, state.region])

  useEffect(() => {
    if (!state.notice) return
    const id = window.setTimeout(() => dispatch({ type: 'clearNotice' }), 2400)
    return () => window.clearTimeout(id)
  }, [state.notice])

  const value = useMemo<ShopValue>(() => {
    const lines = state.lines.flatMap((line) => {
      const product = getProduct(line.productId)
      return product ? [{ ...line, product }] : []
    })
    const count = lines.reduce((sum, line) => sum + line.qty, 0)
    const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0)
    const shipping = shippingFee(subtotal, state.region)
    return {
      lines,
      region: regionById(state.region),
      notice: state.notice,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      add: (productId, variant, qty = 1) => dispatch({ type: 'add', productId, variant, qty }),
      setQty: (productId, variant, qty) => dispatch({ type: 'setQty', productId, variant, qty }),
      remove: (productId, variant) => dispatch({ type: 'remove', productId, variant }),
      setRegion: (region) => dispatch({ type: 'region', region }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [state.lines, state.region, state.notice])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const value = useContext(ShopContext)
  if (!value) throw new Error('useShop must be used within ShopProvider')
  return value
}
