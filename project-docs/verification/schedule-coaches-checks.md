# Schedule and coaching verification — 2026-09-24

## Scope
Dedicated static weekly schedule, coaching directory, and three coach profiles. Hash routes support static hosting and shareable filter URLs. Data is illustrative; booking/auth remain deferred.

## Results
- Production build, TypeScript, and ESLint passed.
- 40 browser assertions passed across two completed runs: weekly count, coach/category/day combinations, no-results/reset and Sunday rest day, invalid filter fallback, three direct profiles and their session links, unknown route, URL persistence/reload, class modal, initial focus, inert background, keyboard navigation, Escape/explicit close and focus restoration, coach navigation, Back/Forward, mobile menu, responsive layouts at 320/390/768/1024px, and cross-page club anchor.
- Additional connected-flow smoke check passed: landing → schedule; directory → profile → related session → class details. No runtime page errors in that run.
- Reviewed desktop schedule/directory/profile and mobile schedule/directory/profile/dialog screenshots. All new pages fit the viewport. Retained local licensed discipline photographs; no new external media dependency.
- Native dialog makes the page background inert. Browser chrome remains keyboard-accessible as expected; no custom keyboard trap overrides native behavior.

## Fixes during verification
- Explicitly typed extended sample sessions to preserve weekday union types.
- Used the location navigation method for filter URLs to comply with React lint rules.
- Added a concise accessible name to the coach select.
- Reloaded the dev preview after moving the old App into Home because hot refresh retained the old module temporarily.

## Remaining phase work
Dedicated membership page and final static-shell review. About/contact and working auth/backend remain separate scope. Coaches are fictional; photos illustrate their training discipline rather than representing their identities.
