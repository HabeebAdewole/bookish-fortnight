# FORM

A gym frontend exploring the journey from finding a class to managing a training week, with a separate club administration interface.

Built by Habeeb Adewole with React, TypeScript, Vite and Tailwind CSS.

[Live site](https://form-gym-alpha.vercel.app/) · [Portfolio](https://adebola.me) · [Source](https://github.com/HabeebAdewole/bookish-fortnight)

## Explore

- [Public schedule](https://form-gym-alpha.vercel.app/#/classes): filter by day, discipline and trainer; calendar/list views; class details.
- [Member space](https://form-gym-alpha.vercel.app/#/member): bookings, cancellation, membership changes and profile preferences.
- [Club administration](https://form-gym-alpha.vercel.app/#/admin): member records, schedule editing, trainer assignments and transaction summaries.
- [Checkout](https://form-gym-alpha.vercel.app/#/member/checkout?plan=Rhythm): approved, declined and unavailable scenarios.

No credentials are required to explore the member or admin routes.

## Scope

This is a frontend portfolio project using fictional records. React state and localStorage support interactive demonstrations. Member and admin datasets are separate: editing the admin schedule does not update public classes or member bookings. There is no authentication, authorization, shared database, live capacity, payment provider, real invoice issuance or email delivery. Account/contact forms validate locally; checkout does not collect cards or charge money. Monthly prices describe the concept; current booking allowances apply to upcoming selections, not monthly billing.

## Run locally

Use Node.js 22.12 or newer and npm. From the repository root:

```sh
cd frontend
npm ci
npm run dev
```

Open the URL printed by Vite. Run npm commands inside `frontend`, not the repository root. No environment variables or backend are needed.

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

Build output: `frontend/dist`. On Vercel use `frontend` as the project root, `npm run build` as the build command and `dist` as the output directory. Routing uses URL hashes.

## Features and decisions

- Public homepage, weekly timetable, coach directory/profiles, membership comparison and about/contact pages.
- Account form validation, password visibility and password-reset form.
- Dated upcoming classes, trainer/category filters, overlap/capacity/allowance guards and booking cancellation.
- Membership upgrade/downgrade, pause/resume/cancel/reactivate; checkout retries and pending-state guards.
- Editable profile, preferences, unsaved-change feedback and reset.
- Admin member search and filters, attendance summaries, recurring schedule conflict validation, trainer deactivation guards and transaction downloads.
- URL-backed public schedule filters; keyboard focus handling and native dialogs.
- Local photography and muted background video. Reduced-motion/save-data preferences retain still posters; offscreen or hidden media pauses.

The project uses custom React hooks and browser storage rather than Redux or a backend. Attendance visuals are CSS bars with a data table, not Recharts. Browser storage can be cleared using site settings to restore the seeded experience; this removes locally saved selections.

## Verification

TypeScript, ESLint and production builds are the automated checks. Manual release checks cover public-to-member navigation, booking/cancellation, membership changes, checkout outcomes and representative admin flows. Test evidence must be tied to the tested commit; historical passes are not guarantees for later changes. No claim of physical-device or Safari/Firefox verification is made.

## Design and media

FORM branding and implementation are original project work. Equinox informed the photography-led gym direction; Cardtonic Upskill informed an earlier exploration. Their code and media were not copied. Stock athletes and locations illustrate the concept and do not represent a real FORM staff or venue.

Photography and video: [Pexels](https://www.pexels.com/license/) and [Unsplash](https://unsplash.com/license/). Numeric Pexels image filenames map to `https://www.pexels.com/photo/ID/`; footage/source details are listed below. Fonts are DM Sans and Barlow Condensed from Fontsource, under the SIL Open Font License. Original provider terms apply to media and fonts; this repository does not grant additional stock-asset rights.

Private planning, detailed verification and campaign drafts live in ignored `project-docs/`. This README is the public project guide.

### Media source index

| Runtime film | Pexels source |
| --- | --- |
| home.mp4 (and poster) | [Source 4746014](https://www.pexels.com/video/4746014/) |
| schedule.mp4 (and poster) | [Source 6388877](https://www.pexels.com/video/6388877/) |
| coaches.mp4 (and poster) | [Source 6389831](https://www.pexels.com/video/6389831/) |
| amara.mp4 (and poster) | [Source 6390402](https://www.pexels.com/video/6390402/) |
| daniel.mp4 (and poster) | [Source 6388426](https://www.pexels.com/video/6388426/) |
| tomi.mp4 (and poster) | [Source 6389824](https://www.pexels.com/video/6389824/) |
| membership.mp4 (and poster) | [Source 6389062](https://www.pexels.com/video/6389062/) |
| about.mp4 (and poster) | [Source 8549741](https://www.pexels.com/video/8549741/) |
| contact.mp4 (and poster) | [Source 6389050](https://www.pexels.com/video/6389050/) |
| club-film.mp4 (and poster) | [Source 8549741](https://www.pexels.com/video/8549741/) |

Stock club photograph: [Samuel Girven](https://unsplash.com/photos/fqMu99l8sqo). Original home film: [Ketut Subiyanto](https://www.pexels.com/video/a-man-lifting-a-barbell-4746014/). Other contributor names are available on their linked source pages.

Pexels photographs bundled with the app:

- [13951271](https://www.pexels.com/photo/13951271/)
- [17211446](https://www.pexels.com/photo/17211446/)
- [17227607](https://www.pexels.com/photo/17227607/)
- [17782876](https://www.pexels.com/photo/17782876/)
- [19025674](https://www.pexels.com/photo/19025674/)
- [20060599](https://www.pexels.com/photo/20060599/)
- [24244666](https://www.pexels.com/photo/24244666/)
- [29149073](https://www.pexels.com/photo/29149073/)
- [29526372](https://www.pexels.com/photo/29526372/)
- [31843007](https://www.pexels.com/photo/31843007/)
- [34043569](https://www.pexels.com/photo/34043569/)
- [35341603](https://www.pexels.com/photo/35341603/)
- [36096460](https://www.pexels.com/photo/36096460/)
- [37182823](https://www.pexels.com/photo/37182823/)
- [38777102](https://www.pexels.com/photo/38777102/)
- [4716816](https://www.pexels.com/photo/4716816/)
- [4720518](https://www.pexels.com/photo/4720518/)
- [4720794](https://www.pexels.com/photo/4720794/)
- [4720822](https://www.pexels.com/photo/4720822/)
- [4804024](https://www.pexels.com/photo/4804024/)
- [4853296](https://www.pexels.com/photo/4853296/)
- [4854250](https://www.pexels.com/photo/4854250/)
- [5327469](https://www.pexels.com/photo/5327469/)
- [5327476](https://www.pexels.com/photo/5327476/)
- [5878697](https://www.pexels.com/photo/5878697/)
- [6303444](https://www.pexels.com/photo/6303444/)
- [6303446](https://www.pexels.com/photo/6303446/)
- [6303449](https://www.pexels.com/photo/6303449/)
- [6388384](https://www.pexels.com/photo/6388384/)
- [6388516](https://www.pexels.com/photo/6388516/)
- [6388524](https://www.pexels.com/photo/6388524/)
- [6388531](https://www.pexels.com/photo/6388531/)
- [6388977](https://www.pexels.com/photo/6388977/)
- [6388979](https://www.pexels.com/photo/6388979/)
- [6388980](https://www.pexels.com/photo/6388980/)
- [6389084](https://www.pexels.com/photo/6389084/)
- [6390230](https://www.pexels.com/photo/6390230/)
- [6455904](https://www.pexels.com/photo/6455904/)
- [6455922](https://www.pexels.com/photo/6455922/)
- [6455963](https://www.pexels.com/photo/6455963/)
- [6456331](https://www.pexels.com/photo/6456331/)
- [6516190](https://www.pexels.com/photo/6516190/)
- [7031705](https://www.pexels.com/photo/7031705/)
- [8436465](https://www.pexels.com/photo/8436465/)
- [8538962](https://www.pexels.com/photo/8538962/)
- [8846583](https://www.pexels.com/photo/8846583/)
- [9958665](https://www.pexels.com/photo/9958665/)

Account-entry photography: [`login.jpg`, Pexels 6389858](https://www.pexels.com/photo/6389858/) and [`signup.jpg`, Pexels 33832201](https://www.pexels.com/photo/33832201/). These original mappings were recorded in [the public media register](frontend/public/licenses/media-sources.txt) when the auth pages were added. The public licenses directory also contains both font OFL notices.
