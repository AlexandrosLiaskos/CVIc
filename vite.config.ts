import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite'

// Plugin to inject proj4 initialization script into HTML head
const proj4InitPlugin = (): Plugin => {
  return {
    name: 'proj4-init',
    transformIndexHtml(html) {
      // Inject proj4 initialization script before any other scripts
      const initScript = `
        <script>
          // Emergency proj4 initialization - runs before any modules load
          console.log('Initializing proj4 emergency fallback...');

          // Create placeholder objects that will be replaced when real proj4 loads
          if (typeof window !== 'undefined') {
            window.proj4 = window.proj4 || function() {
              console.warn('proj4 not yet loaded, call deferred');
              return null;
            };
            window.proj42 = window.proj42 || function() {
              console.warn('proj42 not yet loaded, call deferred');
              return null;
            };

            // Add defs method placeholder
            window.proj4.defs = window.proj4.defs || function() {
              console.warn('proj4.defs not yet loaded, call deferred');
              return null;
            };
            window.proj42.defs = window.proj42.defs || function() {
              console.warn('proj42.defs not yet loaded, call deferred');
              return null;
            };

            console.log('Emergency proj4/proj42 placeholders created');
          }
        </script>
      `;

      // Insert the script right after the <head> tag
      return html.replace('<head>', '<head>' + initScript);
    }
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  // Use correct base path for GitHub Pages
  base: '/CVIc/',
  plugins: [
    react(),
    proj4InitPlugin()
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
