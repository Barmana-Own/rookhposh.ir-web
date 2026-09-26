# Technical Delivery Report — Rookhposh SEO Source-Code Fix

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Report type | Technical report |
| Language | English |
| Jalali date | ۱۴۰۵-۰۷-۰۴ |
| Gregorian date | 2026-09-26 |
| Release | `seo-source-fix-r4-verification-2026-09-26` |
| Repository revision | No Git repository metadata was available in the supplied workspace |
| Delivery status | SOURCE COMPLETE; LIVE VERIFICATION BLOCKED |

## Scope

Implemented repository-scoped source SEO improvements for the existing Next.js 16 App Router landing page. The scope intentionally excludes the separate dashboard, blog, trust-seal provider, backend, database, authentication, and external deployment.

## R1 incremental phase

The R1 follow-up revalidated the technical foundation and added a factual local FAQ destination without redesigning the animated experience. `next.config.ts` now enables trailing-slash URL output so the rendered homepage canonical is exactly `https://rookhposh.ir/`. `scripts/smoke-seo.mjs` exercises the production server and verifies metadata, canonical, robots, sitemap, JSON-LD, expected route statuses, and a genuine 404.

The FAQ footer item now targets `#faq`. Terms of Use and Privacy Policy remain non-interactive because approved legal copy and routes were not supplied; no legal commitment or misleading blog-root destination was invented. The existing external blog link remains unchanged, but its live availability and potential legal routes were not verifiable from the current environment.

## Baseline architecture

- Next.js 16.3.5 App Router, React 19, TypeScript 5.9.3.
- Single public route `/`.
- Client homepage component owns the loader, 535 WebP frames, canvas rendering, GSAP, and ScrollTrigger.
- Existing Persian RTL UI includes story chapters, three pricing cards, external links, trust seal, contact details, and footer.
- No local API, database, authentication, or mutable server data.

## Implemented architecture

| Area | Implementation |
| --- | --- |
| Site identity | `lib/site.ts` validates `NEXT_PUBLIC_SITE_URL`, allows only HTTP(S), and falls back to `https://rookhposh.ir`. |
| Metadata | `app/layout.tsx` exports `Metadata` with metadata base, title template, description, canonical, authors, Open Graph, Twitter, robots, and application name. |
| Viewport | `app/layout.tsx` exports dark theme/color scheme values. |
| Structured data | `components/seo/StructuredData.tsx` emits static Organization, WebSite, and Service JSON-LD. |
| Crawl | `app/robots.ts` allows the public app and points to the sitemap; `app/sitemap.ts` lists only the canonical homepage. |
| Manifest | `app/manifest.ts` exposes Persian RTL install/share metadata. |
| Semantics | Homepage adds a labeled story heading, informative brand/trust image alt text, and a no-JavaScript fallback. |
| Security | `next.config.ts` disables `X-Powered-By` and adds `nosniff`, referrer, frame, and permissions headers. |
| Regression check | `scripts/validate-seo.mjs` verifies required files and source markers without adding a dependency. |

## Dependency/configuration changes

- No runtime or development dependency was added.
- `.env.example` documents the non-secret `NEXT_PUBLIC_SITE_URL` value.
- `package.json` adds `npm run test:seo`.
- `package.json` adds `npm run test:seo:smoke`.
- `next.config.ts` adds response headers and disables the framework fingerprint.
- `next.config.ts` enables trailing-slash URL output for the canonical homepage.

## API, database, authentication

Not applicable. The three generated metadata routes are framework file-convention endpoints and do not represent a business API. No database migration or auth implementation was invented.

## Security review

- Static JSON-LD contains only repository-controlled values.
- Site-origin configuration rejects non-HTTP(S) protocols and malformed values.
- No secret, token, credential, SQL/query input, upload, redirect, SSRF, or auth surface was added.
- External trust-seal requests remain HTTPS and keep `referrerPolicy="origin"`.
- No unresolved Critical or High finding is known within the repository.
- HSTS/TLS termination remains a hosting concern and is intentionally not hardcoded for uncontrolled subdomains.

## Tests and validation

