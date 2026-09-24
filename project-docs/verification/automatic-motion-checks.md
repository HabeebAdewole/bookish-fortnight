# Automatic media and animation verification — 2026-09-24

Build/TypeScript and lint passed. Twelve browser checks passed: all six routes automatically play without media buttons/native video controls; gallery advances even while hovered; club inline film plays automatically; schedule filters and dialog remain functional; reduced motion disables films and animation; mobile layout fits; hero entrance animation runs. No runtime page errors during the run. Mobile screenshot reviewed.

Motion: staggered hero text/CTA entrance, once-per-page photographic scroll reveals, button/coach-image hover transitions, and dialog entrance. Animations cancel on route change or reduced-motion changes. Text is never left hidden by an animation-specific class. Films retain posters if autoplay is unavailable and pause when offscreen or the document is hidden.

User explicitly requested automatic-only media, so visible playback/navigation controls and manual gallery interaction were removed. This supersedes the earlier control/pause verification expectations.
