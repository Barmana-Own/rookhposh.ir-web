# R5 Baseline Before Blog/CMS

Baseline date: 2026-09-27  
Scope: regression checkpoint only. No Blog, CMS, navigation, caching, or SEO-content changes were implemented.

## Repository and checkpoint

| Item | Measured result |
| --- | --- |
| Repository | `rookhposh.ir-web` |
| Remote | `https://github.com/Barmana-Own/rookhposh.ir-web.git` |
| Branch at baseline start | `main` |
| Baseline-start commit | `e0ec5c1ac97aeb574bb10101a3a538e6b3c177d5` (`Import SEO-ready Rookhposh source`) |
| Baseline checkpoint branch | `checkpoint/r5-baseline-before-blog-cms-2026-09-27` |
| Baseline-start working tree | Clean |
| Source changes in this phase | None; this document is the only intended repository change |

The checkpoint branch was created from the clean `main` state without overwriting uncommitted work. No commit was pushed from this phase.

## Architecture confirmed from source

- Next.js `16.3.5` App Router with React `19.3.0` and TypeScript `5.9.3`.
- GSAP `3.12.5` with ScrollTrigger powers the homepage animation runtime.
- The repository is a frontend-only Persian/RTL public marketing application. No dashboard authentication, backend, database, or API implementation is present here.
- Dashboard ownership remains external at `https://dash.rookhposh.ir`.
- `app/page.tsx` renders `components/sections/OctabootExperience.tsx`.
- `OctabootExperience.tsx` imports and renders `AnimationRuntime.tsx`.
- `AnimationRuntime.tsx` is a client component and contains the browser animation runtime, GSAP/ScrollTrigger integration, and canvas-related behavior.
- Static marketing components include the public header, footer, page shell, breadcrumbs, FAQ list, plan cards, and story steps.
- Metadata and crawl routes are implemented in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts`.

## Public routes present

Indexable public routes confirmed in source:

- `/`
- `/for-online-stores/`
- `/how-it-works/`
- `/pricing/`
- `/faq/`

Generated technical routes confirmed by the production build:

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`

`/_not-found` is an application error route and is not an indexable content route.

## Animation frame inventory

| Measurement | Result |
| --- | ---: |
| Directory | `public/frames` |
| WebP frame files | `535` |
| Total bytes | `11,423,938` |
| First frame | `frame_00001.webp` |
| Last frame | `frame_00535.webp` |
| Missing expected frames | `0` |
| Unexpected extra frames | `0` |

## Protected-surface audit

The following protected areas were not changed in this phase:

- `components/sections/AnimationRuntime.tsx`
- GSAP timelines and ScrollTrigger behavior
- canvas logic and frame-loading behavior
- `public/frames` assets
- homepage composition and pricing values
- brand colors and typography
- dashboard URLs

## Validation results

| Command | Status | Evidence / classification |
| --- | --- | --- |
| `npm ci` | ENVIRONMENT FAILURE, then PASS on permitted rerun | The initial run failed with `spawn EPERM` during npm's package rebuild step. The exact command completed successfully on the permitted rerun: 374 packages added, 0 vulnerabilities reported. |
| `npm run lint` | PASS | ESLint completed with exit code 0. |
| `npm run typecheck` | PASS | TypeScript completed with exit code 0. |
| `npm run test:seo` | PASS | `SEO source validation passed.` |
| `npm run test:r2` | PASS | `R2 source validation passed (535 animation frames verified).` |
| `npm run test:r3` | PASS | `R3 information architecture validation passed.` |
| `npm run build` | ENVIRONMENT FAILURE, then PASS on permitted rerun | The initial run failed at the Next.js TypeScript worker with `spawn EPERM`. The permitted rerun compiled, type-checked, and generated all 10 static pages successfully. |
| `npm run test:seo:smoke` | PASS | Local production smoke validation passed, including homepage metadata, robots, sitemap, and genuine 404 checks. |
| `npm run test:r3:smoke` | PASS | Local production smoke validation passed for the five public marketing routes and related link/sitemap checks. |
| `npm run test:r4:smoke` | PASS | Supplemental controlled production SEO smoke validation passed. |

## Local production smoke coverage

The production server was started from the successful build on port `3100`, tested, and stopped. The required route set was covered by the smoke scripts:

`/`, `/robots.txt`, `/sitemap.xml`, `/for-online-stores/`, `/how-it-works/`, `/pricing/`, and `/faq/`.

## Baseline conclusion

The source baseline is clean and validated. The homepage imports and uses the approved animation runtime, all 535 expected animation frames are present, the existing public route set is enumerated, and no protected homepage or animation surface was modified. The two initial `spawn EPERM` failures are classified as environment/process-permission failures because the same exact commands passed after the permitted reruns; no source-code failure remained in the executed validation set.
