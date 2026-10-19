import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Local dev stays at /. GitHub Pages sets VITE_BASE=/web-app-shop/.
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
