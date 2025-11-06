// @ts-check
import { fileURLToPath } from 'node:url';

import node from '@astrojs/node';
import react from '@astrojs/react';
import VitePWA from '@vite-pwa/astro';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const enablePwa = process.env.ENABLE_PWA !== 'false';
const businessName = process.env.BUSINESS_NAME ?? 'PerfumeStore';
const primaryColor = process.env.PRIMARY_COLOR ?? '#C59D5F';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  site: process.env.BUSINESS_DOMAIN ?? 'http://localhost:4321',
  integrations: [
    react(),
    enablePwa
      ? VitePWA({
          base: '/',
          registerType: 'autoUpdate',
          includeAssets: ['favicon.svg', 'icons/icon-192.svg', 'icons/icon-512.svg', 'icons/icon-maskable.svg'],
          manifest: {
            name: businessName,
            short_name: businessName,
            description:
              process.env.BUSINESS_DESCRIPTION ??
              'Multi-tenant artisanal commerce experience.',
            theme_color: primaryColor,
            background_color: '#ffffff',
            display: 'standalone',
            start_url: '/',
            icons: [
              {
                src: '/icons/icon-192.svg',
                sizes: '192x192',
                type: 'image/svg+xml',
                purpose: 'any'
              },
              {
                src: '/icons/icon-512.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'any'
              },
              {
                src: '/icons/icon-maskable.svg',
                sizes: '512x512',
                type: 'image/svg+xml',
                purpose: 'maskable'
              }
            ]
          },
          devOptions: {
            enabled: true
          }
        })
      : null
  ].filter(Boolean),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});
