import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // Use root path for production
  base: '/',
  plugins: [
    react()
  ],
  server: {
    port: 3000,
    open: true,
    hmr: {
      port: 24678, // Use a different port for HMR WebSocket
    },
    // Add CORS configuration
    cors: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable sourcemaps for debugging
    minify: false, // Disable minification completely
    // Ensure proper MIME types for assets
    assetsInlineLimit: 0, // Don't inline assets as base64
    // Ensure these modules are not externalized
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      // Make sure proj4-fully-loaded is properly handled
      external: [],
      output: {
        manualChunks: {
          // Group proj4 and proj4-fully-loaded together to avoid initialization issues
          'proj4-bundle': ['proj4', 'proj4-fully-loaded']
        }
      }
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      // Alias proj4-fully-loaded to our custom implementation
      'proj4-fully-loaded': path.resolve(__dirname, 'src/lib/proj4-with-defs.js')
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'leaflet',
      'leaflet-draw',
      'proj4',
      'proj4-fully-loaded',
      'georaster',
      'georaster-layer-for-leaflet',
      'firebase/app',
      'firebase/auth',
      'firebase/storage',
      'idb',
      'shpjs',
      'geotiff',
      '@turf/turf'
    ],
    esbuildOptions: {
      target: 'es2020'
    },
    // Force inclusion of dependencies
    force: true
  }
})
