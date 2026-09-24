# FORM — current brand direction

Updated 2026-09-24. The photography-led gym direction supersedes the illustrated September 23 direction. Earlier boards and artwork remain historical references.

## Identity
FORM is a training club centred on strength, conditioning, mobility, and practical coaching. Retain the existing wordmark. Primary line: Find your form. Use direct training language and avoid invented luxury claims or athlete credentials.

## Palette and typography
Black #101112, white #FFFFFF, chalk #F2F3F1, steel #717776, accent orange #E87544. White actions on dark photographic backgrounds. Orange is reserved for interaction and keyboard focus, not small white text backgrounds. Reference tokens: frontend/public/brand/tokens.css; application styles: frontend/src/styles.css.

Barlow Condensed 700 for athletic headings; DM Sans 400–700 for body/navigation. Self-hosted fonts retain their OFL licenses in project-docs/licenses/.

## Photography and motion
Real licensed training, coaching, mobility, and facility photography. Full-width lifting hero with a contrast overlay; natural image crops elsewhere. Media sources are recorded in MEDIA-SOURCES.md. Do not present stock models as named employees or stock locations as an operating FORM gym.

Video is optional, mounted only after the user opens the film section, with native playback controls and a poster. No autoplay. Hover image movement is subtle; reduced-motion preference disables transitions and smooth scrolling.

## Layout and content
Spacious photographic landing page. Practical category filters, clear session duration and coaches, transparent sample membership inclusions. Mobile content stacks without horizontal scrolling. Dedicated schedule, trainer profiles, and pricing pages remain later Phase 1 chunks. Auth and bookings stay in their planned phases.

## Motion revision — 2026-09-24
The user's request for looping hero films and automatic photo rotation supersedes the earlier no-autoplay direction. All six existing pages now have unique hero clips, visible pause/play controls and dedicated photographic galleries. Galleries advance every six seconds, pause on hover/focus, support previous/next and touch swipe, and can be paused explicitly. Reduced motion and save-data start with still posters; explicit playback remains available. Offscreen/hidden media stops. All photo sets are distinct across routes. New pages should use this shared media system with their own licensed assets.
