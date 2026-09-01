---
title: AI Blogger Studio
description: A multi-agent writing pipeline that researches, drafts and edits blog posts end to end.
publishDate: 2026-07-14
draft: false
featured: true
order: 1
tags: [ai, langgraph, python]
role: Sole engineer — architecture, agents, evaluation
timeline: Apr–Jul 2026
status: active
tech: [Python, LangGraph, LangChain, FastAPI, SQLite]
repoUrl: https://github.com/Prashant-Mahto/AI-Blogger-Studio
---

## The problem

Writing a decent post takes hours, and most of those hours are not writing. They
are research, structure, and the four rewrites it takes before a draft stops
sounding like notes.

Single-prompt "write me a blog post" tools collapse all of that into one call,
and the output reads exactly like one call.

## What I built

A pipeline of specialised agents, each with one job and its own prompt, wired
together as a LangGraph state machine:

- **Researcher** — gathers sources and extracts claims with citations.
- **Outliner** — turns claims into a structure, and rejects thin sections.
- **Writer** — drafts one section at a time against the outline.
- **Editor** — critiques the draft and can send it back to the writer.

The editor loop is the part that matters. It runs up to three times and stops
early when its critique returns no blocking issues, which keeps token cost bounded
without capping quality at one pass.

## What I'd do differently

State lives in a single fat object passed between every node. It was fast to
build and is now the thing that makes adding an agent annoying. Splitting it into
per-agent slices with an explicit reducer is the next change.

## Where it goes

The agents here become the AI service behind a local CMS — the same pipeline,
wrapped in a local API, called from an editor side panel.
