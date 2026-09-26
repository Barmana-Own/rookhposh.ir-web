# Rookhposh Source-Code SEO Fix Prompts for Codex Luna Max

Use these prompts in order against the current `rookhposh.ir` source repository. Run one prompt at a time, inspect the result, and continue only when the previous prompt's gate passes. These prompts are intentionally idempotent: if a fix already exists, verify it and avoid duplicating or replacing it.

## Operating constraints

- Preserve the existing visual identity, Persian RTL behavior, GSAP/ScrollTrigger experience, 535-frame WebP sequence, pricing content, external integrations, and user-visible routes.
- Do not redesign the visual system unless required for performance, accessibility, or crawlability.
- Do not invent business, legal, pricing, review, location, trust, or schema claims.
- Do not keyword-stuff visible or hidden content.
- Do not rename `public/images/octaboot.png` merely for aesthetics. If a rename is technically justified, update every reference, verify the binary asset, preserve compatibility, and document the migration.
- Do not invent legal/FAQ URL slugs. Verify external routes first; if a route cannot be verified, preserve the existing link and document the limitation.
- Do not add a dependency when a Next.js or platform primitive is sufficient.
- Treat local build and HTTP evidence as authoritative for local behavior; do not claim ranking, indexing, or rich-result display without production verification.

## Current project facts

- Next.js 16 App Router.
- React 19.
- TypeScript.
- GSAP and ScrollTrigger.
- Persian and RTL.
- The page is primarily one landing page.
- The main animated experience is a large client component.
- The experience loads 535 WebP animation frames.
- The original source baseline had only basic title and description metadata.
- The original source baseline had no `app/robots.ts` or `app/sitemap.ts`; inspect the current repository because an earlier pass may already have added them.
- Footer FAQ, legal, and privacy links originally pointed to the blog root; verify whether actual destination pages exist before changing them.
- The current brand asset is named `octaboot.png`; the filename alone is not evidence that it should be renamed.

## Prompt 01 — Repository audit and integrity baseline

```text
Act as a principal frontend engineer and technical SEO auditor. Work against the current rookhposh.ir source repository. Do not modify files in this prompt.

Inspect the actual repository, not the supplied assumptions. Confirm the framework, route map, server/client boundaries, metadata, headings, image alt text, external links, frame-loading behavior, existing robots/sitemap/manifest files, and current validation scripts.

Create an evidence-based audit with:
- absolute file paths and line numbers;
- finding severity P0–P3;
- current behavior and user/search impact;
- smallest safe fix;
- whether the item is already fixed, partially fixed, or unresolved;
- checks that require production access and must remain NOT_RUN locally.

Establish a project-integrity baseline for the homepage, all existing assets, pricing cards, footer links, external integrations, and the 535-frame sequence. Do not remove or rename anything.

Gate: do not proceed until the audit distinguishes actual current source state from the supplied historical facts.
```

## Prompt 02 — Metadata, canonical, and language signals

```text
Implement only the source-level metadata fixes confirmed by Prompt 01.

Use the Next.js Metadata API in a server layout. Add or verify:
- an accurate Persian title and description for رخ پوش / Rookhposh virtual clothing try-on;
- deterministic metadataBase and canonical URL;
- Persian fa-IR Open Graph website metadata;
- Twitter card metadata;
- index/follow directives unless the audit found a real reason not to index;
- author/publisher and theme/viewport metadata where accurate;
- lang="fa" and dir="rtl" at the document root.

Centralize the public origin in a small shared module. Read NEXT_PUBLIC_SITE_URL only as a public configuration value, accept only http/https, and fall back safely to https://rookhposh.ir when missing or malformed. Do not include secrets or fabricated keywords.

Preserve the client animation boundary. Metadata must render without waiting for the 535-frame loader.

Gate: run the SEO source test, lint, and typecheck. Confirm that the rendered page has one canonical URL and no duplicate/conflicting metadata.
```

## Prompt 03 — Robots, sitemap, and manifest

```text
Implement or verify the Next.js metadata file conventions for the routes that actually exist in this repository.

1. Add app/robots.ts only if missing; allow the public landing page and point to the same-origin sitemap.
2. Add app/sitemap.ts only if missing; include the canonical homepage and no invented dashboard, blog, admin, or legal routes.
3. Add a Persian RTL app/manifest.ts only if it is appropriate and the values match the visible brand.
4. Use the validated shared site origin for every absolute URL.
5. Do not disallow Next.js assets that crawlers need to render the page.

Keep external dashboard/blog crawl policy out of this repository. Do not claim that a sitemap submits or indexes the separate subdomains.

Gate: build the app and verify HTTP 200 plus valid content for /robots.txt, /sitemap.xml, and /manifest.webmanifest from a local production server. Verify the robots sitemap pointer and sitemap URL are identical.
```

## Prompt 04 — Accurate structured data

