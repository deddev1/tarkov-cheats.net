import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://tarkov-cheats.net',
  trailingSlash: 'always',
  redirects: {
    '/cheats/': '/products/tarkov-cheats/',
    '/cheats/lite/': '/products/tarkov-cheats/',
    '/cheats/pro/': '/products/tarkov-cheats/',
    '/cheats/elite/': '/products/tarkov-cheats/elite/',
    '/cheats/compare/': '/blog/tarkov-lite-vs-pro/',
    '/products/dota-2-cheats/': '/products/tarkov-cheats/',
    '/products/dota-2-cheats/elite/': '/products/tarkov-cheats/elite/',
    '/products/dota-2-cheats/utilities/': '/products/tarkov-cheats/utilities/',
    '/products/fortnite-cheats/': '/products/tarkov-cheats/',
    '/products/fortnite-cheats/elite/': '/products/tarkov-cheats/elite/',
    '/products/fortnite-cheats/utilities/': '/products/tarkov-cheats/utilities/',
    '/products/aion-2-cheats/': '/products/tarkov-cheats/',
    '/products/aion-2-cheats/elite/': '/products/tarkov-cheats/elite/',
    '/products/aion-2-cheats/utilities/': '/products/tarkov-cheats/utilities/',
    '/go/fortnite/': '/go/tarkov/',
    '/go/aion-2/': '/go/tarkov/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
