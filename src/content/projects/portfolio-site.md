---
title: This site
description: A static portfolio built so that publishing a post never requires touching code.
publishDate: 2026-09-01
draft: false
featured: true
order: 2
tags: [astro, design]
role: Designer and engineer
timeline: Sep 2026
status: active
tech: [Astro, Tailwind, Markdown, Vercel]
repoUrl: https://github.com/Prashant-Mahto/protfolio-prashant-mahto
---

## The constraint

One rule shaped every decision: **adding a post means adding one Markdown file.**
No route to register, no component to edit, no index to update. If publishing
ever needs a code change, the design has failed.

That rule exists because a program will eventually write these files. A local CMS
app will draft, serialise to Markdown, commit, and push. The site has to be a
thing a program can publish to without knowing anything about the site.

## How it works

Content lives as Markdown in `src/content/`, validated at build time by a Zod
schema. A malformed file fails the build rather than rendering wrong — which
matters far more once a program is generating them.

Everything is static. No database, no runtime API, nothing that can be down. The
whole site builds from a git clone with the network off.

## Deliberately unused

A few fields exist today with nothing reading them: a `cmsId` to map a file back
to its database row, an `aiAssisted` flag, and an empty redirect map for the day
a slug gets renamed. Retrofitting any of those across twenty posts later is
miserable. They cost nothing now.
