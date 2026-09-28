# Technical Delivery Report — Prompt 02 and Prompt 03 Blog Delivery

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Report type | Technical report |
| Language | English |
| Jalali date | ۱۴۰۵-۰۷-۰۶ |
| Gregorian date | 2026-09-28 |
| Source revision | `800ba8932bddef0c45eaed9a1e2ec6abd987fccf` |
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

## Prompt 03 incremental implementation

### Exact files and responsibilities

| File | Change |
| --- | --- |
| `app/blog/[slug]/page.tsx` | Adds article Open Graph locale/site metadata, safe related-post filtering, and server-rendered `BlogPosting` JSON-LD. |
| `app/blog/page.tsx` | Adds distinct Blog metadata and an RSS alternate link while preserving empty/indexable robots behavior. |
| `components/seo/BlogPostingStructuredData.tsx` | Serializes supported `BlogPosting` fields only, including validated image, dates, author, Organization publisher reference, canonical main entity, and `fa-IR`. |
| `components/seo/JsonLd.tsx` | Centralizes safe JSON-LD serialization, escaping script-breaking characters before insertion. |
| `components/seo/StructuredData.tsx` | Reuses the safe serializer and removes the unverified `blog.rookhposh.ir` `sameAs` value. |
| `components/marketing/Breadcrumbs.tsx` | Reuses the safe serializer for visible-breadcrumb JSON-LD. |
| `app/sitemap.ts` | Uses request-time generation so CMS publication state is reflected without rebuilding and static routes survive provider failure. |
| `app/feed.xml/route.ts` | Adds escaped RSS 2.0 with canonical article links, publication dates, categories/authors when present, and published/indexable filtering. |
| `app/opengraph-image.tsx` | Adds a deterministic 1200×630 PNG social-card route. |
| `lib/marketing.ts`, `app/layout.tsx` | Makes the deterministic large social card the site-wide Open Graph/Twitter asset. |
| `app/for-online-stores/page.tsx`, `app/globals.css` | Adds a restrained contextual Blog link and the smallest responsive spacing adjustment. |
| `scripts/smoke-blog-fixture.mjs` | Runs an isolated mock-CMS/production-server check for article metadata, structured data, sanitization, dynamic sitemap, and RSS inclusion/exclusion. |
| `scripts/smoke-blog.mjs`, `scripts/validate-blog.mjs`, `scripts/validate-seo.mjs`, `package.json` | Extends no-CMS smoke/source contracts and exposes the fixture test command. |
| `docs/blog-content-provider.md`, `docs/10-known-issues.md`, `docs/12-final-review.md`, `README.md`, `project-integrity-manifest.md`, `project-state.json`, `release-manifest.json` | Records Prompt 03 behavior, risks, integrity, validation, and release artifacts. |

### Metadata and URL validation

Article metadata uses `seoTitle`/`title`, `metaDescription`/`excerpt`, approved same-origin canonical overrides or the normalized main-domain article URL, article Open Graph type, published/modified dates, author, and large Twitter cards. The provider boundary accepts canonical overrides only on the configured site origin and accepts asset URLs only when relative or HTTPS. Invalid records are discarded before metadata, schema, sitemap, or feed generation.

### Structured data and discovery

Article pages emit `BlogPosting` and the shared visible breadcrumb emits `BreadcrumbList`. The article schema references the site Organization entity, uses `inLanguage: fa-IR`, and does not synthesize ratings, reviews, offers, or other unsupported claims. Sitemap and feed routes consume the same validated published repository; `noindex` records are excluded from both. The Blog index advertises `/feed.xml` through the Metadata API.

### Social card implementation note

The first production build exposed an unsupported complex-font rendering failure in the new `ImageResponse` route. The route was repaired by reducing the rendered copy to a reliable minimal brand card while retaining the required 1200×630 PNG output. The repaired build and HTTP smoke passed.

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
| `npm run build` | PASS; `/blog`, `/blog/[slug]`, `/feed.xml`, and `/sitemap.xml` are dynamic; `/opengraph-image` is generated as a static image route |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS |
| `npm run test:r4:smoke` | PASS |
| `npm run test:blog:smoke` | PASS |
| `npm run test:blog:fixture` | PASS; normal sandbox attempt was `spawn EPERM`, elevated rerun passed; published article metadata/schema/sitemap/feed behavior and sanitizer were verified |
| CMS fixture integration smoke | PASS; published post rendered, draft returned 404, noindex/draft entries were excluded, and `<script>` payload was not emitted |
| Git diff check | PASS; no whitespace errors |
| `npm audit --omit=dev` | PASS; 0 vulnerabilities |
| External deployment | NOT_PERFORMED |

The first ordinary sandboxed build and Blog fixture attempts encountered Windows `spawn EPERM` process/file-lock limitations. The permitted reruns of `npm ci`, `npm run build`, and `npm run test:blog:fixture` completed successfully; these were classified as environment limitations, not source failures.

## Deployment and rollback

No Git push, DNS change, dashboard change, or production deployment was performed. Deploy `800ba8932bddef0c45eaed9a1e2ec6abd987fccf` only after configuring an approved public CMS endpoint and then repeat the live SEO/Blog verification. The Prompt 03 source change preserves the Prompt 02 content-provider boundary and does not claim live indexing or ranking outcomes.
