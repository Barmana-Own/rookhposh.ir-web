# Frontend Architecture — Rookhposh SEO Delivery

## Runtime and framework

- Next.js 16.3.5 App Router with React 19 and TypeScript 5.9.
- Server root layout owns metadata, viewport, JSON-LD, and global font/CSS loading.
- `OctabootExperience.tsx` is a Server Component for semantic content, navigation, pricing, FAQ, footer, and fallback rendering. `AnimationRuntime.tsx` is the focused client boundary for image-sequence loading, canvas rendering, GSAP, and ScrollTrigger.

## Source layout

```text
app/
  layout.tsx              # server metadata, viewport, JSON-LD placement
  manifest.ts             # web manifest
  robots.ts               # crawl rules
  sitemap.ts              # canonical route map
  page.tsx                # homepage entry
  globals.css             # existing design system and responsive styles
components/
  marketing/               # shared header, footer, shell, breadcrumbs, and content blocks
  seo/StructuredData.tsx  # static schema.org graph
  sections/               # server-rendered content plus focused animation runtime
lib/site.ts               # validated public origin and site identity
scripts/validate-seo.mjs  # dependency-free SEO regression check
```

## Route map

- `/`: public homepage.
- `/for-online-stores/`: store-focused product explanation.
- `/how-it-works/`: factual seven-step workflow explanation.
- `/pricing/`: existing trial, seasonal, and annual plan comparison.
- `/faq/`: factual product FAQ.
- `/robots.txt`: generated crawl policy.
- `/sitemap.xml`: generated sitemap with the canonical homepage.
- `/manifest.webmanifest`: generated Persian RTL manifest.

## API and state strategy

There is no local API or server data source. Site identity is build-time configuration. The client keeps its existing local loader/animation state. No hidden production mock or fixture path was introduced.

## SEO implementation boundary

- `app/layout.tsx` exports `Metadata` and `Viewport` from a server component.
- `components/seo/StructuredData.tsx` emits static JSON-LD from controlled constants.
- `components/marketing/Breadcrumbs.tsx` emits visible breadcrumbs and matching `BreadcrumbList` JSON-LD for indexable content routes.
- `lib/site.ts` validates `NEXT_PUBLIC_SITE_URL` and supplies a deterministic fallback.
- The static homepage renders semantic/accessibility content and a truthful fallback before JavaScript runs. The client runtime enhances that markup only after a usable frame is available.

## Accessibility and localization

The existing Persian RTL document remains intact. The story section has an explicit accessible heading, brand images have descriptive alt text, the trust seal has a meaningful image name, the loader has a separate live status, and the server-rendered fallback contains the visible Persian service copy.

## Validation commands

```text
npm ci --ignore-scripts
npm run test:seo
npm run test:r2
npm run lint
npm run typecheck
npm run build
```

The production build also exposes the metadata route output for local HTTP smoke testing.

## Handoff to Stage 04

No backend boundary exists in this repository. Stage 04 should be recorded as not applicable rather than inventing a server domain or persistence layer.
