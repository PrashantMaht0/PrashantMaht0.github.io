/**
 * Append-only slug redirect map. Starts empty on purpose.
 *
 * Whenever a slug is renamed, add the old path here so already-shared URLs
 * keep working. The CMS appends entries automatically (Context.md §9).
 *
 * Format: '/blog/old-slug': '/blog/new-slug'
 */
export const redirects: Record<string, string> = {
  // The wireframe folds "About" into the homepage; keep the old path alive.
  '/about': '/#about',
};
