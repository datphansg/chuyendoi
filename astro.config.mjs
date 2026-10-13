import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://chuyendoi.pages.dev',
  output: 'static',
});
