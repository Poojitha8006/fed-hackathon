import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
     base: '/fed-hackathon/',
    
    port: 5173
  }
})

