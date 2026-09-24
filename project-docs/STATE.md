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
- Documented the landing-page layout and three-task implementation plan.
- Configured React, TypeScript, Vite, Tailwind, ESLint, and a dependency lockfile.
- Implemented the responsive landing page, mobile navigation, category filters, trainer introductions, and sample membership tiers.
- Verified production build, TypeScript, lint, local imagery, responsive layout, and keyboard interactions.

## Issues Found & Fixed
- Replaced the unsupported initial ESLint 9 dependency with compatible ESLint 10 tooling.
- Fixed an earlier state-file typo that had listed a branding decision as a blocker.

## Blockers
- None.

## Next Phase Preview
Phase 2: stand up the backend API, replace mock data with real fetches, wire up Redux Toolkit for
booking state, implement book/cancel against real endpoints.

## Last Session Date
2026-09-24

## Branding Foundation — 2026-09-23
- Project path: C:\Users\brigh\Desktop\Projects\gym-booking
- Editor: VS Code
- No OpenAI branding, watermarks, or co-author attribution.
- Brand guide: project-docs/branding/BRAND.md; vector assets and tokens: frontend/public/brand/.
- Branding assets and the first landing-page implementation are complete; Phase 1 remains in progress.
- Next session: review the landing page together, then discuss the dedicated class schedule page.
- Backend framework, database, and hosting remain undecided.


## Project Organisation — 2026-09-23
- All non-code project material lives in project-docs/: STATE.md, branding/, plans/, and discussions/.
- Frontend code and runtime assets live in frontend/.
- Backend folder deferred until Phase 2.
- Resume sessions from project-docs/STATE.md; this location supersedes the earlier root STATE.md convention.


## Completed Chunk — Landing Page and Frontend Setup
- Goal: implement the FORM landing page and configure React, TypeScript, Tailwind, and Vite.
- Working layout: large headline above a wide training photograph; classes, trainers, membership, footer.
- Plan: project-docs/plans/phase-1-landing-plan.md.
- Decisions: project-docs/discussions/2026-09-23-landing-layout.md.
- Constraints: static mock data; no backend, auth, payments, or booking mutations; keep documents separate from frontend/.
- Verification: project-docs/verification/landing-checks.md, with desktop and mobile screenshots in the same folder.
- Local setup: project-docs/FRONTEND-SETUP.md.
- Next chunk: dedicated read-only class schedule, followed by trainer and pricing pages; retain the Phase 1 goal until all pages are complete.

## Last Completed Phase
- None. Phase 1 is still open; branding and the landing-page/setup chunk are complete.


## Design Direction Change — 2026-09-23
- User rejected the current landing-page appearance and requested inspiration from Cardtonic Upskill, without copying its work.
- Dedicated-page work is deferred while the FORM landing-page direction is revised.
- Reference review and proposed translation: project-docs/discussions/2026-09-23-design-reference-review.md.
- The user subsequently approved the bolder palette, original illustration, typography, and motion changes; implemented in the redesign chunk below.


## Completed Chunk — Expressive Landing Redesign
- User approved the bolder palette and illustrated direction on 2026-09-23.
- Palette: ink charcoal #202320, warm white #FFF9ED, brighter orange #FF7446, sky blue #A8D8F0, pale yellow #F1E7A1.
- Preserve the FORM name and wordmark. Use original fitness artwork and athletic display typography.
- Three tasks: plan and visual system; implement responsive page and motion; verify and commit.
- Keep classes and memberships static. Existing schedule filtering and keyboard support must continue working.
- Plan: project-docs/plans/phase-1-redesign-plan.md.


- Completed: original illustrated hero, locally hosted fonts, class carousel, first-session guide, updated brand assets and membership styling.
- Verified: production build, lint, 24 browser assertions, and responsive screenshots. Details: project-docs/verification/redesign-checks.md.
- Fixed during review: hero artwork spacing, carousel start-edge detection, and class-card category selection.
- Next action: user visual review of the redesigned landing page, then plan the dedicated read-only schedule page. Phase 1 remains open.


## Current Direction — 2026-09-24 (supersedes illustrated direction)
- User wants an authentic photography/video-led gym experience inspired by Equinox, with original FORM design and copy.
- Licensed stock photography and video sourcing is authorized. Additional references cover landing, schedule, trainers/profile, membership, about/contact, and auth.
- Completed research chunk: Equinox page review, media/source/license review, and a browser-verified six-photo/two-video preview board.
- Review: project-docs/discussions/2026-09-24-photographic-direction.md.
- Playable board: project-docs/branding/media-shortlist.html; screenshot beside it.
- Dribbble detailed visual inspection was limited by human verification. Final hero footage remains to be selected; current landscape clips are supporting candidates.
- Application code unchanged in this research chunk. Phase 1 remains open.
- Next action: select cohesive final hero media and plan the photographic landing/schedule/trainer/membership implementation in bounded chunks. Auth remains Phase 3; backend remains Phase 2.

## Active Chunk — Photographic landing rebuild
- User requested continuation. Executing the three-task plan in project-docs/plans/phase-1-photographic-plan.md.
- Build a locally hosted photo-led landing with optional club video, preserving static schedule filtering. Dedicated pages remain subsequent work.

## Completed Chunk — Photographic landing rebuild, 2026-09-24
- Replaced illustrated opening with locally hosted licensed strength photography and original gym-focused copy.
- Added photographic class formats, a monochrome coaching section, facility imagery, optional playable club film, and revised memberships/footer.
- Preserved working category filters and responsive mobile navigation; added club navigation.
- Plan: project-docs/plans/phase-1-photographic-plan.md. All three tasks complete.
- Verification: build/TypeScript/lint and 19 browser assertions passed; reviewed desktop/mobile screenshots in project-docs/verification/.
- Updated brand guide, tokens, and media source record. Hero deliberately uses a still; reviewed film is supporting content, not autoplay hero footage.
- Phase 1 remains open. Next chunk: dedicated weekly schedule with day filters and class details, then trainer profiles and membership page. Auth/backend remain deferred.

## Active Chunk — Dedicated schedule and coaching pages
- User requested continuation. Plan: project-docs/plans/phase-1-schedule-coaches-plan.md.
- Shared mock coach/class records, URL-backed day/discipline/coach filters, class-detail dialog, coach directory and individual profiles.
- Preserve static hosting compatibility and existing photography. Three tasks: plan/data, implementation, verification/ship.

## Completed Chunk — Dedicated schedule and coaching, 2026-09-24
- Added #/classes with 12 recurring sample sessions, combined day/discipline/coach filters, URL persistence, counts, helpful empty states and reset.
- Added native class-detail dialog with session facts and coach links; keyboard dismissal restores focus.
- Added #/coaches and three individual coach profiles with training focus, approach, and filtered session links.
- Connected landing CTAs, coach names, schedule preview, header and footer to new routes. Existing club/membership anchors still work across pages.
- Verification: production build, TypeScript, lint, 40 browser assertions and connected-flow smoke check passed. Desktop/mobile screenshots reviewed; details in project-docs/verification/schedule-coaches-checks.md.
- Reused licensed discipline photography. Fictional coaches are not presented as identities of stock models.
- All three tasks of project-docs/plans/phase-1-schedule-coaches-plan.md complete. Phase 1 stays open for dedicated membership page and final static-shell verification.
- Next chunk: membership detail/comparison page. Backend/auth/real bookings remain deferred.

## Active Chunk — Moving media
- User requested distinct image sets, automatic photo swiping, and autoplay background hero films across all existing pages. Supersedes still-only hero decision.
- Plan: project-docs/plans/phase-1-moving-media-plan.md.
