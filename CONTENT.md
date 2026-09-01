# Content contract

This file is the specification for anything that writes content into this repo —
a human today, the CMS later. A program should be able to produce valid content
from this document alone.

**The write surface is exactly two directories:**

```
src/content/<collection>/<slug>.md     the post or project
src/assets/<collection>/<slug>/        its images
```

Nothing outside those two directories ever needs to change to publish. If it
does, that is a bug in the site, not in the content.

---

## Collections

Two: `blog` and `projects`. Schemas live in `src/content.config.ts` and are
enforced with Zod at build time. **A file that does not match fails the build.**
That is deliberate — a malformed post should stop the build rather than render
wrong.

---

## Rules

- **Filename is the slug.** `src/content/blog/multi-agent-blogger.md` becomes
  `/blog/multi-agent-blogger`.
- **Slugs are lowercase ASCII with hyphens.** No dates in filenames — the date
  lives in `publishDate`.
- **One post per file.** Always.
- **`draft: true` is the default.** Drafts render in `npm run dev` and are
  filtered out of production builds. That is the whole preview system.
- **Tags are lowercase ASCII with hyphens**, and share one vocabulary across both
  collections — `/tags/astro` lists matching posts *and* projects.
- **Images** go in `src/assets/<collection>/<slug>/` and are referenced relatively
  from the Markdown body.
- **Renaming a slug requires a redirect.** Add the old path to `src/redirects.ts`.

---

## Shared fields

Both collections take these.

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `title` | string, ≤ 90 chars | yes | — | |
| `description` | string, ≤ 160 chars | yes | — | Used for the listing and the meta description |
| `publishDate` | date (`YYYY-MM-DD`) | yes | — | |
| `updatedDate` | date | no | — | |
| `draft` | boolean | no | `true` | Hidden in production when true |
| `featured` | boolean | no | `false` | Surfaces on the homepage |
| `tags` | string[] | no | `[]` | |
| `cover` | local image path **or** absolute URL | no | — | See below |
| `coverAlt` | string | no | — | Set it whenever `cover` is set |
| `cmsId` | UUID | no | — | **Open end.** Maps a file to its CMS database row |
| `aiAssisted` | boolean | no | `false` | **Open end.** Marks AI-drafted content |

`cover` accepts either a path relative to the Markdown file (optimized at build
time) or an absolute URL. The CMS will upload to object storage and write a URL —
that host must be listed in `image.domains` in `astro.config.mjs` for remote
covers to be optimized.

## `blog` — additional fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `canonicalUrl` | URL | no | Set when the post was published elsewhere first |

## `projects` — additional fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `role` | string | yes | What you actually did |
| `timeline` | string | yes | Free text, e.g. `Jun–Aug 2026` |
| `status` | `active` \| `complete` \| `archived` | yes | |
| `tech` | string[] | yes | |
| `videoUrl` | URL | no | 16:9 media on the project card; `cover` is the poster frame |
| `repoUrl` | URL | no | |
| `liveUrl` | URL | no | |
| `order` | number | no | Manual sort within featured, ascending |

Projects sort by `featured` first, then `order` ascending, then newest first.
Blog posts sort by `publishDate`, newest first.

### Derived, never stored

Two things the blog pages display are computed at build time, so no frontmatter
field controls them and adding a post needs no manual bookkeeping:

- **`Blog #N`** — chronological index across all published posts, oldest is `#1`.
- **`Current Streak`** — consecutive ISO weeks containing at least one post,
  counted back from the most recent post's week.

---

## Worked example — `blog`

`src/content/blog/why-files-beat-databases.md`

```markdown
---
title: Why my blog is files, not a database
description: A database buys you queries you do not need and an outage you did not plan for.
publishDate: 2026-08-20
updatedDate: 2026-08-24
draft: false
featured: true
tags: [astro, architecture]
cover: ../../assets/blog/why-files-beat-databases/cover.png
coverAlt: A folder of Markdown files next to a crossed-out database icon
canonicalUrl: https://example.com/blog/why-files-beat-databases
cmsId: 3f2a1c88-9b4e-4d7a-9f11-1c0b7d6e4a52
aiAssisted: false
---

## What the database was actually for

One author. Roughly twenty posts. No comments, no accounts, no search.

The queries were "give me all posts, newest first" and "give me one post by
slug". That is a `readdir` and a file read.
```

Produces `/blog/why-files-beat-databases`.

---

## Worked example — `projects`

`src/content/projects/ai-blogger-studio.md`

```markdown
---
title: AI Blogger Studio
description: A multi-agent writing pipeline that researches, drafts and edits blog posts end to end.
publishDate: 2026-07-14
draft: false
featured: true
order: 1
tags: [ai, langgraph, python]
cover: ../../assets/projects/ai-blogger-studio/cover.png
coverAlt: Graph of four agents connected in a loop
role: Sole engineer — architecture, agents, evaluation
timeline: Apr–Jul 2026
status: active
tech: [Python, LangGraph, LangChain, FastAPI, SQLite]
videoUrl: https://example.com/demo.mp4
repoUrl: https://github.com/Prashant-Mahto/AI-Blogger-Studio
liveUrl: https://example.com
cmsId: 8c1d4e70-2a5b-4f39-b8c2-6de905f31a77
aiAssisted: false
---

## The problem

Writing a decent post takes hours, and most of those hours are not writing.
```

Produces `/projects/ai-blogger-studio`.

---

## Scaffolding

```bash
node scripts/new-content.mjs blog "Why files beat databases"
node scripts/new-content.mjs projects "AI Blogger Studio"
```

Writes a valid `draft: true` file and creates its assets directory. The CMS
replaces this script by writing the same shape directly.

---

## Verifying a change

```bash
npm run check   # types and schema
npm run build   # fails on any invalid frontmatter
```
