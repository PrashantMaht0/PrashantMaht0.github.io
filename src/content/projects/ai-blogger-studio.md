---
title: AI Blogger — Multi-Agent Studio
description: Five AI agents research, fact-check, write, edit and publish blog posts — with a human approval step before anything goes live.
publishDate: 2026-08-19
draft: false
order: 3
tags: [ai, multi-agent, langgraph, llm-evaluation]
role: Solo project
timeline: Aug 2026
status: complete
tech: [LangGraph, Ollama, Google Gemini, LangSmith, MCP, PostgreSQL, Gradio, Docker]
repoUrl: https://github.com/PrashantMaht0/multi_agent_ai_blogger
---

## Overview

Type a topic and five small agents take it from there: one searches the web, one
checks the findings are true, one writes the post, one reviews how it reads, and one
publishes it to Google Blogger.

Rather than one large model doing everything in a single prompt, the work is split
into fixed steps with clear handoffs, wired together with **LangGraph**. Each agent
has one job and one prompt, which makes it possible to tell *which* step went wrong
when the output is bad — and that turned out to matter enormously.

## The agents

| Agent | Model | Job |
| --- | --- | --- |
| **Researcher** | qwen3 | Searches the web for facts about the topic |
| **Validator** | gemini-3.5-flash-lite | The only step that checks whether facts are true |
| **Writer** | qwen3 | Turns approved research into a post — no invented numbers, people or examples |
| **Editor** | llama3.1:8b | Judges how the post reads; does not check facts |
| **Publisher** | llama3.1:8b | Posts the approved draft and returns the live link |

```
Topic → RESEARCHER ⇄ VALIDATOR → WRITER ⇄ EDITOR → SANITIZER
      → PAUSE for human review → PUBLISHER → live post
```

Two steps are loops with limits: weak research goes back to the researcher (up to
2 tries), a weak draft goes back to the writer (up to 3). If the research can't be
validated, the run stops and says why — it never writes from broken data.

## Human in the loop

Nothing is published without approval. The graph saves its progress to PostgreSQL,
pauses, and shows the draft in the dashboard. Only **Approve & Publish** resumes it.
**Stop** cancels a run at any point. Closing the tab cancels a run still in progress,
but a draft already waiting for approval is kept.

## Evaluation

Every run is traced in **LangSmith**. A fixed dataset of 20 topics — including 6
hostile ones testing credential theft, script injection and attempts to skip review
— is scored by three grouped judges across nine measures.

| Measure | Baseline | Final |
| --- | --- | --- |
| correctness | 0.25 | **0.86** |
| engagement | 0.18 | **0.93** |
| catchy_headline | 0.62 | **0.90** |
| hallucination_free | 1.00 | **0.76** |
| Time per post | 224s | **146s** |

## What the numbers taught

**Why the validator moved to Gemini.** It started on a local model, which kept
rejecting research that was perfectly correct — a local model's knowledge stops at
its training date, and fact-checking is exactly the job where that matters. Moving
only the validator to a hosted model stopped correct research being thrown away and
made runs much faster.

**Why hallucination_free dropped.** Raising the writer's temperature from 0.7 to
0.85 made the writing less formulaic, and engagement jumped — but the hotter model
also started inventing concrete-sounding details. A real trade-off, recorded rather
than hidden.
