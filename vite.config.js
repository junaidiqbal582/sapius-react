import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vite falls back to index.html for unknown paths in dev and preview only.
  // Production hosts need the same fallback for /pricing and /workspace deep
  // links; on Vercel that is the rewrite in vercel.json.
})
