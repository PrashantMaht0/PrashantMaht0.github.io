---
title: V-RAG — Voice-Enabled RAG Pipeline
description: Ask your own documents questions by typing or speaking, in English or Hinglish, and get answers drawn only from the source — fully local.
publishDate: 2026-08-21
draft: false
order: 2
tags: [ai, rag, voice, local-llm]
role: Solo project
timeline: Aug 2026
status: complete
tech: [Python, Qdrant, Ollama, Faster-Whisper, FastAPI, Gradio, spaCy, Ragas]
repoUrl: https://github.com/PrashantMaht0/Voice_Enabled_RAG_Pipeline
---

## Overview

A low-latency question-answering system for your own documents. Ask by typing or
speaking, in English or Hinglish (Hindi + English), and get an answer drawn only
from the documents you supplied — with the sources it used.

Everything runs on your machine. No cloud APIs, no vendor keys, no data leaving the
laptop.

## How a question is answered

Each stage can stop the question. If the documents don't contain a trustworthy
answer, the system refuses rather than inventing one.

1. **Understand the question.** Speech is transcribed; follow-ups like *"how do I
   scale it?"* are rewritten into standalone questions, and non-English questions
   are translated for searching.
2. **Search twice.** Keyword search (BM25) and meaning-based search run in parallel
   and are merged — one catches exact terms and error codes, the other paraphrases.
3. **Re-read the shortlist.** A cross-encoder re-reads the top candidates against
   the question and reorders them.
4. **Decide whether to answer.** Below a 0.65 confidence score the pipeline stops
   and says it doesn't know. The language model is never called.
5. **Answer under constraint.** Only the supplied passages, temperature 0.0.
6. **Check the answer.** Names and facts are verified against the source text with
   spaCy NER, and the sources used are attached.

## How well it works

Measured against 67 questions — 47 answerable from the documents, 20 designed to
tempt the system into making something up.

| Measure | Target | Result |
| --- | --- | --- |
| Answers supported by the documents | ≥ 85% | **87%** |
| Answers that address the question | ≥ 85% | **95%** |
| Trick questions correctly refused | 100% | **20 of 20** |
| Answerable questions answered | ≥ 90% | **94%** |

## How fast it is

On a laptop CPU, no GPU:

| | Time |
| --- | ---: |
| Typed question, first time | ~2.3 s |
| Typed question, asked again | **~2 ms** |
| Question it refuses | ~0.7 s |
| Spoken question to spoken answer | ~9 s |

## Hinglish

Hindi and English mixed together, the way people actually speak. A dedicated speech
model transcribes it, the question is translated to English for searching — the
documents are in English — and the answer is read back aloud in the English voice.

## Credits

Built on the S-Y-N-C-H-R-O-N-I-C framework described by **Vishal Mysore** in
[How to Design a RAG Pipeline for 10 Million Documents with Zero Hallucination](https://medium.com/@visrow/how-to-design-a-rag-pipeline-for-10-million-documents-with-zero-hallucination-live-demo-057e37bcdbf6).
The framework supplied the ten design principles; this is an independent
implementation of them on a fully local stack.
