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
npm run test:r2
npm run test:r3
npm run test:r4:smoke
npm run test:seo:smoke
npm run test:r3:smoke
npm run lint
npm run typecheck
npm run build
npm run start
```

The source tests check metadata/crawl/schema markers, the R2 rendering/frame-loading safeguards, and the R3 route/intent registry. The controlled-production R4 smoke test runs against `next start` and verifies rendered metadata, canonical URLs, robots, sitemap, JSON-LD syntax, RTL, internal links, expected route statuses, and a genuine 404 response. The production smoke tests run against the same build and verify the complete R1-R3 contract. The production build generates the homepage, four factual public content routes, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest`.

## SEO surfaces

- Canonical, Persian Open Graph/Twitter, robots, and viewport metadata: `app/layout.tsx`
- JSON-LD organization, website, and service graph: `components/seo/StructuredData.tsx`
- Crawl policy: `app/robots.ts`
- Canonical sitemap: `app/sitemap.ts`
- Persian RTL manifest: `app/manifest.ts`
- Reusable Codex Luna Max handoff prompts: `docs/rookhposh-seo-fix-prompts.md`
- R1 technical SEO evidence: `docs/r1-technical-seo-foundation.md`
- R2 before measurements: `docs/r2-before-measurements.md`
- R2 performance/rendering evidence: `docs/r2-performance-rendering-refactor.md`
- R3 information architecture evidence: `docs/r3-information-architecture.md`
- R4 production verification evidence: `docs/r4-production-seo-verification.md`

## Rendering and animation boundary

`components/sections/OctabootExperience.tsx` and `LoaderSection.tsx` render the semantic page and static fallback on the server. `components/sections/AnimationRuntime.tsx` is the only browser runtime for canvas, GSAP, ScrollTrigger, and the bounded 535-frame queue. The first frame window is progressive and capped at four concurrent downloads; the page does not wait for all frames before exposing useful content.

`public/images/rookhposh-mark.webp` is the optimized additive brand asset used for static imagery and metadata. The original `public/images/octaboot.png` remains preserved until a separate compatibility audit authorizes removal.

## Public content routes

- `/for-online-stores/` — store-focused service explanation.
- `/how-it-works/` — factual seven-step workflow.
- `/pricing/` — existing trial, seasonal, and annual plans.
- `/faq/` — factual product questions and answers.

Terms of Use, Privacy Policy, and a separate direct-to-consumer `/virtual-try-on/` page remain unpublished pending owner-approved content and positioning decisions.

The R4 live-host check found that `https://rookhposh.ir` is serving an older deployment that does not yet contain the R1-R3 metadata, crawl routes, or public content routes. The source and controlled-production build pass; live production remains blocked until the verified build is deployed and rechecked.

## Footer content boundary

The FAQ link points to factual content in the landing page. Terms of Use and Privacy Policy remain non-interactive until approved legal copy and production routes are supplied; no legal commitments are invented in this repository.

## Scope boundary

This repository owns the public landing page only. The dashboard, blog, and trust-seal provider are external systems and are not reimplemented here. No local database, authentication system, or application API is required for this page.
