# R8 Final Blog, CMS, and SEO Release Report

| Field | Value |
| --- | --- |
| Project | Rookhposh public marketing site and separate content CMS |
| Public repository | `rookhposh.ir` |
| CMS repository | `rookhposh-cms` |
| Jalali date | ۱۴۰۵/۰۷/۰۸ |
| Gregorian date | 2026-09-30 |
| Release scope | Final regression QA after Prompts 01–09 |
| Source release status | `PASS_WITH_DOCUMENTED_LIMITATIONS` |
| Production deployment | `NOT_PERFORMED` |
| Search Console | `ACCESS REQUIRED` |

## Executive verdict

The source-level release gate passed for the public site and the separate CMS: clean locked installs, lint, typecheck, automated SEO/Blog/security tests, production builds, local HTTP smoke tests, metadata/crawl-boundary checks, signed revalidation checks, and dependency audits completed successfully. The approved homepage animation, RTL layout, pricing, dashboard destination, and 535-frame sequence were preserved.

This is not a claim that production has been updated. Live deployment, owner-controlled Search Console verification, MySQL migration/application, and live CMS-backed publication are still operational prerequisites. The result is therefore a source release candidate with documented external dependencies, not a live-production success claim.

## Protected behavior and animation integrity

| Check | Result | Evidence |
| --- | --- | --- |
| Frame inventory | PASS | Exactly 535 WebP files under `public/frames/v1/`; no gaps |
| Frame bytes | PASS | `11,423,938` bytes |
| Frame content | PASS | Sequence signature `739bb260101d54d3d86d6077388363de9f6a52b9e71bfea9e1265c70c0200d86` |
| Cache path/policy | PASS | Representative first, middle, and last frames returned 200/WebP with `public, max-age=31536000, immutable`; legacy path returned 404 |
| Animation runtime | PASS | `AnimationRuntime.tsx` still uses the same 535-frame sequence and unchanged GSAP/ScrollTrigger/canvas behavior; only the approved versioned asset root is used |
| Pricing | PASS | Existing pricing values were present in the production smoke test and were not changed in this QA phase |
| Browser visual smoke | PASS | Current production build rendered the Persian RTL hero, header, navigation, canvas experience, pricing, FAQ, footer, and external CTA in the controlled browser at the available desktop viewport |
| Browser console | PASS | Controlled browser console returned no warning/error entries for the inspected homepage |
| Before/after screenshot comparison | NOT_RUN | No preserved pre-change screenshot baseline was available in the workspace |
| Tablet/mobile visual comparison | NOT_RUN | The available browser surface did not provide a viewport override in this run |
| Browser reduced-motion emulation | NOT_RUN | Source validation covers the reduced-motion branch; the available browser surface did not provide an emulation control |

## Public HTTP smoke results

The final public production build was started locally at `http://127.0.0.1:3100`. The following status codes and content types were observed:

| Route | Status | Content type | Result |
| --- | ---: | --- | --- |
| `/` | 200 | `text/html; charset=utf-8` | PASS |
| `/for-online-stores/` | 200 | `text/html; charset=utf-8` | PASS |
| `/how-it-works/` | 200 | `text/html; charset=utf-8` | PASS |
| `/pricing/` | 200 | `text/html; charset=utf-8` | PASS |
| `/faq/` | 200 | `text/html; charset=utf-8` | PASS |
| `/blog/` | 200 | `text/html; charset=utf-8` | PASS; truthful empty state because no CMS URL was configured |
| `/blog/r8-release-missing-slug/` | 404 | `text/html; charset=utf-8` | PASS; genuine missing-article response |
| `/robots.txt` | 200 | `text/plain` | PASS |
| `/sitemap.xml` | 200 | `application/xml` | PASS |
| `/feed.xml` | 200 | `application/rss+xml; charset=utf-8` | PASS |
| `/manifest.webmanifest` | 200 | `application/manifest+json` | PASS |

