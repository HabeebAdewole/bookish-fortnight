# FORM — current brand direction

Updated 2026-09-23 after the user approved the expressive illustrated redesign. This supersedes the initial muted photographic direction; the original concept board remains a historical reference.

## Identity

FORM is a welcoming, energetic fitness club. Primary line: **Find your form.** The outlined FORM wordmark remains the logo. Use the light wordmark on ink and the dark wordmark on light surfaces. Keep clear space around it; never distort the lettering.

## Palette

| Colour | Hex | Role |
| --- | --- | --- |
| Ink | #202320 | Hero, footer, text |
| Warm white | #FFF9ED | Main background, light text |
| Orange | #FF7446 | Main actions and strength content |
| Sky blue | #A8D8F0 | Community and conditioning content |
| Pale yellow | #F1E7A1 | Mobility and highlighted membership |

Use ink text on the bright colours; do not use white small text on orange. Runtime theme: `frontend/src/styles.css`. Reference tokens: `frontend/public/brand/tokens.css`. Keep them in sync.

## Type

Barlow Condensed 800 is the athletic display face. DM Sans 400–700 is used for body copy and controls. Fonts are self-hosted through Fontsource. Their OFL licenses are retained in `project-docs/licenses/`. Use expressive scale for major headings while keeping navigation and explanations readable.

## Imagery and shapes

The hero uses original illustrated adults training and resting together. Weight plates, running-track curves, and simple movement graphics make the direction specific to fitness. The earlier training photograph is retained in the community section. Trainer names and biographies remain fictional placeholder content.

## Motion

Desktop hero: a modest scroll-linked scale and vertical offset. First-session steps: staggered entry when the section appears. Cards and buttons: brief interaction feedback. The class rail supports scrolling, keyboard arrows, and previous/next buttons. Reduced-motion mode removes animation and smooth scrolling; mobile uses a static hero.

## Inspiration boundary

Cardtonic Upskill informed the broad ideas of expressive display type, illustration, colour blocks, and scroll interaction. FORM uses its own artwork, layout, visual motifs, copy, colours, and timing. No reference-site source files or artwork are part of the app.

## Project conventions

VS Code project: `C:\Users\brigh\Desktop\Projects\gym-booking`. Code and runtime assets live in `frontend/`; documentation lives in `project-docs/`. No added OpenAI branding, watermarks, or co-author credits.
