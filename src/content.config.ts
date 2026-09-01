import { defineCollection } from 'astro:content';
import type { SchemaContext } from 'astro/content/config';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const base = ({ image }: SchemaContext) => ({
  title: z.string().max(90),
  description: z.string().max(160),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  cover: z.union([image(), z.url()]).optional(),
  coverAlt: z.string().optional(),

  // Open ends — unused today, written by the CMS later (Context.md §9)
  cmsId: z.uuid().optional(),
  aiAssisted: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: (ctx) =>
    z.object({
      ...base(ctx),
      canonicalUrl: z.url().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: (ctx) =>
    z.object({
      ...base(ctx),
      role: z.string(),
      timeline: z.string(), // "Jun–Aug 2026"
      status: z.enum(['active', 'complete', 'archived']),
      tech: z.array(z.string()),
      videoUrl: z.url().optional(), // 16:9 card media; `cover` is the poster frame
      repoUrl: z.url().optional(),
      liveUrl: z.url().optional(),
      order: z.number().optional(), // manual sort
    }),
});

export const collections = { blog, projects };
