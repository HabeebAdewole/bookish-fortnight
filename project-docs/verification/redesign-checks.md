# Redesign verification — 2026-09-23

## Checks passed

- `npm run build`: TypeScript and production build.
- `npm run lint`: no findings.
- 24 browser assertions covering hero scroll response; carousel previous/next and edge states; keyboard arrows; category-card to schedule filtering; all existing filters; first-session entry; images loading; mobile navigation and focus; reduced-motion behavior; and skip navigation.
- No horizontal page overflow at 1440, 1024, 768, 390, or 320 pixel viewport widths.
- Browser console: no errors or warnings on the redesigned page.
- Font files are served locally; unnecessary language subsets excluded.
- Hero PNG alpha transparency confirmed.

## Visual review

Reviewed desktop and mobile layouts and saved `redesign-desktop.png`, `redesign-mobile.png`, and `redesign-hero.png`. The final captures load the lazy community image before taking the full-page screenshot.

## Fixes during verification

- Added hero spacing so the illustration does not overlap the call-to-action.
- Corrected the carousel start-edge tolerance for scroll-snap padding, so Previous disables correctly.
- Connected class-card links to the corresponding schedule category.

## Limits

Desktop browser and emulated mobile viewport checks; no physical phone or cross-browser suite was run. Touch scrolling uses native overflow behavior. Booking, login, payments, and backend endpoints remain outside this chunk. The page continues to disclose that its content and prices are illustrative.

Final destination: dependency installation, production build, and lint also passed in the Desktop frontend folder.
