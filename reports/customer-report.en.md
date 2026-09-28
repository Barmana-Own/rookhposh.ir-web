# Customer Delivery Report — Prompt 03 Article SEO and Blog Discovery

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Report type | Customer report |
| Language | English |
| Jalali date | ۱۴۰۵-۰۷-۰۶ |
| Gregorian date | 2026-09-28 |
| Source revision | `800ba8932bddef0c45eaed9a1e2ec6abd987fccf` |
| Branch | `feature/r5-prompt-01-navigation` |
| Delivery status | Source implementation complete; external deployment not performed |

## Executive summary

A first-party public Blog foundation and the article SEO/discovery layer were delivered on `rookhposh.ir` without changing the approved homepage design, pricing, dashboard destination, or 535-frame animation experience.

## Delivered capabilities

- `/blog/` is now the main-domain article index.
- `/blog/[slug]/` supports server-rendered published articles with title, lead, image, author, dates, body, category, tags, related content, and product-context CTA when those facts are supplied by the content source.
- The site can read published content from an optional public CMS/API configured with `BLOG_CONTENT_API_URL`; no CMS, editor, database, authentication, or write endpoint was added to this repository.
- Before CMS connection, the site shows a truthful empty state, does not fabricate articles, marks the empty index `noindex`, and excludes it from the sitemap.
- Missing, unpublished, invalid, or unavailable article slugs return a genuine 404.
- Markdown article content is sanitized and raw HTML is disabled before server rendering.
- The header/footer first-party Blog destination remains `/blog`; `blog.rookhposh.ir` is not used as the primary public article route.

## Preserved scope

The approved animation runtime, GSAP/ScrollTrigger behavior, canvas logic, frame files/order/count, hero composition, pricing values, brand styling, and dashboard URL were not changed. The frame inventory remains 535 files totaling 11,423,938 bytes.

## Quality and validation

| Check | Result |
| --- | --- |
| Dependency installation | PASS; `npm ci`, 0 reported vulnerabilities |
| Lint | PASS |
| TypeScript | PASS |
| Existing SEO/R2/R3 source checks | PASS |
| Blog source check | PASS |
| Production build | PASS |
| Existing SEO/R3/R4 production smoke | PASS |
| Blog empty-state smoke | PASS |
| CMS fixture smoke | PASS; published content rendered, draft content excluded, script payload not emitted |
| Article metadata/structured-data fixture | PASS; article metadata, BlogPosting/BreadcrumbList JSON-LD, canonical and author/date fields verified |
| Dynamic sitemap/feed fixture | PASS; published indexable content included; drafts and noindex content excluded |
| RSS and social-card smoke | PASS; escaped RSS content type and deterministic 1200×630 PNG verified |
| Organization identity cleanup | PASS; old Blog subdomain removed from `sameAs` |
| External deployment | NOT_PERFORMED |

## Remaining operational requirement

An approved CMS/API URL and published content are required before article pages can display real posts or become indexable. The verified source revision must also be deployed and the live host rechecked; no Git push, DNS change, or production deployment was performed in this task.

## Exact implementation areas

The source change includes the first-party Blog routes and components, the `lib/blog/` content boundary, article metadata and JSON-LD, request-time sitemap generation, escaped RSS at `/feed.xml`, a deterministic `/opengraph-image` social card, contextual internal discovery links, scoped Blog styles, the optional environment template, Blog source/HTTP/fixture smoke checks, dependency lockfile updates, and the related technical/project documentation and release state files.

## Prompt 03 delivery update

- Each published article now receives validated SEO fallbacks, main-domain canonical metadata, article Open Graph/Twitter fields, publication/update dates, author metadata, and `index/follow` or explicit `noindex` behavior.
- Article pages emit `BlogPosting` JSON-LD that references the existing Rookhposh Organization entity and a `BreadcrumbList` matching the visible breadcrumb.
- `/sitemap.xml` is request-time CMS-aware, retains the static marketing routes during provider failure, and includes only published indexable Blog content.
- `/feed.xml` is a public escaped RSS feed containing only published indexable articles. `/opengraph-image` returns a deterministic 1200×630 PNG large-card surface.
- The store page now links to `/blog`, and the old external Blog host is no longer emitted as an Organization `sameAs` identity signal.

The source revision is verified locally. No external deployment, DNS change, CMS configuration, or live indexing claim was made. The public host still requires deployment of this revision before production SEO behavior can be rechecked.
