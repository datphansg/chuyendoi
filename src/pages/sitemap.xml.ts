import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sortStories, STORIES_PER_PAGE } from '../lib/stories';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Astro site URL is required to generate the sitemap.');

  const stories = sortStories(await getCollection('stories'));
  const urls: { path: string; lastmod?: Date }[] = [
    { path: '/', lastmod: stories[0]?.data.publishedAt },
    ...stories.map((story) => ({
      path: `/truyen/${story.data.slug}/`,
      lastmod: story.data.publishedAt,
    })),
    ...Array.from({ length: Math.max(0, Math.ceil(stories.length / STORIES_PER_PAGE) - 1) }, (_, index) => ({
      path: `/trang/${index + 2}/`,
    })),
  ];
  const body = urls.map(({ path, lastmod }) => {
    const lastmodTag = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
    return `<url><loc>${new URL(path, site).href}</loc>${lastmodTag}</url>`;
  }).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
