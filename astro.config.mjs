import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://chuyendoi-3zr.pages.dev',
  output: 'static',
});
