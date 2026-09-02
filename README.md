# PrashantMaht0.github.io

My personal portfolio website. Astro, Markdown content, static output.

Live at **https://prashantmaht0.github.io**

Every push to `main` builds and deploys via GitHub Actions
(`.github/workflows/deploy.yml`). Pull requests are type-checked and built by
`ci.yml` but never deployed.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321 — drafts visible here
npm run check    # types + content schema
npm run build    # production build — drafts excluded
npm run preview  # serve the build locally
```

## Add a post

Add one Markdown file. That is the whole process — no code change, ever.

```bash
node scripts/new-content.mjs blog "Why files beat databases"
```

Then edit the file it created, set `draft: false`, and commit. Full field
reference and worked examples are in [CONTENT.md](./CONTENT.md).

Same for a project, with `projects` instead of `blog`.

## Layout

```
src/site.config.ts     name, tagline, nav, socials, SEO defaults
src/content.config.ts  the schema contract — see CONTENT.md
src/content/           blog/ and projects/ Markdown
src/assets/            images, mirrored by collection and slug
src/redirects.ts       append-only slug redirect map
src/styles/global.css  design tokens
```

## Deploying

One-time setup: **Settings → Pages → Source → GitHub Actions**.

After that, `git push` to `main` is the whole deploy. The workflow runs
`astro check` and `astro build`, then publishes `dist/`.

## Status

See the sprint checklists in `Context.md` for what is built and what is not.
