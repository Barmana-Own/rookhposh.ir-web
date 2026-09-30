# Technical Delivery Report — Prompt 11 SEO Content Cluster Planning

| Field | Value |
| --- | --- |
| Project | `rookhposh.ir` public marketing application |
| Report type | Technical report |
| Language | English |
| Jalali date | ۱۴۰۵/۰۷/۰۸ |
| Gregorian date | 2026-09-30 |
| Repository revision | `d0a78f2` plus uncommitted working-tree changes |
| Scope | Search Console readiness, versioned animation caching, final regression evidence, and evidence-based Persian SEO content planning |
| Status | SOURCE_QA_COMPLETE; CONTENT_PLAN_ONLY; EXTERNAL_DEPLOYMENT_PENDING |

## Architecture and trust boundaries

The public site remains a standalone Next.js 16 App Router application. It does not import CMS code, database access, authentication, session state, editor routes, or write APIs. `cms.rookhposh.ir` remains a separate Next.js/Prisma/Auth.js application; `dash.rookhposh.ir` remains outside both repositories.

## Public-site changes

| Area | Implementation |
| --- | --- |
| `lib/blog/client.ts` | Server-only CMS URL resolution, loopback-only HTTP allowance, 4-second timeout, 5 MB response bound, Next fetch cache tag and revalidation window. |
| `lib/blog/repository.ts` | Published-record projection, bounded field lengths, publication/date/status checks, canonical-origin validation, safe CMS media URL resolution, category/author/tag normalization, and Tiptap JSON validation. |
| `lib/blog/rich-document.ts` | Allowlisted structured-content parser for headings, lists, links, marks, blockquotes, code blocks, images, and hard breaks. |
| `components/blog/BlogContent.tsx` | Server recursive renderer for validated Tiptap JSON; legacy Markdown remains behind `rehype-sanitize`, `skipHtml`, and image suppression. |
| `app/api/revalidate/blog/route.ts` | Dynamic POST receiver with 100 KB streaming body limit, timestamp/event-ID checks, HMAC-SHA256 verification, status/slug validation, 401/413/503 handling, and `revalidateTag`/`revalidatePath` invalidation. |
| `scripts/smoke-blog-fixture.mjs` | Mutable CMS fixture verifies published visibility, invalid signature rejection, unpublish removal from article/index/sitemap/feed, and republish visibility. |
| `scripts/smoke-revalidation.mjs` | Live-server invalid/valid signature smoke. |
| `.env.example` and docs | Server-only CMS/revalidation configuration and operational contract. |

## CMS changes used by the integration

| Area | Implementation |
| --- | --- |
| `src/app/api/public/posts` | Published-only API with page/limit bounds, `publishedAt <= now`, public field projection, normalized Tiptap JSON, and `private, no-store` responses to avoid stale intermediary publication state. |
| `src/lib/public-post.ts` | Safe public body and media projection. |
| `src/lib/public-revalidation.ts` | HMAC-SHA256 `post.changed` sender, random event ID, 3-second timeout, HTTPS production enforcement, and non-fatal failure behavior. |
| Post mutation routes | Send events after create/update/publish/unpublish/archive/slug changes, including previous slug when changed. |
| Prompt 06 editor/media/preview | Tiptap serialization, image signature validation/optimization, safe storage abstraction, alt text, audit/revision records, and short-lived noindex preview remain enabled. |
| `package.json`/lockfile | Pinned editor/media dependencies and `fast-uri@3.1.7` override after audit identified the transitive fix. |

## Security review

- No CMS admin token or revalidation secret is sent to browser code.
- Public CMS responses omit authentication, audit, review, private-user, and storage-secret fields.
- The receiver rejects stale, malformed, oversized, or incorrectly signed events.
- Replays within the five-minute signature window only cause idempotent cache invalidation; no content mutation is exposed by the receiver.
- Rich content is allowlisted at CMS write/public projection and public render boundaries; executable URLs and arbitrary HTML are rejected.
- Remote public CMS configuration requires HTTPS; loopback HTTP is limited to local smoke tests.
- Clean CMS install and `npm audit --json` report zero known vulnerabilities after the `fast-uri` override.

## Validation evidence

| Command/check | Result |
| --- | --- |
| Public `npm run test:seo` | PASS |
| Public `npm run test:r2` | PASS |
| Public `npm run test:r3` | PASS |
| Public `npm run test:r6` | PASS |
| Public `npm run test:blog` | PASS |
| Public `npm run typecheck` / `npm run lint` | PASS / PASS |
| Public `npm run build` | PASS |
| Public `npm run test:blog:smoke` | PASS |
| Public `npm run test:seo:smoke` | PASS |
| Public `npm run test:blog:fixture` | PASS |
| Public `npm run test:revalidation` | PASS; invalid 401, valid 200 |
| CMS `npm ci` | PASS; clean install, 0 audit vulnerabilities |
| CMS `npm run typecheck` / `npm run lint` | PASS / PASS |
| CMS `npm run test` | PASS; 9 tests |
| CMS `npm run db:validate` | PASS |
| CMS `npm run build` | PASS |
| CMS standalone smoke | PASS; `/login` 200, `/robots.txt` 200, protected route 307, public API 503 without DB |
| MySQL migration/app publish-unpublish integration | NOT_RUN; no authorized MySQL instance |
| External deployment and live CMS/public host verification | NOT_PERFORMED |

