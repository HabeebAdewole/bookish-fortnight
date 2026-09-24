# Phase 1 — Schedule and coaching pages

User requested continuation after the photographic landing rebuild. Keep the monochrome photographic direction, local licensed media, and mock data. This chunk builds the dedicated schedule and trainer directory/profiles. Membership detail, backend, and auth remain subsequent work.

1. Plan and data: shared coach IDs, class details and a seven-day sample week; document route/filter behavior.
2. Implement: static-host-friendly hash routes; schedule with day, discipline and coach filters; accessible class-detail dialog; coaching directory and individual profiles with linked sessions. Connect landing/navigation.
3. Verify and ship: build/lint, keyboard dialog/focus, URL filters and browser history, direct profile links, empty/reset states, mobile screenshots; update state and commit.

Design: retain black #101112, white, chalk and restrained orange focus accents. Barlow Condensed headings, DM Sans controls. Schedule uses a compact photographic title strip above a practical day selector and chronological rows, not an unwieldy seven-column mobile grid. Coach directory is editorial with training imagery, specialty and approach; images depict training disciplines, not identities of fictional coaches. Profiles combine a discipline photograph, coaching approach, and related class links. No fabricated credentials or booking confirmation.

Routes: #/classes with optional day/category/coach query parameters; #/coaches; #/coaches/{slug}. Hash routing supports static hosting without server rewrites. Class details use a native modal dialog, Escape and close controls, with focus restored to the opener. Filters persist in shareable URLs and support Back/Forward. Invalid filters fall back to valid defaults; invalid routes show a useful not-found state.

All three tasks completed. Verification: project-docs/verification/schedule-coaches-checks.md.
