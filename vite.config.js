import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/Components'),
      '@assets': path.resolve(__dirname, 'src/Assets'),
      '@utils': path.resolve(__dirname, 'src/Utils'),
      '@headerCustomizer': path.resolve(__dirname, 'src/Provider/headerCustomizer.jsx'),
      '@customElements': path.resolve(__dirname, 'src/Components/CustomElements'),
      '@lib': path.resolve(__dirname, 'src/Lib'),
      "@hooks": path.resolve(__dirname, 'src/Hooks'),
      "@api": path.resolve(__dirname, 'src/Api'),
      "@redux": path.resolve(__dirname, 'src/Redux'),
      "@requesMakerWithCurrentUrl" : path.resolve(__dirname, "src/Lib/NetworkHandler.js")
    }
  }
})