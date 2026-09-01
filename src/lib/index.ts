import type { CollectionEntry } from 'astro:content';

type AnyEntry = CollectionEntry<'blog'> | CollectionEntry<'projects'>;

/** "12 March 2026" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Rounded-up minutes at 200 wpm. */
export function readingTime(body: string): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}

/**
 * Drafts render in `astro dev` and disappear in production builds.
 * That is the entire preview system for now (Context.md §6).
 */
export function isPublished(entry: AnyEntry): boolean {
  return import.meta.env.PROD ? !entry.data.draft : true;
}

/** Newest first. */
export function byDate<T extends AnyEntry>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

/** Featured first, then `order` ascending, then newest first. */
export function sortProjects(
  entries: CollectionEntry<'projects'>[],
): CollectionEntry<'projects'>[] {
  return [...entries].sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    const ao = a.data.order ?? Infinity;
    const bo = b.data.order ?? Infinity;
    if (ao !== bo) return ao - bo;
    return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
  });
}

/** ISO week key, e.g. "2026-W35". */
function weekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

/**
 * The wireframe's "Current Streak": consecutive ISO weeks containing at least
 * one post, counted back from the week of the most recent post.
 */
export function weeklyStreak(posts: CollectionEntry<'blog'>[]): number {
  if (posts.length === 0) return 0;

  const weeks = new Set(posts.map((p) => weekKey(p.data.publishDate)));
  const latest = byDate(posts)[0].data.publishDate;

  let streak = 0;
  const cursor = new Date(latest);
  while (weeks.has(weekKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 7);
  }
  return streak;
}

/**
 * The wireframe's "Blog #N" — a stable chronological number, oldest post is #1.
 * Derived, never stored, so a new file needs no manual numbering.
 */
export function postNumbers(posts: CollectionEntry<'blog'>[]): Map<string, number> {
  const oldestFirst = [...posts].sort(
    (a, b) => a.data.publishDate.valueOf() - b.data.publishDate.valueOf(),
  );
  return new Map(oldestFirst.map((p, i) => [p.id, i + 1]));
}
