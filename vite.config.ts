import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  // Indica ao Vite onde a aplicação está hospedada
  base: "/dice-roller/",
  plugins: [react()],
  resolve:{
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    }
  }
})