| Command/check | Result |
| --- | --- |
| `npm ci --ignore-scripts` | PASS; 374 packages installed |
| `npm audit --omit=dev` | PASS; 0 vulnerabilities reported |
| `npm run test:seo` | PASS |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; metadata routes statically generated |
| `npm run test:seo:smoke` | PASS; canonical, metadata, robots, sitemap, JSON-LD, route statuses, and genuine 404 verified against `next start` |
| JSON-LD parse and graph-type check | PASS; Organization, WebSite, Service present |
| External blog/legal route availability | NOT_RUN/UNAVAILABLE from the current environment; no DNS or server changes attempted |
| Live Search Console/rich-result test | NOT_RUN; external access required |
| External deployment | NOT_PERFORMED; no target/credentials supplied |

The first sandboxed production build compiled but failed while spawning the TypeScript worker with `spawn EPERM`. The same command passed under the approved elevated execution profile. This was an execution-environment limitation, not an application failure.

R1 repair evidence: the first smoke run caught Next.js serializing the root canonical without a trailing slash; `trailingSlash: true` was added and build/smoke were rerun successfully. A subsequent structured-data review removed an unsupported country claim, followed by successful lint, typecheck, build, and smoke validation.

## Regression and integrity review

`project-integrity-manifest.md` records the baseline route, features, assets, integrations, and validation surface. The final source retains `/`, the loader, all frame assets, the seven-step story, pricing plans, footer, contact details, dashboard/blog/trust links, and existing component naming. No test or protected element was removed.

## Deployment and rollback

Provider-neutral deployment instructions are in `docs/11-deployment.md` and `docs/11-operations-runbook.md`. The change has no database migration and can be rolled back by restoring the previous immutable application build. Actual production launch was not performed.

## Stage summary

| Stage | Status | Evidence |
| --- | --- | --- |
| 01 Project analysis | PASS | Requirements, brief, assumptions, risks, prompt handoff |
| 02 Design/UI architecture | PASS | Design system, UI architecture, semantic/RTL rules, tokens |
| 03 Frontend architecture | PASS | Source implementation, metadata boundary, build/type/lint |
| 04 Backend architecture | PASS / NOT APPLICABLE | Frontend-only repository documented |
| 05 Database architecture | PASS / NOT APPLICABLE | No persistence layer exists or was invented |
| 06 API integration | PASS / NOT APPLICABLE | Only metadata file-convention routes |
| 07 Authentication/authorization | PASS / NOT APPLICABLE | Public landing page; dashboard remains external |
| 08 Application security | PASS | Origin validation, headers, static JSON-LD review |
| 09 Software testing | PASS | Regression, lint, typecheck, build, smoke |
| 10 QA/debugging | PASS | User journeys, defect log, integrity review |
| 11 Deployment/production | PASS | Provider-neutral runbook; deployment honestly not performed |
| 12 Final review | PASS | Independent source, build, security, and integrity gate |

## Artifact inventory

- `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`
- `components/seo/StructuredData.tsx`, `components/sections/OctabootExperience.tsx`, `components/sections/AnimationRuntime.tsx`, `components/sections/LoaderSection.tsx`, `lib/site.ts`, `scripts/validate-seo.mjs`, `scripts/validate-r2.mjs`, `scripts/smoke-seo.mjs`
- `.env.example`, `README.md`, `project-state.json`, `release-manifest.json`
- `docs/r1-technical-seo-foundation.md`, `docs/r2-before-measurements.md`, `docs/r2-performance-rendering-refactor.md`
- `docs/r3-information-architecture.md`, `lib/marketing.ts`, shared marketing components, four new public route files, `scripts/validate-r3.mjs`, and `scripts/smoke-r3.mjs`
- `docs/r4-production-seo-verification.md`, `scripts/smoke-r4.mjs`, and the controlled-production verification command in `package.json`
- `docs/01-*` through `docs/12-*`, `docs/rookhposh-seo-fix-prompts.md`
- `design/tokens.json`, `project-integrity-manifest.md`
- Bilingual customer and technical reports under `reports/`

## Technical references

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js robots convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js sitemap convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

## Final assessment