```text
Add or audit static JSON-LD at the server-rendered boundary.

Use only schema.org entities supported by visible page content. A safe baseline for this repository is Organization, WebSite, and Service for a virtual clothing fitting-room service. Link them with stable @id values based on the canonical origin.

Do not invent:
- reviews or aggregate ratings;
- awards or certifications beyond the visible trust-seal link;
- price/offer currency semantics that are not explicit and correct;
- social profiles, branches, offices, or legal claims;
- search actions or breadcrumbs that the page does not support.

Keep JSON-LD static and controlled by source constants. Do not interpolate user input. Ensure structured data is consistent with the visible Persian copy and does not hide spam content.

Gate: parse the rendered JSON-LD as JSON, verify the expected graph types, and run lint/typecheck/build.
```

## Prompt 05 — Semantic HTML, accessibility, and no-JavaScript path

```text
Improve crawlable and accessible semantics without changing the visual identity.

Verify that the homepage has exactly one visible primary H1. Add explicit accessible labeling for the animated story region if needed, keep the pricing heading hierarchy valid, and provide meaningful alt text for informative brand/trust images. Keep purely decorative loader/frame imagery out of the accessibility tree.

Add a concise, truthful no-JavaScript fallback containing the same service explanation and dashboard CTA. It must not be keyword-stuffed or materially different from the visible product claim.

Preserve Persian RTL behavior, mixed LTR phone/URL handling, keyboard focus, reduced-motion behavior, and all existing content.

Gate: inspect rendered HTML for heading count, labels, alt text, and fallback markers. Confirm the fallback does not duplicate visible content when JavaScript is enabled.
```

## Prompt 06 — Footer links and brand asset handling

```text
Audit the footer links and brand assets as SEO and integrity surfaces.

The historical source used the blog root for FAQ, terms, and privacy labels. Verify whether the separate blog exposes those exact destination paths before changing them. If verified, update only to real canonical destinations. If not verified, do not invent slugs, do not silently delete the links, and document the external dependency and user-impact risk. Keep link labels truthful.

The historical brand asset is public/images/octaboot.png. Treat the filename as an implementation detail. Do not rename it unless there is a measurable SEO/accessibility/operational reason. If it remains the asset, improve its alt text and metadata usage without changing the binary or visual identity. If a new social-card asset is required, add it as an additive asset and update metadata references only after verifying dimensions and content.

Gate: verify every changed href, image reference, alt text, and protected asset against the integrity baseline. Do not claim external URLs were tested unless they were actually reachable and authorized to inspect.
```

## Prompt 07 — Performance and crawl resilience

```text
Review the 535-frame client experience for SEO-relevant performance risks without replacing the established visual story.

Preserve the canvas/GSAP/ScrollTrigger behavior and the existing frame sequence. Improve only evidence-based issues such as server-rendering crawl-critical text, first-frame readiness, cleanup of listeners/timelines, progressive loading, failed-frame tolerance, and reduced-motion behavior. Do not eagerly add a second copy of the full visual experience or replace it with generic stock content.

Confirm that the page remains useful if frames fail, the external trust seal is unavailable, or JavaScript is disabled. Avoid blocking metadata or primary copy on the animation.

Gate: run build, local production HTTP smoke, and the existing SEO regression test. Record any performance measurement that was not actually executed as NOT_RUN.
```

## Prompt 08 — Security and regression review

```text
Perform an adversarial review of the implemented SEO changes within the repository only.

Check for:
- unsafe origin configuration or URL injection;
- JSON-LD injection or secret leakage;
- misleading structured data;
- accidental noindex/nofollow;
- open redirects or invented external destinations;
- unsafe external resource behavior;
- missing response protections appropriate to this public page;
- deleted routes/assets/content or accidental production mocks.

Fix all material findings that are in repository control. Do not test or exploit the external dashboard, blog, trust-seal provider, or production infrastructure.

Gate: run npm audit, npm run test:seo, npm run lint, npm run typecheck, and npm run build. Report exact PASS/FAIL/NOT_RUN evidence.
```

## Prompt 09 — Final release gate and handoff

```text
Act as an independent release reviewer. Reconstruct the intended product from the source and compare the final repository against the integrity baseline.

Run the complete available validation set. Start a local production server and verify HTTP 200 for /, /robots.txt, /sitemap.xml, and /manifest.webmanifest. Confirm the home HTML contains canonical, Persian Open Graph, Twitter, JSON-LD, one visible H1, the existing pricing/footer content, and the no-JavaScript fallback. Confirm the sitemap includes only the canonical homepage and robots points to it.

Check that no existing route, asset, pricing plan, footer link, external integration, or visual behavior disappeared. Do not mark external deployment, Search Console, live rich-result testing, or external link reachability as PASS unless actually verified.

Produce a concise handoff with:
- changed files;
- requirements-to-evidence mapping;
- validation matrix;
- unresolved non-blocking issues;
- rollback notes;
- exact commands to run;
- final PASS, FAIL, or NOT_RUN status.
```

## Prompt usage notes

- The prompts are designed for an idempotent follow-up pass after a partial SEO implementation.
- The repository currently contains SEO route and metadata artifacts; Prompt 01 must verify them before Prompt 02–09 make decisions.
- A sitemap, schema, or metadata improvement can increase eligibility and comprehension, but cannot guarantee ranking or rich-result display.
- External FAQ/legal/privacy destinations and the separate dashboard/blog require verified ownership and routes before link changes.
