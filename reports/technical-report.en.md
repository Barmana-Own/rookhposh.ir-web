# Technical Delivery Report — Prompt 02 First-Party Blog Foundation

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Report type | Technical report |
| Language | English |
| Jalali date | ۱۴۰۵-۰۷-۰۶ |
| Gregorian date | 2026-09-28 |
| Source revision | `d635b02e6754a35c1fdbfed32eb8c41b052e3177` |
| Branch | `feature/r5-prompt-01-navigation` |
| Delivery status | IMPLEMENTED; external deployment not performed |

## Scope and architecture

Prompt 02 replaces the Prompt 01 Blog placeholder with a first-party server-rendered Blog presentation while keeping the repository frontend-only. Article authoring, storage, editor access, and authentication remain outside this application. The optional public read boundary is selected with `BLOG_CONTENT_API_URL`.

## Exact files changed

### Blog routes and components

| File | Change |
| --- | --- |
| `app/blog/page.tsx` | Server-rendered article index, provider-backed metadata, truthful empty state, noindex behavior without indexable posts, and product CTA. |
| `app/blog/[slug]/page.tsx` | Server-rendered article route, route metadata, canonical, article details, breadcrumb shell, related content, CTA, and `notFound()` for missing/unpublished content. |
| `app/sitemap.ts` | Adds Blog index/article URLs only for validated, indexable published posts. |
| `components/blog/BlogCard.tsx` | Article card with internal slug link, category/date, title, excerpt, and optional featured image. |
| `components/blog/BlogContent.tsx` | Server Markdown rendering with `react-markdown`, `rehype-sanitize`, raw HTML disabled, and Markdown image suppression. |
| `components/blog/BlogDate.tsx` | Persian publication/update date formatting with semantic `<time>`. |
| `components/blog/BlogImage.tsx` | Validated featured-image rendering with alt text, lazy/eager loading, and scoped layout box. |
| `components/blog/BlogProductCta.tsx` | Restrained factual CTA to `/for-online-stores`. |
| `app/globals.css` | Scoped Blog index/card/article/CTA/prose/responsive styles only. |

### Content boundary and configuration

| File | Change |
| --- | --- |
| `lib/blog/types.ts` | Typed public Blog post, image, and author contract. |
| `lib/blog/client.ts` | Optional HTTP(S) CMS client with published query parameters, no auth header, 4-second timeout, response-size bound, JSON failure fallback, and revalidation tags. |
| `lib/blog/repository.ts` | Runtime payload validation, published/future-date filtering, slug validation, safe asset/canonical URL handling, sorting, and deduplication. |
| `.env.example` | Documents optional server-only `BLOG_CONTENT_API_URL`. |
| `package.json` | Adds exact `react-markdown`/`rehype-sanitize` dependencies and Blog source/HTTP test scripts. |
| `package-lock.json` | Locks the added Markdown/sanitization dependency graph. |

### Tests and documentation/state

| File | Change |
| --- | --- |
| `scripts/validate-blog.mjs` | Source contract checks for routes, provider fields, sanitizer markers, and absence of raw HTML insertion. |
| `scripts/smoke-blog.mjs` | No-CMS production smoke for empty state, noindex, sitemap exclusion, and genuine missing-slug 404. |
| `scripts/validate-seo.mjs` | Existing SEO source contract updated for the first-party Blog implementation. |
| `scripts/validate-r3.mjs` | Existing R3 source contract updated for the dynamic Blog article route and provider markers. |
| `docs/blog-content-provider.md` | Provider contract, failure behavior, publication rules, and content-safety documentation. |
| `README.md` | Setup, validation, route, and ownership documentation updated for Blog. |
| `docs/01-project-brief.md` | Product/integration boundary updated to distinguish first-party presentation from external authoring. |
| `docs/r3-information-architecture.md` | Prompt 02 incremental IA and route update added. |
| `docs/10-known-issues.md` | Blog provider/content availability risks updated. |
| `docs/12-final-review.md` | Prompt 02 incremental final review and evidence added. |
| `project-integrity-manifest.md` | Blog preservation/integrity comparison added. |
| `project-state.json` | Prompt 02 state, artifacts, decisions, risks, and validation added. |
| `release-manifest.json` | Release identifier, source layout, commands, artifacts, and validation updated. |

