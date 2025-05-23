import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  server:{
    host:true,
    allowedHosts: ['footsy.up.railway.app'],
    port:5173,
    watch:{
      usePolling:true,
    }
  },
  plugins: [react(),tailwindcss()],
})
