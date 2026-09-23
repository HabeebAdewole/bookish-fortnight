# FORM landing-page layout

## Goal and scope

Build the first responsive landing page and configure React, TypeScript, Tailwind, and Vite for local work in VS Code. Use static placeholder content; bookings, sign-in, payments, and the backend remain in later phases.

## Design decisions

- Keep the approved ivory #F4F0E8, charcoal #242522, burnt orange #C65D3B, and stone #C8C0B4 palette. Use action orange #A74327 when contrast is needed for text and buttons.
- Use the existing Arial/Helvetica Neue system stack, with oversized bold headings and readable body text. The wordmark is outlined SVG.
- Left-align content. Let the oversized “Find your form.” headline and wide training photograph carry the visual identity. Avoid decorative statistics, fake reviews, repeated card grids, and excessive motion.
- Recommended hero layout selected as the working assumption: headline above the photograph, supporting copy and primary action beside the headline on desktop. Stack on mobile.
- Header: FORM logo, Classes, Trainers, Membership, and Explore classes. On small screens use an accessible disclosure menu.
- Class preview: a compact sample weekly schedule with a category filter. The full schedule page is future Phase 1 work.
- Trainers: fictional trainer introductions with specialties, without invented real-world credentials or testimonials.
- Membership: three illustrative monthly tiers, explicitly labelled sample pricing; no payment or signup action.
- Footer: simple navigation and a short portfolio/demo disclosure.

## Layout

```text
FORM                         Classes  Trainers  Membership    [Explore classes]

Find your form.                         A little stronger. A little more you.
                                       [Explore classes]
┌───────────────────────────────────────────────────────────────────────────┐
│                      Wide training photograph                             │
└───────────────────────────────────────────────────────────────────────────┘
Strength. Movement. Community.                 A place to make progress.

Make room for movement.                       [All] [Strength] [Conditioning] [Mobility]
Day / time              Class                  Coach              Duration
Sample class rows

Good people. Better sessions.                 Trainer introductions

A little commitment. A lot of possibility.    Three membership tiers

FORM                                         Footer links and demo note
```

## Review against the brief

The accepted palette comes from FORM's identity. The distinctive choice is scale: a large typographic opening over a panoramic, warm gym scene. Schedule rows convey useful day, time, trainer, and duration information instead of generic promotional cards. Functional links scroll to real content; no inactive signup or booking buttons are added.

## Acceptance checks

- TypeScript check, production build, and lint pass.
- Navigation reaches the correct sections; mobile navigation opens and closes accessibly.
- Class-category filtering updates visible rows and exposes its selected state.
- Desktop and mobile layouts have no horizontal overflow; images load locally.
- Visible keyboard focus, semantic headings, reduced-motion support, and readable colour contrast.
- All documentation and verification evidence live in project-docs/. Runtime assets live in frontend/.
