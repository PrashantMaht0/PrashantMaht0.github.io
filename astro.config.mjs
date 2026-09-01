// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { siteUrl } from './src/site.config.ts';
import { redirects } from './src/redirects.ts';

export default defineConfig({
  site: siteUrl,
  redirects,
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  fonts: [
    {
      // Self-hosted at build time — no Google Fonts request at runtime.
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [300, 400, 500, 700, 800],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    },
  ],
  image: {
    // Open end (Context.md §9): the CMS will upload covers to object storage
    // and write remote URLs into frontmatter. Add that host here — no other
    // change is needed for remote covers to be optimized.
    domains: [],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
