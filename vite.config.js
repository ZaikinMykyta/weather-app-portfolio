import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Для GitHub Pages: замените 'wheather-portfolio-app' на имя вашего репозитория
  // Если репозиторий называется username.github.io, используйте base: '/'
  base: process.env.NODE_ENV === 'production' 
    ? (process.env.VITE_BASE_PATH || '/wheather-portfolio-app/') 
    : '/',
})
