---
id: 2
title: Update Neon as Full Backend Service
stage: general
date: 2026-09-06
surface: agent
model: opencode/mimo-v2.5-free
feature: none
branch: main
user: user
command: /update-neon-backend
labels: ["tech-stack", "neon", "backend", "architecture"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/prd.md
  - docs/plan.md
  - AGENTS.md
tests: []
---

## Prompt

update that we will use neon as full backend service backend + db

## Response snapshot

Updated all project documentation to reflect Neon as the sole backend service provider:

**Changes Made:**

1. **docs/prd.md**:
   - Changed "Database: Neon PostgreSQL" → "Backend + Database: Neon (Lakebase Postgres + Auth + Functions)"
   - Changed "Auth: Custom JWT + bcryptjs" → "Auth: Neon Auth (managed Better Auth)"
   - Changed "API: Next.js API Routes" → "API: Neon Functions (all backend logic)"
   - Clarified Next.js is frontend only
   - Removed all API route definitions (now handled by Neon Functions)
   - Updated Security section to reference Neon Auth
   - Updated MVP Rules to reference Neon Auth

2. **docs/plan.md**:
   - Updated tech stack table to reflect Neon services
   - Removed Next.js API Routes section
   - Updated implementation phases for Neon Auth and Neon Functions

3. **AGENTS.md**:
   - Updated stack summary line
   - Clarified Next.js is frontend only
   - Updated Tech Stack Rules to show Neon handles all backend logic

## Outcome

- ✅ Impact: High - Updated core architecture documentation to reflect full Neon backend adoption
- 🧪 Tests: No tests needed (documentation only)
- 📁 Files: 3 files modified (docs/prd.md, docs/plan.md, AGENTS.md)
- 🔁 Next prompts: Proceed with implementation using Neon Functions for API routes and Neon Auth for authentication
- 🧠 Reflection: Clear update aligning documentation with architectural decision to use Neon as full backend

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
