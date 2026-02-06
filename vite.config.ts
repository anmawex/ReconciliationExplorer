import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Recharts - large charting library
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'charts-vendor';
          }
          // TanStack Table
          if (id.includes('@tanstack/react-table')) {
            return 'table-vendor';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'form-vendor';
          }
          // Radix UI components (exclude react dependencies)
          if (id.includes('@radix-ui')) {
            return 'radix-vendor';
          }
          // React core (only exact packages)
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
})