`npm run test:r8:smoke` additionally verified one homepage canonical, Open Graph/Twitter metadata, homepage JSON-LD, the canonical robots sitemap pointer, sitemap exclusion of dashboard/CMS/API/error markers, and missing-article 404 behavior.

## Metadata and crawl boundary checks

| Boundary/check | Result | Evidence |
| --- | --- | --- |
| Homepage title/description/canonical | PASS | `test:seo:smoke`, `test:r4:smoke`, and `test:r8:smoke` |
| Marketing-route metadata uniqueness and H1 intent | PASS | `test:r6` and `test:r6:smoke` |
| Open Graph/Twitter metadata | PASS | Public rendered HTML smoke |
| Homepage Organization/WebSite/Service JSON-LD syntax | PASS | SEO source and rendered smoke checks |
| Blog empty-state indexability boundary | PASS | No provider yields safe empty state and no article sitemap/feed entry |
| Published article metadata/schema fixture | PASS | Blog fixture verifies article metadata, `BlogPosting`, breadcrumbs, sitemap/feed inclusion, and draft/noindex exclusion |
| CMS/dashboard exclusion from public sitemap | PASS | Search Console and R8 smoke checks |
| CMS robots/noindex boundary | PASS | CMS standalone smoke: `/robots.txt` disallows crawling and `/login` includes noindex metadata |
| Unknown public route behavior | PASS | Missing Blog slug returned HTTP 404; no homepage catch-all redirect was observed |

## Public-site validation

| Command/check | Result |
| --- | --- |
| `npm ci` | PASS; clean lockfile install, 0 vulnerabilities; Windows cleanup warning did not change the exit result |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS; 535-frame integrity |
| `npm run test:r3` | PASS |
| `npm run test:r6` | PASS |
| `npm run test:blog` | PASS |
| `npm run test:search-console` | PASS |
| `npm run test:blog:fixture` | PASS; published/draft/noindex and safe rendering fixture |
| `npm run test:revalidation` | PASS; invalid authorization rejected and valid signed request accepted |
| `npm run build` | PASS |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS |
| `npm run test:r4:smoke` | PASS |
| `npm run test:r6:smoke` | PASS; the smoke harness now treats semantic `<br>` separators as spaces |
| `npm run test:r7:smoke` | PASS |
| `npm run test:blog:smoke` | PASS |
| `npm run test:search-console:smoke` | PASS |
| `npm run test:r8:smoke` | PASS |
| `npm audit --json` | PASS; 0 vulnerabilities |

The only Prompt 10 code change was a focused correction to the R6 smoke-test text normalization. It does not change the homepage or animation; it removes a false failure caused by `<br>` elements being stripped without a semantic space.

## CMS validation and security checks

| Command/check | Result |
| --- | --- |
| CMS `npm ci` | PASS; locked install completed |
| CMS `npm run lint` | PASS |
| CMS `npm run typecheck` | PASS |
| CMS `npm run test` | PASS; 9 tests |
| CMS `npm run db:validate` | PASS |
| CMS `npm audit --json` | PASS; 0 vulnerabilities |
| CMS `npm run build` | PASS |
| Anonymous `/` and `/posts` | PASS; redirected to `/login` with HTTP 307 |
| Anonymous `/admin/users` | PASS; redirected to `/login` with HTTP 307 |
| CMS `/login` | PASS; HTTP 200, Persian RTL, noindex |
| CMS `/robots.txt` | PASS; `Disallow: /` |
| CMS `/api/posts` without credentials | PASS; HTTP 401 JSON response |
| CMS `/register` | PASS; HTTP 404, no public registration route |
| CMS public API without MySQL | PASS; HTTP 503 JSON degraded response, no draft data available |
| Login rate-limit implementation | PASS_SOURCE; email/IP throttle is present in the credentials authorization path; live counter behavior was not exercised without MySQL |
| Editor/Admin denial tests | PASS | Role and authorization tests cover restricted administrative operations |
| Invalid/valid public-site revalidation | PASS | `test:revalidation` passed against the local public server |
| Browser/source secret scan | PASS | No production secret value was added; `.env.example` contains placeholders only and server-only variables are not `NEXT_PUBLIC_*` |
| `prisma migrate deploy` against a real database | NOT_RUN | No authorized MySQL instance was available; the non-elevated attempt stopped at Windows `spawn EPERM`, and executing a mutating migration against an unspecified target was not authorized |

