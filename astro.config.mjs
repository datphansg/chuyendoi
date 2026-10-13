import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://truyen-doc.pages.dev',
  output: 'static',
});
