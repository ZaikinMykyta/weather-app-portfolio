import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Для GitHub Pages: замените 'weather-app-portfolio' на имя вашего репозитория
  // Если репозиторий называется username.github.io, используйте base: '/'
  base: mode === 'production' 
    ? (process.env.VITE_BASE_PATH || '/weather-app-portfolio/') // eslint-disable-line no-undef
    : '/',
}))
