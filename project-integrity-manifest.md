# Project Integrity Manifest

## Baseline

- Baseline date: 2026-09-26 / ۱۴۰۵-۰۷-۰۴
- Repository shape: single Next.js App Router application under `app/`
- Baseline source routes: `/`
- Baseline metadata surface: `app/layout.tsx` with title and description
- Baseline user-facing features: loader, scroll-driven virtual fitting-room story, pricing cards, external dashboard/blog links, trust seal, footer contact details
- Baseline protected assets: `public/images/octaboot.png`, `public/frames/frame_00001.webp` through `frame_00535.webp`
- Baseline configuration: `package.json`, `package-lock.json`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`
- Baseline validation surface: lint, typecheck, build scripts

## Final comparison

- No existing route, feature, asset, pricing tier, external integration, or user-visible flow was removed.
- Existing homepage behavior and visual sequence remain in place.
- New SEO, rendering, performance, and operations surfaces are additive: canonical metadata, social metadata, JSON-LD, manifest, robots, sitemap, environment template, security headers, server-rendered semantic content, a bounded frame queue, reduced-motion handling, and validation documentation.
- R1 adds a factual local FAQ destination. Terms of Use and Privacy Policy labels remain non-interactive because approved legal copy/routes were not supplied; no existing external integration was redirected or deleted.
- R1 adds production smoke coverage for metadata, canonical, robots, sitemap, JSON-LD, route statuses, and genuine 404 behavior.
- R2 keeps the 535 frame files and visual story, moves semantic content into server-rendered components, and limits browser-only code to `AnimationRuntime.tsx`.
- R2 adds `public/images/rookhposh-mark.webp` as an optimized additive asset and preserves `public/images/octaboot.png` until a separate compatibility audit authorizes removal.
- R2 adds source validation and production smoke coverage for the fallback scene, loader status, and server-rendered semantic content.
- R3 adds four factual public routes, shared internal navigation, route metadata, breadcrumb JSON-LD, and a maintainable public sitemap registry. The original homepage, animation, pricing facts, external integrations, and legal-content boundary remain preserved.
- R3 does not add `/virtual-try-on/`, `/features/`, `/about/`, `/contact/`, `/terms/`, or `/privacy/` because distinct approved content or owner decisions are not available.
- R4 added only verification/reporting artifacts; no application route, feature, asset, pricing tier, external integration, or user-visible flow was removed. Live-host inspection identified deployment drift from the verified source and did not mutate external systems.
- Prompt 02 adds the first-party `/blog/` and `/blog/[slug]/` presentation, a validated external content-provider boundary, safe Markdown rendering, and Blog-specific source/production smoke checks. No local CMS, database, editor, authentication, fake post, existing route, asset, pricing tier, or animation behavior was removed.
- With no `BLOG_CONTENT_API_URL` configured during validation, the Blog renders a truthful empty state, remains `noindex`, and is excluded from the sitemap. A temporary CMS fixture confirmed published rendering, draft exclusion, real missing-slug 404 behavior, and script stripping.
- Prompt 03 adds article-level BlogPosting/breadcrumb JSON-LD with safe serialization, request-time CMS-aware sitemap generation, an escaped RSS feed, a deterministic 1200×630 social-card route, and contextual Blog discovery from the store page. The old Blog subdomain was removed from Organization `sameAs`; no homepage animation or protected asset changed.
