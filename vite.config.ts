import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/hooks': '/src/hooks',
      '@/data': '/src/data',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
      '@/styles': '/src/styles',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})