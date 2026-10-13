import type { CollectionEntry } from 'astro:content';

export type Story = CollectionEntry<'stories'>;

export const STORIES_PER_PAGE = 18;

export function sortStories(stories: Story[]) {
  return stories.toSorted(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export function storyPageNumber(index: number) {
  return Math.floor(index / STORIES_PER_PAGE) + 1;
}

export function storyFeedPath(page: number, slug: string) {
  return page === 1 ? `/#${slug}` : `/trang/${page}/#${slug}`;
}
