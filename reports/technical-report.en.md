# Technical Delivery Report — Prompt 01 Navigation Shell

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Report type | Technical report |
| Language | English |
| Jalali date | ۱۴۰۵-۰۷-۰۵ |
| Gregorian date | 2026-09-27 |
| Implementation revision | `f19b774e883043d7cc6d8707298a96ba95003765` |
| Branch | `feature/r5-prompt-01-navigation` |
| Delivery status | IMPLEMENTED; external deployment not performed |

## Scope

Prompt 01 was implemented as a focused header, mobile navigation, Blog entry, custom 404, and semantic-shell change. The implementation does not add authentication, CMS functionality, legal content, dashboard code, or external infrastructure changes.

## Exact source changes

| File | Change |
| --- | --- |
| `components/marketing/PublicHeader.tsx` | Replaced the external Blog anchor with first-party navigation; added the For Online Stores link and retained the exact dashboard CTA URL. Navigation data is shared with the mobile component. |
| `components/marketing/MobileNav.tsx` | Added a small client-only disclosure menu with accessible button state, keyboard Escape handling, focus restoration, and route/dashboard links. |
| `components/marketing/PublicFooter.tsx` | Changed the article link to internal `/blog` with the Persian label `مقالات`. |
| `components/sections/OctabootExperience.tsx` | Moved `PublicFooter` outside the pricing section and outside `<main>` without changing animation or pricing markup. |
| `app/blog/page.tsx` | Added a temporary server-rendered Blog destination with self-canonical metadata, `noindex`, and no sitemap entry. It is explicitly marked for replacement by Prompt 02. |
| `app/not-found.tsx` | Added a Persian branded 404 surface with six required internal destinations. |
| `app/globals.css` | Added only mobile disclosure, focus, 404 link layout, and breakpoint rules. No brand token, typography, pricing, or animation rule was changed. |
| `scripts/validate-seo.mjs` | Updated source assertions for the new navigation, mobile accessibility, temporary Blog route, and custom 404. |
| `scripts/validate-r3.mjs` | Added Prompt 01 source and semantic-nesting regression assertions. |
| `scripts/smoke-seo.mjs` | Added custom 404 content assertions. |
| `scripts/smoke-r3.mjs` / `scripts/smoke-r4.mjs` | Added navigation, dashboard CTA, external-blog removal, and temporary Blog checks. |

## Navigation and accessibility design

Desktop keeps the existing header layout and exposes four first-party journeys plus the external dashboard CTA. At widths up to 900px, the desktop link group is hidden and a compact menu button is shown. The button exposes `aria-expanded`, `aria-controls`, and a Persian accessible label. The panel uses native hidden behavior when closed, is keyboard reachable when open, closes on Escape, and returns focus to the toggle. No animation library or additional runtime dependency was introduced.

## Routing and indexing behavior

`/blog/` returns 200 so the new navigation does not point to a broken route, but its metadata is `noindex, follow`, it is absent from `PUBLIC_INDEXABLE_ROUTES`, and smoke validation asserts it is absent from `sitemap.xml`. Prompt 02 owns replacement with approved Blog/CMS content. The custom `app/not-found.tsx` renders for nonexistent paths and production smoke confirms HTTP 404.

## Semantic correction

The homepage previously rendered `PublicFooter` as a descendant of the pricing section and `<main>`. It now closes `<main>` before rendering the site-level footer. The footer styles remain shared and no animation runtime boundary was touched.

## Preservation and integrity review

- `components/sections/AnimationRuntime.tsx`: unchanged.
- `public/frames`: unchanged; 535 WebP files remain present.
- GSAP/ScrollTrigger timelines, canvas logic, frame algorithm, hero, pricing values, brand colors, typography, and dashboard URLs: unchanged.
- No source dependency was added or upgraded.
- No secrets, credentials, authentication, user input, database path, or external deployment surface was introduced.

## Validation evidence

| Command / check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS; 535 frames verified |
| `npm run test:r3` | PASS |
| `npm run build` in sandbox | ENVIRONMENT FAILURE; Next TypeScript worker returned `spawn EPERM` after successful compilation |
| `npm run build` permitted rerun | PASS; static routes included `/blog` and `/_not-found` |
| `npm run test:seo:smoke` | PASS; homepage metadata, crawl routes, custom 404 status/content |
| `npm run test:r3:smoke` | PASS; public routes, `/blog` noindex, sitemap exclusion, navigation links |
| `npm run test:r4:smoke` | PASS; controlled production SEO regression suite |

The initial build failure is classified as an environment/process-permission limitation because the same command completed successfully on the permitted rerun. No source-code validation failure remained.

## Security review

The change adds only local navigation state. The client component registers one Escape listener only while open and removes it on cleanup. Links are fixed source-controlled destinations; no user-controlled URL, HTML, storage, token, upload, API, or privileged operation was added. The external dashboard URL is unchanged. No material security defect was introduced or left unresolved by this implementation.

## Deployment and rollback

No push, DNS change, dashboard change, or external deployment was performed. The implementation is committed on `feature/r5-prompt-01-navigation`; rollback is the parent Prompt 00 baseline commit `8e94c24` if required.
