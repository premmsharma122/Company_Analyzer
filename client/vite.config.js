import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://company-analyzer-tyeq.vercel.app/', // <--- Update this line
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
