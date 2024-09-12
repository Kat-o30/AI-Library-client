import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests starting with `/upload` to the backend
      '/upload': {
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,  // Adjust the origin of the request to the target URL
        secure: false,       // If you're using HTTPS in development, set this to true
        rewrite: (path) => path.replace(/^\/upload/, '/upload'), // Ensure the path remains unchanged
      },
      // You can add other API endpoints here if needed
    },
  },
})
