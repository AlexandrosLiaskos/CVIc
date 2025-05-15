import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to inject proj4 fix
    {
      name: 'inject-proj4-fix',
      transformIndexHtml(html) {
        // Add a script to fix proj4 initialization issues
        return html.replace(
          '</head>',
          `<script>
            // Fix for proj4 initialization issues
            window.fixProj4Error = function() {
              if (window.proj4 && typeof window.proj4.defs !== 'function') {
                console.log('Fixing proj4 initialization...');
                if (typeof window.proj4.default === 'function') {
                  window.proj4 = window.proj4.default;
                  console.log('Fixed proj4 using default export');
                }
              }
            };

            // Run the fix when the window loads and periodically
            window.addEventListener('load', window.fixProj4Error);
            // Also try to fix it every 100ms for the first second
            for (let i = 1; i <= 10; i++) {
              setTimeout(window.fixProj4Error, i * 100);
            }
          </script>
          </head>`
        );
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          map: ['leaflet', 'leaflet-draw', '@turf/turf'],
          // Only include the core proj4 library
          proj4: ['proj4']
        }
      }
    },
    // Ensure the build is optimized for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
        drop_debugger: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.VITE_FIREBASE_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
    'process.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
    'process.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
    'process.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET),
    'process.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    'process.env.VITE_FIREBASE_APP_ID': JSON.stringify(process.env.VITE_FIREBASE_APP_ID)
  }
})
