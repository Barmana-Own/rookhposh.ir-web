# Requirements Traceability

## Functional requirements

| ID | Requirement | Acceptance evidence |
| --- | --- | --- |
| FR-001 | The homepage exposes a descriptive Persian title and meta description for the Rookhposh virtual fitting-room service. | `app/layout.tsx`; rendered homepage head |
| FR-002 | The homepage exposes an absolute canonical URL based on the validated public origin. | `metadataBase` and `alternates.canonical` |
| FR-003 | The homepage exposes Persian Open Graph and Twitter card metadata with a brand image. | `openGraph` and `twitter` metadata |
| FR-004 | Crawlers can discover a generated `robots.txt` and sitemap containing the canonical homepage. | `app/robots.ts`, `app/sitemap.ts` |
| FR-005 | The document includes accurate JSON-LD for the Rookhposh organization, website, and virtual-fitting-room service. | `components/seo/StructuredData.tsx` |
| FR-006 | The document retains a single primary H1 and uses semantic headings for the workflow and pricing sections. | `OctabootExperience.tsx` and rendered markup |
| FR-007 | Brand images have meaningful alternative text where they convey identity; decorative loader imagery remains ignored by assistive technology. | Updated image attributes |
| FR-008 | Users and crawlers without JavaScript receive a truthful service summary and dashboard CTA. | Server-rendered static scene fallback |
| FR-009 | The public origin can be configured with `NEXT_PUBLIC_SITE_URL` and invalid values safely fall back to the official origin. | `lib/site.ts`, `.env.example` |
| FR-010 | The app exposes a Persian RTL web manifest with the existing dark brand colors. | `app/manifest.ts` |
| FR-011 | The existing visual story, pricing cards, external links, frame assets, and footer content remain available. | Integrity manifest and build/smoke validation |
| FR-012 | The repository contains reusable prompts for a subsequent Codex Luna Max SEO audit or handoff. | `docs/rookhposh-seo-fix-prompts.md` |

## Non-functional requirements

| ID | Requirement | Acceptance evidence |
| --- | --- | --- |
| NFR-001 | SEO data must be server-renderable and must not depend on the client animation completing. | Metadata files and server component |
| NFR-002 | Structured data must not contain secrets or unsupported fabricated business claims. | Static graph review and security report |
| NFR-003 | The implementation must preserve Persian RTL behavior and responsive layouts. | Existing CSS retained; semantic additions are non-layout-breaking |
| NFR-004 | Metadata URLs must be deterministic across builds for the same `NEXT_PUBLIC_SITE_URL`. | Shared origin helper and route validation |
| NFR-005 | Crawl surfaces must not enumerate the dashboard/blog as if they were routes of this app. | One-entry sitemap and documented boundary |
| NFR-006 | Public responses should include baseline MIME, framing, referrer, and browser capability protections. | `next.config.ts` headers |
| NFR-007 | Validation must include lint, typecheck, SEO source checks, production build, and local HTTP smoke checks. | `docs/09-test-results.md` and `docs/12-final-review.md` |
| NFR-008 | No new dependency should be introduced for the SEO implementation. | `package.json` diff and lockfile review |
| NFR-009 | The public page should remain accessible when animation assets fail or JavaScript is unavailable. | Error-tolerant frame loader plus server-rendered fallback |
| NFR-010 | Documentation must distinguish verified checks from checks not run against external services. | Stage reports and final reports |
