import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vite already falls back to index.html for unknown paths in dev and preview,
  // so /pricing and /workspace deep links work without extra config.
})
