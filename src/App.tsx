import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext.tsx'
import { CartPage } from './pages/CartPage.tsx'
import { CatalogPage } from './pages/CatalogPage.tsx'
import { CheckoutPage } from './pages/CheckoutPage.tsx'
import { ProductRoute } from './pages/ProductPage.tsx'
import { Shell } from './Shell.tsx'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ShopProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<CatalogPage />} />
            <Route path="product/:id" element={<ProductRoute />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </ShopProvider>
    </BrowserRouter>
  )
}
