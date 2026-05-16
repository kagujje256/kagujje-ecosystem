import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'movies28-daily4.zocomputer.io',
      'ugmovies-daily4.zocomputer.io',
      'ts8.zocomputer.io',
      '.zocomputer.io',
    ],
  },
})