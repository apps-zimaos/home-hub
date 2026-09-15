import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],

    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
          
          handler: 'NetworkFirst',
        }
      ]
    },

    manifest: {
      name: 'home-hub',
      short_name: 'hub',
      description: 'Home hob to OscarOS',
      theme_color: '#1b1b1f',
      background_color: '#1b1b1f',

      display: 'standalone',
      orientation: 'portrait',

      start_url: '/',
      scope: '/',

      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },

    devOptions: {
      enabled: true,
    },
  })],
})