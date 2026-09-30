# Rookhposh

Persian RTL Next.js landing page for رخ پوش, a virtual clothing try-on service for retailers.

## Local setup

Requirements: Node.js 22 or a compatible current LTS release.

```text
npm ci
copy .env.example .env.local
npm run dev
```

The public origin is configured with `NEXT_PUBLIC_SITE_URL`. The default is `https://rookhposh.ir` when the variable is absent or invalid.

## Validation

```text
npm run test:seo
npm run test:search-console
npm run test:r2
npm run test:r3
npm run test:r6
npm run test:blog
npm run test:r4:smoke
npm run test:seo:smoke
npm run test:search-console:smoke
npm run test:r3:smoke
npm run test:r6:smoke
npm run test:blog:smoke
npm run test:blog:fixture
npm run lint
npm run typecheck
npm run build
npm run start
```

The source tests check metadata/crawl/schema markers, the R2 rendering/frame-loading safeguards, the R3 route/intent registry, the R6 page-intent/product-claim safeguards, and the Blog provider/rendering boundary. The controlled-production R4 smoke test runs against `next start` and verifies rendered metadata, canonical URLs, robots, sitemap, JSON-LD syntax, RTL, internal links, expected route statuses, and a genuine 404 response. The R6 smoke checks distinct marketing titles/H1s, contextual Blog discovery, neutralized unsupported wording, and unchanged pricing values. The production smoke tests run against the same build and verify the complete R1-R3 contract plus the no-CMS Blog empty state, RSS feed, and generated social-card route. `npm run test:blog:fixture` starts an isolated local CMS fixture and production server to verify article metadata, BlogPosting/BreadcrumbList JSON-LD, sitemap/feed inclusion and exclusion, and sanitized content. The production build generates the homepage, four factual public content routes, first-party Blog routes, `/feed.xml`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest`.

## SEO surfaces

- Canonical, Persian Open Graph/Twitter, robots, and viewport metadata: `app/layout.tsx`
- JSON-LD organization, website, and service graph: `components/seo/StructuredData.tsx`
- Safe JSON-LD serialization and article BlogPosting schema: `components/seo/JsonLd.tsx`, `components/seo/BlogPostingStructuredData.tsx`
- Crawl policy: `app/robots.ts`
- Canonical sitemap: `app/sitemap.ts`
- Published article RSS feed: `app/feed.xml/route.ts`
- Deterministic 1200×630 social card: `app/opengraph-image.tsx`
- Persian RTL manifest: `app/manifest.ts`
- Reusable Codex Luna Max handoff prompts: `docs/rookhposh-seo-fix-prompts.md`
- R1 technical SEO evidence: `docs/r1-technical-seo-foundation.md`
- R2 before measurements: `docs/r2-before-measurements.md`
- R2 performance/rendering evidence: `docs/r2-performance-rendering-refactor.md`
- R3 information architecture evidence: `docs/r3-information-architecture.md`
- R4 production verification evidence: `docs/r4-production-seo-verification.md`
- R6 page intent map: `docs/r6-page-intent-map.md`
- Product claims needing owner verification: `docs/product-claims-needing-owner-verification.md`
- Blog provider contract and safety boundary: `docs/blog-content-provider.md`
- Google Search Console verification and post-deployment checklist: `docs/search-console-setup.md`

## Rendering and animation boundary

`components/sections/OctabootExperience.tsx` and `LoaderSection.tsx` render the semantic page and static fallback on the server. `components/sections/AnimationRuntime.tsx` is the only browser runtime for canvas, GSAP, ScrollTrigger, and the bounded 535-frame queue. The first frame window is progressive and capped at four concurrent downloads; the page does not wait for all frames before exposing useful content.

`public/images/rookhposh-mark.webp` is the optimized additive brand asset used for static imagery and metadata. The original `public/images/octaboot.png` remains preserved until a separate compatibility audit authorizes removal.

The 535 WebP animation frames are served from the versioned `public/frames/v1/` path with long-lived immutable caching. `GOOGLE_SITE_VERIFICATION` is an optional build-time server variable; when it is absent or invalid, the verification meta tag is omitted.

## Public content routes

- `/for-online-stores/` — store-focused service explanation.
- `/how-it-works/` — factual seven-step workflow.
- `/pricing/` — existing trial, seasonal, and annual plans.
- `/faq/` — factual product questions and answers.
- `/blog/` — first-party server-rendered published-article index, with a truthful empty state when no provider is configured.
- `/blog/[slug]/` — first-party server-rendered published article route with real 404 behavior for unavailable content.
- `/feed.xml` — escaped RSS feed for published, indexable articles.

Terms of Use, Privacy Policy, and a separate direct-to-consumer `/virtual-try-on/` page remain unpublished pending owner-approved content and positioning decisions.

The R4 live-host check found that `https://rookhposh.ir` is serving an older deployment that does not yet contain the R1-R3 metadata, crawl routes, or public content routes. The source and controlled-production build pass; live production remains blocked until the verified build is deployed and rechecked.

## Footer content boundary

The FAQ link points to factual content in the landing page. Terms of Use and Privacy Policy remain non-interactive until approved legal copy and production routes are supplied; no legal commitments are invented in this repository.

## Scope boundary

This repository owns the public landing page and the first-party Blog presentation. The separate CMS at `cms.rookhposh.ir` owns article authoring/content storage; this application consumes only its published public API through the server-only `BLOG_CONTENT_API_URL`. The dashboard and trust-seal provider remain external systems. No CMS database, authentication system, editor, or write API is implemented here.

The CMS can notify this application after publish, update, unpublish, archive, or slug changes through the authenticated server-only `/api/revalidate/blog` Route Handler. Configure the matching `BLOG_REVALIDATION_SECRET` and `PUBLIC_REVALIDATION_SECRET` values outside source control.
