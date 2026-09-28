# Rookhposh SEO Source-Code Fix

## 1. Project identity

- Product: رخ پوش / Rookhposh
- Delivery: source-code SEO hardening for the existing Persian RTL Next.js landing page
- Primary URL: `https://rookhposh.ir`
- Current application: single-page App Router site with a scroll-driven virtual fitting-room experience
- Report date: 2026-09-26 / ۱۴۰۵-۰۷-۰۴

## 2. Executive summary

The existing Rookhposh homepage presents a virtual clothing try-on service for online retailers. The SEO work makes the page more discoverable and shareable without replacing the existing visual experience. It adds canonical metadata, Persian Open Graph/Twitter metadata, structured data, crawl directives, a sitemap, a web manifest, semantic accessibility improvements, a no-JavaScript content fallback, and safe origin configuration.

## 3. Product objective

Give clothing retailers a clear, trustworthy way to preview garments on customer images before purchase, reducing uncertainty in online selection and supporting conversion.

## 4. Problem statement

The page had useful visible copy and a single H1 but lacked the source-level SEO signals expected by search engines and social crawlers: canonical URL, complete social metadata, crawl files, structured data, and a resilient non-JavaScript content path.

## 5. Target users

| Actor | Responsibility | Core actions | Permission intent |
| --- | --- | --- | --- |
| Retailer / store operator | Evaluates the service for a store | Understands the workflow, compares plans, enters the dashboard | Public landing page; dashboard access is handled by the external application |
| Search visitor | Discovers the service | Reads the value proposition, pricing summary, and follows the CTA | Public read-only access |
| Social/share crawler | Previews shared links | Reads title, description, image, and canonical URL | Public metadata access |
| Search crawler | Indexes eligible public content | Reads the homepage, sitemap, robots, and structured data | Public crawl access |

## 6. Primary user journeys

1. Visitor lands on the Persian RTL homepage, sees the primary promise, and understands the virtual fitting-room workflow.
2. Visitor scrolls through the seven-step story, reads the pricing tiers, and selects a plan CTA.
3. Search crawler requests `/`, `/robots.txt`, and `/sitemap.xml`, then associates the page with the Rookhposh organization, website, and virtual-fitting-room service.
4. Social platform requests the homepage and receives a stable canonical URL, Persian title/description, and brand image.
5. Visitor with JavaScript disabled still receives a concise service explanation and dashboard link.

## 7. Core modules

- Metadata and site identity: `app/layout.tsx`, `lib/site.ts`
- Crawl surfaces: `app/robots.ts`, `app/sitemap.ts`
- Install/share identity: `app/manifest.ts`
- Structured data: `components/seo/StructuredData.tsx`
- Homepage experience: `components/sections/OctabootExperience.tsx`
- Loader lifecycle: `components/sections/LoaderSection.tsx`
- Validation: `scripts/validate-seo.mjs`

## 8. Business rules

- The public site describes Rookhposh as a virtual clothing try-on service for stores.
- SEO metadata must remain consistent with visible Persian content.
- The canonical public origin defaults to `https://rookhposh.ir` and may be overridden only by a valid HTTP(S) `NEXT_PUBLIC_SITE_URL` value.
- The external dashboard, blog, trust seal, and developer credit remain existing integrations and are not replaced.

## 9. External integrations

| Integration | Status | Use |
| --- | --- | --- |
| `https://dash.rookhposh.ir` | CONFIRMED by existing source | Dashboard and plan CTAs |
| `https://blog.rookhposh.ir` | CONFIRMED by existing source | Separate related host; no longer the primary public article destination |
| `BLOG_CONTENT_API_URL` | OPTIONAL | Public, read-only published article content source for the first-party Blog routes |
| `https://trustseal.enamad.ir` | CONFIRMED by existing source | Trust seal image and verification link |
| Search engines and social crawlers | ASSUMED | Consume metadata, structured data, robots, and sitemap |

## 10. Major data domains

This repository is a public frontend-only landing page with a first-party Blog presentation. Its relevant content domains are site identity, service description, plan summaries, contact details, published article content, and crawl/indexing metadata. There is no local application database, authenticated user record, payment record, CMS editor, or server-side business API in this repository.

## 11. Initial security and privacy concerns

- Do not expose secrets in metadata, JSON-LD, examples, or documentation.
- Keep JSON-LD static and sourced only from repository-controlled values.
- Validate the public site origin before using it in canonical URLs and structured data.
- Keep external trust-seal requests HTTPS-only and retain the existing origin referrer policy.
- Avoid indexing non-existent private paths or inventing sitemap entries for the separate dashboard application or unavailable Blog content.

## 12. In scope

- Source-level SEO metadata and canonicalization.
- Open Graph and Twitter card metadata.
- JSON-LD for organization, website, and service identity.
- `robots.txt`, `sitemap.xml`, and web manifest route files.
- Semantic heading/alt-text improvements and a truthful no-JavaScript fallback.
- Safe public origin configuration, baseline response headers, tests, documentation, and production build validation.
- A reusable prompt pack for Codex Luna Max tailored to this repository.

## 13. Out of scope

- Rebuilding the dashboard or operating a CMS/editor. The public Blog presentation is implemented in this repository; article authoring remains external.
- Creating a backend, database, authentication, or payment system.
- Fabricating business claims, reviews, locations, price schema, or social profiles not present in the source.
- Changing the established visual identity, animation sequence, pricing values, or external integrations.
- External Search Console submission, live crawler indexing guarantees, or production deployment without credentials and explicit authorization.

## 14. Constraints

- Preserve all existing user-visible content and the 535-frame story experience.
- Keep the implementation compatible with the existing Next.js 16 App Router setup.
- Maintain Persian RTL behavior and existing brand palette.
- Treat search-engine rich results as eligibility signals, not guaranteed ranking or presentation outcomes.

## 15. Assumptions

- `https://rookhposh.ir` is the intended canonical public origin because it is the project name and the existing dashboard/blog links use the same brand.
- Persian is the only published language in this repository; no `hreflang` alternate is emitted.
- The existing logo asset is the approved brand image for metadata until a dedicated social-card asset is supplied.

## 16. Risks

- The supplied logo has a non-standard social-card aspect ratio; social platforms may crop it differently.
- The blog and dashboard have separate crawl policies and are intentionally excluded from this app's sitemap.
- External trust-seal availability is not controlled by this repository.
- Search Console and real-crawler behavior cannot be verified locally.

## 17. Initial technical direction

Use the Next.js Metadata API and App Router file conventions, a small shared site-identity module, static JSON-LD rendered from a server component, and dependency-free source validation. Keep the landing page client animation intact and put crawl-critical information in server-rendered metadata and content.

## 18. Handoff notes for Stage 02

The UI is an existing dark, gold-accented Persian RTL editorial landing page. Stage 02 should preserve its visual hierarchy and seven-step story while documenting the semantic SEO surfaces, responsive states, accessibility constraints, and the new non-JavaScript fallback.

## Prompt 02 implementation update

The first-party public Blog presentation now lives at `/blog/` and `/blog/[slug]/`. It uses a server-rendered content-provider boundary under `lib/blog/` and remains safe when `BLOG_CONTENT_API_URL` is absent or unavailable. The external `blog.rookhposh.ir` host is retained only as a separate related integration and is not the primary public article destination. No local CMS, database, editor, authentication, or fabricated article content was added.
