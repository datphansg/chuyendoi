import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    cover: z.string(),
    coverAlt: z.string(),
    description: z.string().max(240),
    publishedAt: z.coerce.date(),
    genres: z.array(z.string()).min(1),
    author: z.string().default('Mộc'),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { stories };
