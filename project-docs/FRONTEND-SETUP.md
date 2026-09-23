# Working on FORM in VS Code

Open `C:\Users\brigh\Desktop\Projects\gym-booking` in VS Code. Use its integrated PowerShell terminal.

```powershell
cd frontend
npm ci
npm run dev
```

Open the local address printed by Vite. Stop the server with Ctrl+C. `npm ci` is needed on a fresh checkout, or when restoring dependencies from the lockfile.

## Checks

```powershell
npm run lint
npm run build
```

The build runs TypeScript checks and writes the production bundle to `frontend/dist/`. To inspect that bundle locally, run `npm run preview`.

## Where to edit

- `frontend/src/App.tsx`: landing-page sections.
- `frontend/src/components/Header.tsx`: desktop and mobile navigation.
- `frontend/src/components/ClassSchedule.tsx`: sample class filters and rows.
- `frontend/src/data/content.ts`: typed placeholder classes, trainers, and memberships.
- `frontend/src/styles.css`: Tailwind import, theme, and responsive styling.
- `frontend/public/brand/`: SVG wordmarks, favicon, and reference colour tokens.
- `frontend/public/images/`: local website imagery.
- `project-docs/`: plans, discussions, project state, branding, and verification evidence.

The CSS theme mirrors the brand reference tokens; keep both in sync when changing colours. No environment variables are needed for this static page. Redux Toolkit will be introduced with booking state in Phase 2.

## Tooling

React and TypeScript run through Vite. Tailwind uses the Vite plugin and the CSS-first theme configuration. Node 24.12.0 was available during setup; use Node 22.12 or newer. Dependency versions are locked in `frontend/package-lock.json`.

Official references: [Vite](https://vite.dev/guide/) and [Tailwind with Vite](https://tailwindcss.com/docs/installation/using-vite).

## Expressive redesign
- frontend/src/components/ClassDiscovery.tsx: native horizontal class carousel and schedule-category links.
- frontend/src/components/Motion.tsx: desktop hero scroll effect and first-session guide.
- Self-hosted Barlow Condensed and DM Sans fonts are imported in main.tsx; licenses live in project-docs/licenses/.
- After pulling this change, run npm ci from frontend/ to install the new font dependencies, then npm run dev.

