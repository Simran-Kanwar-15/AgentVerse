import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Copy scanner image on config start
try {
  const src = path.resolve(__dirname, '../../WhatsApp Image 2026-05-30 at 10.46.43.jpeg')
  const dest = path.resolve(__dirname, './public/scanner.jpeg')
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest)
    console.log('Scanner image copied successfully to public/scanner.jpeg!')
  }
} catch (err) {
  console.error('Error copying scanner image:', err)
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
