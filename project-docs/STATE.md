# STATE.md — FORM Gym Booking App

## Project Overview
Gym membership & class booking web app. Members browse classes, book/cancel slots, and manage
their membership. Admins manage classes and view attendance/growth via charts. Uses generic
placeholder gym data — not a real business. Built as a portfolio project to demonstrate state
management, auth, server-side pagination, data viz, and testing — gaps flagged from real job
applications (DotLabs, Trimble).

## Stack
- Frontend: React, TypeScript, Tailwind CSS, Redux Toolkit
- Backend: Own API (Express, to be confirmed at Phase 2 DISCUSS — Node/Express assumed for now)
- Database: TBD at Phase 2 DISCUSS (Postgres or MySQL, matching Tracer stack experience)
- Auth: JWT (reuse pattern from Tracer)
- Charts: Recharts
- Testing: Jest + React Testing Library
- Deploy: TBD — decide when ready to ship

## Phase Progress
- [ ] Phase 1: Static shell (landing page, class schedule grid, trainer profiles, pricing — mock data)  ← YOU ARE HERE
- [ ] Phase 2: Real data + booking (own backend API, Redux Toolkit booking state)
- [ ] Phase 3: Auth + member dashboard (JWT, protected routes, my bookings, cancel booking)
- [ ] Phase 4: Admin dashboard (server-side pagination, Recharts attendance/growth charts, class CRUD)
- [ ] Phase 5: Tests + polish (Jest/RTL on booking logic, loading/error states, responsive pass, deploy)

## Current Phase Goal
Phase 1 — build a fully static, deployable shell with mock/hardcoded data. No auth, no real API yet.
Pages: landing, class schedule (read-only), trainer profiles, pricing tiers.

## Key Decisions Made
- Backend: own API, not a BaaS — full control over auth and data modelling
- State management: Redux Toolkit (not Zustand) — booking state, loading states, optimistic updates
- Data: generic placeholder gym data, not a real business
- Deploy target: undecided, revisit at Ship step of whichever phase is first ready to go live
- Core entities: User (member/admin), Class (name, trainer, day/time, duration, capacity, category),
  Booking (user + class + date, status: booked/cancelled/attended), Membership (tier, price, dates, active)

## Completed Tasks This Phase
- Branding direction selected: FORM, warm ivory, charcoal, burnt orange, stone.

## Issues Found & Fixed
- [log as you go]

## Blockers
- None.

## Next Phase Preview
Phase 2: stand up the backend API, replace mock data with real fetches, wire up Redux Toolkit for
booking state, implement book/cancel against real endpoints.

## Last Session Date
2026-09-23

## Branding Foundation — 2026-09-23
- Project path: C:\Users\brigh\Desktop\Projects\gym-booking
- Editor: VS Code
- No OpenAI branding, watermarks, or co-author attribution.
- Brand guide: project-docs/branding/BRAND.md; vector assets and tokens: frontend/public/brand/.
- Branding assets prepared; full Phase 1 implementation has not started.
- Next session: review branding, discuss static page layout, and plan the frontend scaffold.
- Backend framework, database, and hosting remain undecided.


## Project Organisation — 2026-09-23
- All non-code project material lives in project-docs/: STATE.md, branding/, plans/, and discussions/.
- Frontend code and runtime assets live in frontend/.
- Backend folder deferred until Phase 2.
- Resume sessions from project-docs/STATE.md; this location supersedes the earlier root STATE.md convention.

