# Moving media verification — 2026-09-24

- Build and TypeScript passed; ESLint passed.
- Inspected playback on Home, Schedule, Coaching, and all three coach profiles. Six unique local video sources are muted, looping and playsInline; all played beyond the first frame.
- Inspected 18 new photos in a contact sheet. Runtime audit found 23 unique non-poster photos across the six pages, zero repeated sources; all decoded successfully.
- Verified automatic six-second slide advance, pause holds, explicit restart while the control retains focus, next buttons on every gallery, and synthetic mobile touch swipe.
- Verified video pause/resume and offscreen pause. Simulated hidden-document visibility event pauses playback.
- Reduced-motion browser emulation: video source absent, poster present, gallery stays static; manual photo navigation and explicit film opt-in work.
- Save-data emulation: hero source absent. Aborted video request: static poster remains and control reports unavailable.
- All six pages fit 320, 390, 768 and 1440px without horizontal overflow. Reviewed desktop heroes, mobile hero and gallery.
- Regression smoke check: schedule filtering, class dialog/Escape, coach route and coach-filtered schedule remain functional.

## Corrections
Replaced an unsuitable portrait-format Daniel hero clip with landscape battle-rope footage. Replaced an unavailable stock-photo download. Photo loading becomes eager only while the gallery is onscreen, preventing blank upcoming slides while retaining lazy loading below the fold. Separated hover/focus pausing and allowed explicit restart without requiring focus to leave the control.

Scope: six existing pages, not the future membership/about/auth pages. Native autoplay can still be blocked by browser/device settings; the play control and poster handle that case. Photo models illustrate training, not actual FORM staff.
