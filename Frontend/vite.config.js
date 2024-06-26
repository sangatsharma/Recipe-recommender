import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_WEATHER_API_KEY': JSON.stringify(process.env.VITE_WEATHER_API_KEY),
    'process.env.VITE_SERVER_URL': JSON.stringify(process.env.VITE_SERVER_URL)
  }
})
