---
title: Why my blog is files, not a database
description: A database buys you queries you do not need and an outage you did not plan for.
publishDate: 2026-08-20
draft: false
featured: true
tags: [astro, architecture]
---

I started this site as Next.js talking to a hosted Postgres. Two days in I
deleted the database and moved every post into a folder of Markdown files.

Here is the reasoning, because it generalises.

## What the database was actually for

One author. Roughly twenty posts. No comments, no accounts, no search. The
queries were "give me all posts, newest first" and "give me one post by slug".

That is a `readdir` and a file read. Sorting twenty items is free.

## What it cost

- A service that can be down while my site is up.
- A free tier that pauses on idle — so the first visitor after a quiet week waits
  on a cold start.
- Connection handling, migrations, and a second thing to back up.
- A local dev setup that needs the network.

None of this bought me anything, because the read pattern never needed it.

## What files buy instead

Content is diffable. A typo fix is a commit, and the history is the revision
history. Rolling back a bad edit is `git revert`, not a restore.

Content is portable. Every post is a `.md` file that renders in any editor and
would survive a move to any other framework in an afternoon.

Content is trivially generated. This is the one that actually decided it. I am
building a local app that drafts posts and publishes them. Publishing to a
database means an API, auth, and a token. Publishing to files means writing a
file and running `git push`.

## When this is wrong

The moment you have more than one author, or content that changes without a
deploy, or anything a reader writes — comments, likes, submissions — you need a
database, and the file approach becomes a worse database.

I do not have any of those. So I do not have a database.