Repository-scoped delivery is complete and internally coherent. R4 subsequently verified that the public host is serving an older deployment than the verified source; live indexing, ranking, and field performance remain unverified. See the R4 production verification section below.

## R2 performance, rendering, and client-boundary follow-up

### Changed implementation

- `components/sections/OctabootExperience.tsx` is now a Server Component containing the semantic page, pricing, FAQ, footer, external links, and fallback scene.
- `components/sections/LoaderSection.tsx` is server-rendered and exposes a separate live loader status.
- `components/sections/AnimationRuntime.tsx` is the focused Client Component for canvas, GSAP, ScrollTrigger, frame scheduling, and browser cleanup.
- The runtime uses one bounded image creation path, four concurrent downloads, an 18-frame critical window, a four-settled-frame readiness threshold, nearby prefetch, nearest-loaded-frame rendering, failed-frame tolerance, and cancellation cleanup.
- `public/images/rookhposh-mark.webp` was added at 768×512 and 8,022 bytes. The existing 1536×1024 `public/images/octaboot.png` remains preserved.
- `scripts/validate-r2.mjs` and the extended production smoke test cover the R2 source and server-rendered fallback contract. `package.json` exposes `npm run test:r2`.

### Measurements and limitations

The pre-R2 JavaScript inventory was 699,466 bytes across 9 chunks; the post-R2 inventory is 698,459 bytes across 9 chunks, a 1,007-byte (0.15%) reduction. The 535 frames remain 11,423,938 bytes (10.89 MiB). A fresh local browser observation exposed 36 frame assets during the initial approximately 1.2-second window. The baseline observation exposed 231 after three seconds. Because the timings and browser inventories are not a controlled protocol trace, they are reported as directional observations rather than an exact network-request reduction.

### R2 validation

| Command/check | Result |
| --- | --- |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS; 535 frames, static/client boundary, queue, fallback, and reduced-motion source markers verified |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS after elevated rerun; the sandbox-only attempt hit `spawn EPERM` at the worker step |
| `npm run test:seo:smoke` | PASS; metadata, crawl files, JSON-LD, fallback markers, and genuine 404 |
| Browser smoke | PASS; initial semantic content, loader readiness, 36-frame observation, and FAQ interaction |
| Reduced-motion browser emulation | NOT_RUN; unavailable in connected browser surface |
| Lighthouse / field Core Web Vitals | NOT_RUN; tooling and production field data unavailable |

The complete R2 evidence is in [`docs/r2-performance-rendering-refactor.md`](../docs/r2-performance-rendering-refactor.md), with baseline measurements in [`docs/r2-before-measurements.md`](../docs/r2-before-measurements.md).

## R3 information architecture and internal-link follow-up

### Intent decision

The source contains both consumer-facing try-on language and store-facing commercial language. Repeated store references in the description, pricing cards, and dashboard CTAs support a B2B/store-first homepage recommendation. The current H1 and consumer workflow wording were preserved pending owner confirmation; the implementation does not silently reposition the product.

### Routes and content

Added four factual public routes:

- `/for-online-stores/` — store-facing product explanation based on the existing image, clothing-selection, preview, plan, and dashboard facts.
- `/how-it-works/` — the existing seven workflow stages in indexable text.
- `/pricing/` — the existing trial, seasonal, and annual plans with their supplied terms, credits, prices, and unit rates.
- `/faq/` — the existing four factual questions and answers.

`/virtual-try-on/`, `/features/`, `/about/`, and `/contact/` were not created because distinct approved content or workflows are not established. `/terms/` and `/privacy/` remain unpublished because binding legal copy/routes were not supplied. The external blog remains an external host.

### Architecture and metadata

`lib/marketing.ts` is the route/content registry and shared metadata helper. `PublicHeader`, `PublicFooter`, `MarketingPageShell`, `Breadcrumbs`, `StorySteps`, `PlanCards`, and `FaqList` keep the new pages server-rendered and consistent with the existing visual system. Each page has unique metadata, a trailing-slash canonical, Open Graph/Twitter fields, `index, follow` robots, one shell-provided H1, visible breadcrumbs, and matching `BreadcrumbList` JSON-LD. The sitemap emits exactly five public routes.

