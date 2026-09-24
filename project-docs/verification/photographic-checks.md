# Photographic landing — verification, 2026-09-24

- Production build and TypeScript passed; ESLint passed.
- 19 browser assertions passed: initial video absent; all four category filters; class-card category selection; local 720p playback; film close/unmount; mobile menu open, Escape close, focus return and navigation close; no horizontal overflow at 320/390/768/1440px; reduced-motion scroll behavior; all photos loaded; no runtime page errors.
- Desktop and mobile full-page screenshots reviewed. Strength hero, image crops, section spacing, and stacked mobile pricing verified. Screenshots: photographic-desktop.png, photographic-mobile.png, photographic-mobile-hero.png.
- Corrected font import to match the designed Barlow Condensed 700 weight.
- Local image assets total approximately 1.6 MB; optional film approximately 4.8 MB. Below-fold photos are lazy loaded. Film is absent from the DOM until requested and uses metadata preload with native controls.
- Scope: landing-page rebuild with existing static schedule. No backend, authentication, real bookings, or dedicated trainer/schedule pages implemented in this chunk.
