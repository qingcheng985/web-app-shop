import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages project site: build with VITE_BASE=/web-app-shop/
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 8888,
    host: true,
  },
  preview: {
    port: 8888,
    host: true,
  },
})
