# Customer Delivery Report — Prompt 11 SEO Content Cluster Planning

| Field | Value |
| --- | --- |
| Project | Rookhposh public marketing site |
| Report type | Customer report |
| Language | English |
| Jalali date | ۱۴۰۵/۰۷/۰۸ |
| Gregorian date | 2026-09-30 |
| Source revision | `d0a78f2` plus uncommitted Prompt 04/07 working-tree changes |
| Delivery status | Source QA complete; research plan delivered; external deployment not performed |

## Executive summary

The separate Rookhposh CMS is connected to the first-party Blog on `rookhposh.ir` through a server-only published-content API. The homepage, approved visual identity, pricing, dashboard destination, and 535-frame animation remain preserved.

## Delivered capabilities

- The public site reads only validated, published CMS content through `BLOG_CONTENT_API_URL`.
- The CMS public API is paginated and exposes no drafts, review notes, session data, private user fields, audit records, or storage credentials.
- Tiptap article content is validated and safely rendered; the legacy Markdown path remains sanitized with raw HTML disabled.
- CMS outages, timeouts, invalid responses, and missing configuration degrade to a truthful Blog empty state without taking down the homepage.
- CMS publish, update, unpublish, archive, and slug changes can trigger signed server-to-server cache revalidation for the article, Blog index, sitemap, and RSS feed.
- Invalid revalidation authorization is rejected and secrets remain server-only.

## Validation summary

| Check | Result |
| --- | --- |
| Public typecheck and lint | PASS |
| Public SEO, R2, R3, R6, and Blog source validation | PASS |
| Public production build | PASS |
| Published/draft/noindex fixture | PASS |
| Publish/unpublish/republish fixture with signed revalidation | PASS |
| Invalid/valid revalidation smoke | PASS; 401 / 200 |
| CMS typecheck, lint, content/security tests | PASS; 9 tests |
| CMS dependency audit | PASS; 0 vulnerabilities |
| CMS production build and Prisma validation | PASS |
| Live MySQL-backed CMS integration | NOT_RUN; no authorized MySQL instance |
| External deployment/DNS verification | NOT_PERFORMED |

## Preserved scope and limitations

No animation runtime, GSAP/ScrollTrigger behavior, canvas logic, frame assets, pricing values, or dashboard authentication was changed. The integration is ready in source, but production still requires matching server-only revalidation secrets, a deployed CMS/API, an authorized MySQL database, production media storage configuration, and live endpoint verification.

## Handover status

Both repositories contain the implementation and validation documentation. Deployment and live publish/unpublish verification remain operational actions outside this source change.

## Prompt 08 cache update

The 535 animation frames were moved to a versioned `/frames/v1/` path so browsers and CDNs can safely reuse them for one year with immutable caching. The files, order, byte size, and measured content signature remain identical. The approved animation behavior and visual experience were not changed.

The local production-server check confirmed the first, middle, and last versioned frames return successfully with the intended cache policy, while the old unversioned path returns 404. The build, lint, typecheck, SEO, R2, R3, R6, Blog, and cache smoke checks passed; one unrelated legacy R6 browser-smoke copy assertion remains outside this task. External deployment was not performed.

## Prompt 09 Search Console readiness

The public site now has an optional, deployment-safe Google verification configuration. When the owner supplies a real Search Console HTML-tag token through the server/build-only `GOOGLE_SITE_VERIFICATION` variable, Next.js emits the verification metadata. When the variable is absent or invalid, no verification tag is emitted. No placeholder token, analytics ID, Search Console metric, ranking claim, or indexing result was added.

The owner/operator setup document covers Domain property preference, the HTML-tag fallback, `https://rookhposh.ir/sitemap.xml`, post-deployment checks, and future Queries/Pages exports. Local builds passed with the variable unset and with a non-production test value. Actual Search Console ownership verification and metrics remain NOT_RUN until owner-controlled access or an export is provided.

## Prompt 10 final quality gate

The public site and the separate CMS passed the available automated and local production checks. The approved homepage visual experience, Persian RTL layout, pricing, dashboard destination, and 535-frame animation remained intact. The local Blog safely shows an empty state until published content is connected; no fake article or SEO metric was added.

Live deployment, an authorized CMS database, real Search Console access, and the remaining external service checks still require operator action before production publication is considered complete.

## Prompt 11 research plan

The evidence-based Persian content-cluster plan is available at `docs/seo-content-cluster-01.md`. It contains eight article briefs, separates store-owner and consumer intent, identifies the current empty article inventory and live deployment drift, and lists the evidence and owner approvals required before publication. It does not create or publish content.

Search Console data and keyword-tool metrics are explicitly unavailable. The plan recommends starting with a store-owner evaluation guide, a factual image-preparation guide, and a category explainer only after the public deployment and product claims are verified. AI, fit, size, integration, and commercial-outcome statements remain subject to owner confirmation.
