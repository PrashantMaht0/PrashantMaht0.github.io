---
title: GoCRM
description: A multi-tenant CRM for small businesses that captures leads straight from WhatsApp conversations, with AI-written performance insights.
publishDate: 2026-08-06
draft: false
order: 5
tags: [crm, spring-boot, whatsapp, ai]
role: Solo project
timeline: Jun–Aug 2026
status: complete
tech: [Java, Spring Boot, Spring AI, React, PostgreSQL, Tailwind CSS, Docker]
repoUrl: https://github.com/PrashantMaht0/GoCRM
---

## Motivation

Most small businesses already talk to their clients on WhatsApp. Instead of forcing
customers through long forms on a website, GoCRM captures leads right where the
conversation happens — so a business can automate lead generation, track
interactions and close deals without leaving the chat app it already uses.

## Features

- **Multi-tenant architecture.** Isolated workspaces: Admins manage multiple
  companies, while Sales Reps are restricted to their own assigned data.
- **WhatsApp webhook integration.** New leads from the WhatsApp Business API are
  captured and logged into the pipeline automatically.
- **AI executive insights.** An assistant built on Spring AI reads workspace
  metrics — revenue, top performers, support backlog — and writes performance
  reviews.
- **Live dashboards.** Dual-axis charts and revenue leaderboards track daily sales
  against monthly targets, alongside a Kanban pipeline board.
- **Security.** Role-based access control, JWT sessions, global exception handling
  to prevent data leaks, input validation, and Bucket4j rate limiting.

## Architecture

A clean MVC backend in **Java and Spring Boot** handles the API, security and
business logic, with **PostgreSQL on Supabase** for storage. The frontend is **React
with Vite**, styled with Tailwind and charted with Recharts. The whole stack runs
under Docker Compose, with Nginx serving the frontend and proxying to the backend.

## What's next

- Deeper analytics: predicted revenue trends, win/loss ratios, custom date filters.
- Automated WhatsApp follow-ups when a lead changes pipeline stage.
- Weekly automated email reports for admins.
