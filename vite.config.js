// filepath: c:\Users\ROG GEPHYRUS\OneDrive\Desktop\NexHireAI\vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  server: {
    proxy:{
      '/api':'http://localhost:3000', // Adjust to your backend server URL
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
