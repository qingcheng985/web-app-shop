import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index.ts'
import './index.css'
import App from './App.tsx'

const redirect = sessionStorage.getItem('gh-pages-redirect')
if (redirect) {
  sessionStorage.removeItem('gh-pages-redirect')
  const url = new URL(redirect)
  if (url.pathname !== window.location.pathname) {
    window.history.replaceState(null, '', url.pathname + url.search + url.hash)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