The standalone CMS smoke was intentionally run without a database. Its 503 public-API result is expected for this environment and confirms graceful dependency failure, not successful publication integration. A disposable or production-like MySQL migration and publish/unpublish test remains required before CMS go-live.

## External link checks

| Link/service | Observation | Classification |
| --- | --- | --- |
| `https://dash.rookhposh.ir/` | HTTP 200, HTML response | PASS for the observed environment |
| e-Namad trust-seal URL | HTTP 500 from the external provider | EXTERNAL_DEPENDENCY; availability is not controlled by this repository |
| `https://blog.rookhposh.ir/` | Fetch failed in this environment | EXTERNAL_DEPENDENCY; it is not the primary public Blog destination |
| First-party `/blog/` | HTTP 200, safe empty state without configured CMS | PASS |

## Required production environment names

Values are intentionally omitted from this report.

### Public site

`NEXT_PUBLIC_SITE_URL`, `GOOGLE_SITE_VERIFICATION`, `BLOG_CONTENT_API_URL`, `BLOG_REVALIDATION_SECRET`

### CMS

`NODE_ENV`, `DATABASE_URL`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, `AUTH_SECRET`, `AUTH_URL`, `AUTH_TRUST_HOST`, `CMS_ORIGIN`, `PUBLIC_SITE_ORIGIN`, `MEDIA_STORAGE_DRIVER`, `MEDIA_LOCAL_ROOT`, `MEDIA_PUBLIC_BASE_URL`, `MEDIA_MAX_BYTES`, `PUBLIC_REVALIDATION_URL`, `PUBLIC_REVALIDATION_SECRET`, `CMS_SEED_ADMIN_EMAIL`, `CMS_SEED_ADMIN_PASSWORD`, `CMS_SEED_ADMIN_NAME`

## Production deployment requirements

1. Deploy the verified public artifact, including `public/frames/v1/` and the first-party Blog routes.
2. Deploy the CMS as a separate application with server-only secrets and a provisioned MySQL-compatible database.
3. Apply and verify Prisma migrations against an authorized disposable/staging database before production migration.
4. Configure the CMS public API URL and matching server-only revalidation secrets on both applications.
5. Bind approved production object storage before accepting article media uploads.
6. Run the public and CMS HTTP smoke checks against the controlled deployment.
7. Complete owner-controlled Search Console verification and submit `https://rookhposh.ir/sitemap.xml`.
8. Recheck live dashboard, e-Namad, Blog/CMS, HTTPS, mobile, and reduced-motion behavior after deployment.

## Rollback notes

- Public rollback is an artifact rollback; preserve the existing `public/frames/v1/` asset path or deploy the complete matching artifact so the runtime and frames cannot diverge.
- A future frame-content change must use a new versioned directory rather than mutating immutable files.
- CMS schema changes must use the repository migration policy and a verified database backup/restore plan; no production migration was executed in this QA run.
- If Blog publication or revalidation misbehaves, disable the provider configuration or roll back the public/CMS artifacts independently; the homepage does not depend on CMS availability.
- Rotate the two server-only revalidation secrets together if compromise is suspected, then redeploy both applications.

## Final release classification

`PASS_WITH_DOCUMENTED_LIMITATIONS` for the source release candidate. No critical source, build, SEO-boundary, authentication, or protected animation failure was observed. Production readiness remains conditional on external deployment, authorized MySQL migration/integration, Search Console owner access, and the explicitly listed external/browser checks.
