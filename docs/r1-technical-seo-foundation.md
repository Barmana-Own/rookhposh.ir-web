# R1 — Technical SEO Foundation Report

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Phase | R1 — Technical SEO Foundation |
| Gregorian date | 2026-09-26 |
| Jalali date | ۱۴۰۵-۰۷-۰۴ |
| Framework | Next.js 16 App Router, React 19, TypeScript |
| Phase result | PASS WITH DOCUMENTED OWNER INPUT |

## Files changed

- `app/layout.tsx`
- `app/robots.ts`
- `app/sitemap.ts`
- `app/manifest.ts`
- `components/seo/StructuredData.tsx`
- `components/sections/OctabootExperience.tsx`
- `app/globals.css`
- `lib/site.ts`
- `next.config.ts`
- `scripts/validate-seo.mjs`
- `scripts/smoke-seo.mjs`
- `package.json`
- `README.md`
- `project-state.json`
- `release-manifest.json`
- `docs/10-known-issues.md`
- `docs/12-final-review.md`
- `reports/customer-report.en.md`
- `reports/customer-report.fa.md`
- `reports/technical-report.en.md`
- `reports/technical-report.fa.md`

## Metadata result

PASS. The root layout uses the Next.js Metadata API with a validated `metadataBase`, title template/default title, Persian description, canonical, Open Graph, Twitter, robots, application name, and `fa_IR` locale. No invented social asset was added; the existing `public/images/octaboot.png` is used and its non-standard social-card crop risk remains documented.

## Canonical result

PASS. `trailingSlash: true` is configured so the rendered homepage contains exactly one canonical link targeting `https://rookhposh.ir/`. The sitemap also contains only `https://rookhposh.ir/`.

## Robots result

PASS. `app/robots.ts` allows the public marketing site, points to `https://rookhposh.ir/sitemap.xml`, and does not make assumptions about `dash.rookhposh.ir`.

## Sitemap result

PASS. `app/sitemap.ts` lists only the real public homepage and is isolated in a maintainable metadata route for future public routes.

## 404 result

PASS. The production smoke test requested a nonexistent route and received HTTP 404. No catch-all homepage redirect or soft-404 behavior was introduced.

## Structured data result

PASS. Server-rendered JSON-LD is valid JSON and contains only factual `Organization`, `WebSite`, and `Service` entities supported by visible repository content. No ratings, reviews, customer counts, awards, or invented pricing claims were added.

## Language and direction

PASS. The root document retains `lang="fa"` and `dir="rtl"`; the manifest and visible FAQ content remain Persian-first.

## Footer/link issues

- FAQ now targets a factual local `#faq` section containing answers derived from existing product behavior.
- Terms and Privacy are intentionally non-interactive labels because approved legal text/routes were not supplied. No legal commitment or misleading blog-root destination was invented.
- The existing blog link remains an external related-host link. Its live availability and any legal/FAQ routes on that host were not verifiable from the current environment and remain an operations/deployment concern.

## Missing assets or owner input

- Owner input required: approved Terms of Use and Privacy Policy copy plus their intended production routes before those footer labels can become links.
- Optional asset improvement: a dedicated 1200×630 social preview image would reduce cropping risk. The existing brand asset remains the only verified share image.

## Validation result

| Check | Result |
| --- | --- |
| `npm ci` | PASS; 374 packages installed, 0 vulnerabilities reported by install audit |
| `npm audit --omit=dev` | PASS; 0 vulnerabilities |
| `npm run test:seo` | PASS |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `npm run test:seo:smoke` | PASS; metadata, canonical, robots, sitemap, JSON-LD, route status, and genuine 404 verified against `next start` |
| External blog/legal route availability | NOT_RUN/UNAVAILABLE from this environment; no DNS or server changes were attempted |
| Search Console/rich-result validation | NOT_RUN; requires live production access |
| External deployment | NOT_PERFORMED; no authorized target or credentials supplied |

## Repair log

- The first production smoke run detected that the default Next.js root URL serializer emitted `https://rookhposh.ir` without the required trailing slash. `trailingSlash: true` was added, the production build was rerun, and the smoke test then verified exactly `https://rookhposh.ir/`.
- The structured-data review removed an unsupported `areaServed` country claim because that fact was not present in visible source content. Build, lint, typecheck, and production smoke validation were rerun successfully.

## Security and regression review

No dependency was added. The changed paths introduce no authentication, API, database, upload, redirect, or user-controlled server execution surface. Existing animation behavior, 535 WebP frames, pricing content, external dashboard/blog/trust links, and contact details were preserved. The new smoke test is dependency-free and does not weaken production code.

## Release decision

The R1 technical SEO foundation is verified for the repository. Release remains conditional only on owner-provided approved legal content/routes and normal post-deployment checks for the external blog, Search Console, social previews, and hosting configuration.

## Subsequent R2 note

R2 later added `public/images/rookhposh-mark.webp` for static image and metadata use, while preserving `public/images/octaboot.png` for compatibility. R2 also moved semantic landing content into Server Components and isolated the browser animation runtime. The current R2 evidence is in [`docs/r2-performance-rendering-refactor.md`](r2-performance-rendering-refactor.md).
