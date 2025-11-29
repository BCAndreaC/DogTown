import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Servir carpeta "assets" como estática pública en Vite
  publicDir: 'assets',
  // Usar rutas relativas para que funcione bajo subcarpetas (e.g., /dogtown/ en Apache)
  base: './',
  build: {
    rollupOptions: {
      // Multi‑page build: incluir index.html y shop.html
      input: {
        main: 'index.html',
        shop: 'shop.html',
      },
    },
  },
})
