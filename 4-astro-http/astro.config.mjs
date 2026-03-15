// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import db from '@astrojs/db';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), db(), svelte()],

  
  adapter: node({
    mode: 'standalone',
  }),
});