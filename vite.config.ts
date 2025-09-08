import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  // Use correct base path for GitHub Pages
  base: '/CVIc/',
  plugins: [
    react()
  ],
  server: {
    port: 3000,
    open: false, // Disable auto-opening to avoid browser spawn errors
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
      external: [],
      output: {
        manualChunks: {
          // Bundle proj4 with georaster-layer to ensure proper initialization order
          'georaster-layer': ['proj4', 'georaster-layer-for-leaflet'],
          'georaster': ['georaster'],
          'geotiff': ['geotiff'],
          'leaflet': ['leaflet', 'leaflet-draw', 'react-leaflet'],
          'turf': ['@turf/turf']
        }
      }
    }
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
alias: {}
  },
  optimizeDeps: {
    include: [
      'proj4',
      'react',
      'react-dom',
      'react-router-dom',
      'leaflet',
      'leaflet-draw',
      'georaster',
      'georaster-layer-for-leaflet',
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