## Prompt 08 cache evidence

| Measure | Before | After |
| --- | --- | --- |
| Frame path | `public/frames/` | `public/frames/v1/` |
| Frame count | `535` | `535` |
| Total bytes | `11,423,938` | `11,423,938` |
| Sequence signature | `739bb260101d54d3d86d6077388363de9f6a52b9e71bfea9e1265c70c0200d86` | identical |
| Representative cache header | `public, max-age=0` | `public, max-age=31536000, immutable` |
| Legacy frame URL | available | `404` |

The signature is a SHA-256 over the LF-separated, sorted `filename:sha256(file)` entries. First, middle, and last frame hashes were also equal before and after the move. `AnimationRuntime.tsx` changed only its `FRAME_ROOT` constant; frame order, loading queue, concurrency, readiness, reduced-motion behavior, GSAP, ScrollTrigger, canvas drawing, layout, and timing were not changed.

`npm run test:r7:smoke` verified HTTP 200, WebP content type, and the immutable cache header for `frame_00001.webp`, `frame_00268.webp`, and `frame_00535.webp` against the local production server. The unversioned first-frame path returned HTTP 404.

## Regression and deployment status

No animation behavior, frame content, pricing value, route, or dashboard URL was removed or modified. Prompt 08 made the explicitly permitted asset-path-only change to the frame runtime and cache configuration. Production requires the `public/frames/v1/` directory to be included in the deployment artifact; future frame-content changes require a new versioned directory. CMS deployment still requires matching `PUBLIC_REVALIDATION_SECRET`/`BLOG_REVALIDATION_SECRET`, a reachable CMS public API, MySQL migration execution, production object-storage binding, and operational monitoring/retry for failed revalidation events.

The initial sandboxed `npm run build` attempt returned `spawn EPERM` while starting the TypeScript worker. The same build passed on the approved elevated rerun. The unrelated `npm run test:r6:smoke` script still fails its pre-existing homepage H1 expectation and was not changed in this animation-cache task.

## Prompt 09 Search Console readiness

| Check | Result |
| --- | --- |
| Optional Metadata API verification | PASS; `GOOGLE_SITE_VERIFICATION` is validated server/build configuration and emits one Google verification meta tag when valid |
| Missing-token behavior | PASS; verification metadata is omitted when the variable is unset or invalid |
| Safe environment template | PASS; `.env.example` keeps the variable empty and does not contain a real token |
| No public-token exposure | PASS; the variable is not `NEXT_PUBLIC_*` and no analytics/tag-management script was added |
| No-token production build | PASS |
| Configured-token production build | PASS; local test token only |
| Verification omission smoke | PASS |
| Invalid-token omission smoke | PASS |
| Verification emission smoke | PASS; exactly one configured tag |
| Sitemap/robots boundary smoke | PASS; canonical sitemap pointer and private-host exclusions verified |
| CMS publication fixture | PASS; published indexable article included, draft/noindex content excluded |
| External Search Console verification | NOT_RUN; owner-controlled property access/export was not supplied |

`docs/search-console-setup.md` documents the preferred Domain property, the supported HTML-tag URL-prefix fallback, deployment configuration, sitemap submission URL, post-deployment inspection, and later Queries/Pages export steps. It intentionally reports all real Search Console metrics as unavailable until the owner supplies access or an export. The homepage animation/design and the public sitemap’s CMS/dashboard exclusion boundaries were preserved.

## Prompt 10 final regression QA

The public site and separate CMS passed the available source-level final gate: clean locked installs, lint, typecheck, SEO/Blog/security tests, production builds, local HTTP route smoke, metadata/crawl-boundary checks, signed revalidation checks, and dependency audits. The public build returned 200 for the five marketing routes, Blog, robots, sitemap, feed, and manifest; an unknown Blog slug returned a genuine 404. The CMS standalone smoke denied anonymous protected routes, returned 401 for an unauthenticated mutation API, kept registration absent, and degraded its public API to a safe 503 without a database.

The 535-frame sequence remained content-identical at 11,423,938 bytes with the recorded sequence signature. A controlled desktop browser inspection found the RTL hero/navigation/sections and no console warning/error entries. Before/after screenshots, mobile/tablet viewport comparison, and browser reduced-motion emulation were NOT_RUN because no preserved baseline or viewport/emulation control was available. MySQL migration/application, external deployment, live CMS-backed publication, and Search Console access remain external prerequisites.

## Prompt 11 SEO content-cluster planning

`docs/seo-content-cluster-01.md` was added as a research-only artifact. It records the current source architecture, the older live-host drift (`/blog/`, `/robots.txt`, `/sitemap.xml`, and the new content routes are not present on the observed deployment), the unavailable article inventory, qualitative Persian SERP observations, intent separation, eight article briefs, evidence requirements, internal-link opportunities, owner decisions, and a prioritized editorial sequence. No article was created, published, or added to the sitemap, and no product code was changed.

The plan labels Search Console as `SEARCH CONSOLE ACCESS REQUIRED` and all keyword-tool metrics as `DATA NOT AVAILABLE`. It treats SERP results as time-bound observations rather than rankings or forecasts, keeps B2B/store-owner intent separate from unconfirmed B2C intent, and holds AI/fit/size claims until owner and technical evidence are supplied.
