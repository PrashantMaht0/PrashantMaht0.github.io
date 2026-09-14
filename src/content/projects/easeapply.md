---
title: EaseApply
description: Finds job postings that never reach LinkedIn by reading company ATS boards directly, then verifies every AI claim against the source text.
publishDate: 2026-09-13
draft: false
order: 1
tags: [ai, agents, aws, job-search]
role: Solo — "Agents for Humans" hackathon entry
timeline: Sep 2026
status: active
tech: [AWS Strands Agents, Amazon Bedrock, AgentCore Runtime, Python, SQLite, Amazon S3, EventBridge, Amazon SES]
repoUrl: https://github.com/PrashantMaht0/EasyApply
liveUrl: https://huggingface.co/spaces/Prashant-Mahto/easeapply
---

## The problem

Job hunting is split across systems that do not talk to each other. Every company
runs its own Applicant Tracking System — Greenhouse, Lever, Ashby and a dozen
others — each with its own board and data format. Aggregators only carry a slice of
what is open, and a large share of active openings never leave the company's own
board.

Pointing an AI agent at this fails in predictable ways: unbounded loops,
hallucinated requirements, runs that behave differently on the same input, and
the cost of sending hundreds of postings to a model.

## The approach

EaseApply is a **deterministic, zero-trust** discovery and tailoring engine.

- **Deterministic** — control flow is ordinary Python. Agents are called in a fixed
  order; every branch is one of seventeen code-level predicates, and no model
  decides what runs next. That is what makes an unattended 7am run safe.
- **Zero trust** — no model output is treated as fact. Every claim is a proposal
  until code verifies it against the source text. Anything that fails is dropped
  and counted.

## The pipeline

1. Extract a structured profile from the resume and intake form.
2. Propose around 40 employers likely to be hiring, and resolve them to real ATS boards.
3. Query those boards directly over public JSON endpoints — no scraping, no credentials.
4. Cross-check each posting against open job APIs. Recent, unsyndicated, strong
   matches are flagged as **Hidden Gems**.
5. Filter with plain code first — typically tens of thousands of postings down to
   around a hundred — then score survivors in parallel batches of five.
6. Verify every score and every quoted skill claim against the stored description.
7. Tailor resume bullets for top matches, grounded in verified quotes.
8. Email a digest of genuinely new postings every morning.

## The verification gateway

A model output is an uncommitted proposal until deterministic code accepts it:

- **ID contract** — every posting gets an ID before any agent sees it; IDs a model
  returns that were not in the request are discarded, so a fabricated job is
  structurally impossible.
- **Span verification** — every skill claim must carry a verbatim quote that code
  can locate in the job description or resume. The survival rate is shown to the
  user.
- **Fenced input** — resume and job text reach the model as tagged data, never as
  instructions.
- Schema guard, range clamp and a per-run budget guard round it out.

## Running unattended

The pipeline runs on Amazon Bedrock AgentCore Runtime. EventBridge invokes it at
07:00 Europe/Dublin; state lives in a SQLite blackboard synced to S3, trimmed to
roughly 7 MB instead of 150 MB. A daily run takes about a minute and costs roughly
$0.009. Amazon Nova 2 Lite is the default model — in a controlled comparison it
verified 96–99% of claims against 68–84% for Nova Lite, and was faster and cheaper.

The [live demo](https://huggingface.co/spaces/Prashant-Mahto/easeapply) replays a
stored run of 23,114 postings with no network or model calls.