No `FAQPage` JSON-LD was added. The FAQ is visible and factual, but current Google guidance limits regular FAQ rich-result eligibility primarily to authoritative government and health sites; no rich-result outcome is promised.

### R3 validation

| Command/check | Result |
| --- | --- |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS |
| `npm run test:r3` | PASS |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm run build` | PASS; 10 static routes generated |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS; metadata, canonical, internal links, sitemap, legal 404s |
| Browser route smoke | PASS; all new routes, breadcrumbs, titles, and FAQ interaction |

Owner decisions remain documented in [`docs/r3-information-architecture.md`](../docs/r3-information-architecture.md).

## R4 production SEO verification

### Verification scope

R4 made no broad feature changes. It re-built the repository, ran the controlled-production smoke checks, inspected the live host in the connected browser, and recorded the difference between the verified source and the deployed site. Search Console, ranking, indexing, field Core Web Vitals, raw HTTP response capture, mobile viewport emulation, and reduced-motion emulation were not claimed where the environment could not provide them.

### Controlled production result

| Check | Result |
| --- | --- |
| `npm run build` | PASS; the permitted rerun completed after the sandbox-only attempt hit `spawn EPERM` |
| `npm run test:r4:smoke` | PASS; five public routes, metadata, canonical URLs, robots, sitemap, JSON-LD syntax, internal links, RTL, and exact 404 |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS |
| Controlled browser render | PASS; Persian RTL semantics, metadata, JSON-LD, canvas, internal links, and readable content |
| Controlled browser console | PASS; no error or warning entries after load |
| Mobile viewport | NOT_RUN; unavailable in connected browser |
| Reduced-motion emulation | NOT_RUN; unavailable in connected browser |

### Live production result

The live host is serving an older deployment than the verified repository. `http://rookhposh.ir/` redirected to `https://rookhposh.ir/`, and the homepage rendered readable Persian content, pricing, a canvas, and a completed loader state. However, the live rendered homepage had no canonical link, Open Graph/Twitter metadata, robots metadata, or JSON-LD. `/robots.txt`, `/sitemap.xml`, `/for-online-stores`, `/how-it-works`, `/pricing`, and `/faq` all rendered the live 404 page. The deployed footer still contains the old blog-root destinations for FAQ, Terms, and Privacy.

The live dashboard host loaded with title `رخ‌پوش` and a visible logo. The blog host failed browser DNS resolution with `ERR_NAME_NOT_RESOLVED`. No console errors or warnings were returned for the live homepage after load. The terminal HTTP client could not reach the public host through the configured proxy, so live response status and raw HTML were not independently captured.

| Live check | Result |
| --- | --- |
| HTTPS redirect | PASS |
| Canonical host/tag | FAIL; host reachable, canonical tag absent |
| Homepage HTTP 200 | NOT_RUN; rendered successfully, protocol status unavailable |
| Genuine live 404 status | NOT_RUN; 404 page rendered, protocol status unavailable |
| `robots.txt` | FAIL; live 404 page |
| `sitemap.xml` | FAIL; live 404 page |
| Canonical/Open Graph/Twitter/JSON-LD | FAIL; absent from rendered homepage |
| R3 public routes | FAIL; all four rendered 404 |
| Internal links | FAIL; old hash/blog-root links remain deployed |
| Blog | FAIL; DNS resolution error |
| Dashboard | PASS; page loaded |
| Mobile/reduced-motion | NOT_RUN; emulation unavailable |
| Network trace | NOT_RUN; protocol-level trace unavailable |
| Console-breaking errors | PASS; no error or warning entries |

### Release verdict

R1-R3 source and controlled-production verification pass. Live production SEO verification is `FAIL_WITH_DEPLOYMENT_BLOCKERS` until the verified build is deployed, the live crawl/metadata/routes are rechecked with a protocol-level client, and the external blog DNS issue is resolved or explicitly accepted by the owner/operator. Detailed evidence is in [`docs/r4-production-seo-verification.md`](../docs/r4-production-seo-verification.md).
