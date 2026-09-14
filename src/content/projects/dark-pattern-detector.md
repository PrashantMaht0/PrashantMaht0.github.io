---
title: Automated Dark Pattern Detector
description: Opens a website in a real browser, clicks through its cookie banner, and reports manipulative consent designs mapped to GDPR articles.
publishDate: 2026-08-09
draft: false
order: 4
tags: [ai, azure, gdpr, privacy]
role: Solo project
timeline: Jul–Aug 2026
status: complete
tech: [Azure AI Foundry, Azure AI Content Understanding, Azure AI Search, Playwright, FastAPI, React, TypeScript]
repoUrl: https://github.com/PrashantMaht0/Automated_Dark_Pattern_Detector
---

## Why it exists

**Dark patterns** are design choices crafted to push people into actions they might
not otherwise take — a hidden reject button, pre-ticked tracking, a maze of screens
to refuse. They improve short-term metrics and damage long-term trust.

## What it does

Give it a website address. It opens the site in a real browser, clicks through the
cookie banner the way a visitor would, and reports which manipulative tricks it
found — and which GDPR article each one breaks.

- **Explores the consent flow on its own** — Accept, Reject, Manage, nested
  preference panels, including ones that only appear after a click.
- **Detects 14 dark patterns**, each mapped to the GDPR article it puts at risk.
- **Measures, doesn't guess.** Colour contrast, font size and button area are read
  from the live page, so "the reject link is 1.9:1 contrast" is a measurement, not
  an AI opinion.
- **Points at the evidence** — every finding highlights the exact button on a
  screenshot of the real page.
- **Reports nothing when there is nothing to report.** A clean site returns an
  empty result, not an invented one.
- **Can't be talked out of it.** A page cannot hide instructions in its text or
  images to stop the AI reporting it.

Findings are advisory, not legal advice.

## How it works

```
URL → crawl → prune → Content Understanding → Prompt Shields → agent → report
```

1. **Crawl** — a fresh browser clicks through every consent choice, screenshotting each screen.
2. **Prune** — only screens where a real decision happens are kept, which keeps AI cost down.
3. **Content Understanding** — reads each screenshot and returns its text plus the position of every button and toggle.
4. **Prompt Shields** — checks the site's own words for hidden instructions aimed at the AI.
5. **Agent** — weighs the measurements against fixed rules and decides which patterns are actually proven, using an Azure AI Search index of GDPR and EU DSA articles only to confirm citations.
6. **Report** — findings with their GDPR article and the button highlighted.

## Evaluation

Scans are scored with Azure's built-in evaluators for **groundedness** and
**relevance**. The judge is a model too, so each finding is scored three times and
the spread between verdicts is recorded — rows with a spread of 1.0 or more are
ignored rather than trusted.
