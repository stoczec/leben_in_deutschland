import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import questionLangs from './scripts/vite-plugin-question-langs.js'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    questionLangs(),
    VitePWA({
      disable: command !== 'build',
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'favicon-96x96.png', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Leben in Deutschland — Einbürgerungstest',
        short_name: 'Leben in DE',
        description: 'Übe alle 460 Fragen des Einbürgerungstests in 4 Sprachen (de/en/ua/ru).',
        lang: 'de',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#15140f',
        background_color: '#15140f',
        categories: ['education', 'reference'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'lid-images',
              expiration: { maxEntries: 320, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Group by resolved module path. Naming the package instead pulls in the
        // antd barrel module and defeats tree-shaking.
        manualChunks(id) {
          const path = id.replace(/\\/g, '/');
          // The question catalogue changes far less often than app code.
          if (/\/src\/data\/(dataNew\.js\?base|lands\.js)$/.test(path)) return 'question-data';
          const lang = path.match(/\/src\/data\/dataNew\.js\?lang=(\w+)$/);
          if (lang) return `question-${lang[1]}`;
          const after = path.split('/node_modules/').pop();
          if (after === path) return;
          if (/^(react|react-dom|scheduler)\//.test(after)) return 'react-vendor';
          if (/^(antd|@ant-design\/|rc-)/.test(after)) return 'antd-vendor';
        },
      },
    },
  },
}))
