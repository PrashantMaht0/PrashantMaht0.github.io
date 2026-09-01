#!/usr/bin/env node
/**
 * Scaffolds a content file with valid frontmatter.
 *
 *   node scripts/new-content.mjs blog "Why files beat databases"
 *   node scripts/new-content.mjs projects "AI Blogger Studio"
 *
 * The CMS replaces this script (Context.md §9) — it writes the same shape.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const [collection, title] = process.argv.slice(2);

if (!['blog', 'projects'].includes(collection) || !title) {
  console.error('usage: node scripts/new-content.mjs <blog|projects> "Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const file = `src/content/${collection}/${slug}.md`;

if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const common = `title: ${JSON.stringify(title)}
description: "TODO — one sentence, max 160 characters."
publishDate: ${today}
draft: true
featured: false
tags: []`;

const extra =
  collection === 'projects'
    ? `
role: "TODO"
timeline: "TODO — e.g. Jun–Aug 2026"
status: active
tech: []`
    : '';

await mkdir(`src/content/${collection}`, { recursive: true });
await mkdir(`src/assets/${collection}/${slug}`, { recursive: true });
await writeFile(file, `---\n${common}${extra}\n---\n\nTODO\n`);

console.log(`created ${file}`);
console.log(`images   src/assets/${collection}/${slug}/`);