### Reporting artifacts

| File | Change |
| --- | --- |
| `reports/customer-report.en.md` | Customer-facing English delivery report for Prompt 02. |
| `reports/customer-report.fa.md` | Customer-facing Persian delivery report for Prompt 02. |
| `reports/technical-report.en.md` | Technical English evidence and exact-file report for Prompt 02. |
| `reports/technical-report.fa.md` | Technical Persian evidence and exact-file report for Prompt 02. |

## Provider behavior

The client requests `/posts?status=published&limit=100` and `/posts/{slug}?status=published` relative to the configured base URL. Missing/invalid configuration, timeout, non-2xx response, invalid JSON, oversized response, or malformed records resolve to no public posts rather than crashing the build. Records explicitly marked non-published or dated in the future are rejected. The public API is expected to expose already-published content; the repository applies an additional filter when status fields are present.

Canonical URLs supplied by content are accepted only when they resolve to the configured main-site origin. Asset URLs must be relative or HTTPS. Slugs are bounded Unicode letter/number identifiers with `_`/`-` continuation characters. Dates are normalized to ISO strings.

## Rendering and indexing behavior

The Blog index and article route are dynamic server-rendered App Router pages. With no CMS URL configured, `/blog/` returns 200 with a useful Persian empty state, `noindex, follow`, and no Blog sitemap entries. With validated published content, the index is eligible for indexing unless noindex content is the only content; article sitemap entries are emitted only for `noindex: false` posts. Missing/unpublished/invalid slugs use `notFound()` and return the shared genuine HTTP 404.

Article body content is rendered through `react-markdown` with `rehype-sanitize` and `skipHtml`. No raw unsanitized `dangerouslySetInnerHTML` is used for CMS content; Markdown images are suppressed in favor of the validated featured-image field.

## Preservation and security review

- `components/sections/AnimationRuntime.tsx`: unchanged.
- `public/frames`: unchanged; 535 WebP files remain present.
- GSAP/ScrollTrigger timelines, canvas behavior, frame-loading algorithm, hero composition, pricing values, brand styling, and dashboard URL: unchanged.
- No local database, authentication, editor, write API, fake article, or production mock was added.
- No secret or authorization header is sent to the public content provider.
- Provider input is bounded and validated before rendering; raw HTML is disabled and Markdown is sanitized.
- No Critical or High security defect was introduced by the changed implementation.

## Validation evidence

| Command / check | Result |
| --- | --- |
| `npm ci` | PASS; clean install completed and npm reported 0 vulnerabilities |
| `npm audit --omit=dev` | PASS; 0 vulnerabilities |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS; 535 frames verified |
| `npm run test:r3` | PASS |
| `npm run test:blog` | PASS |
| `npm run build` | PASS; `/blog` and `/blog/[slug]` are dynamic routes and all existing routes generated |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS |
| `npm run test:r4:smoke` | PASS |
| `npm run test:blog:smoke` | PASS |
| CMS fixture integration smoke | PASS; published post rendered, draft returned 404, and `<script>` payload was not emitted |
| Git diff check | PASS; no whitespace errors |
| External deployment | NOT_PERFORMED |

The first ordinary sandboxed build/install attempts encountered Windows `spawn EPERM` process/file-lock limitations. The permitted reruns of `npm ci` and `npm run build` completed successfully; this was classified as an environment limitation, not a source failure.

## Deployment and rollback

No Git push, DNS change, dashboard change, or production deployment was performed. Deploy the committed source revision only after configuring an approved public CMS endpoint and then repeat the live SEO/Blog verification. The preceding source checkpoint is `c3552cb`; the Prompt 02 implementation revision is `d635b02e6754a35c1fdbfed32eb8c41b052e3177`.
