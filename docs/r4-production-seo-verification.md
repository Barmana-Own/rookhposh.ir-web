# PRODUCTION_SEO_VERIFICATION — Rookhposh

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Verification phase | R4 — Production SEO Verification |
| Jalali date | ۱۴۰۵-۰۷-۰۴ |
| Gregorian date | 2026-09-26 |
| Source build | PASS |
| Controlled-production verification | PASS |
| Live production verification | FAIL — deployment is not synchronized with R1-R3 |

## Scope and environments

This verification separates the current repository's controlled production build from the public live host. No broad feature or visual changes were made for R4.

- Controlled environment: `next build` followed by `next start` at `http://127.0.0.1:3100`.
- Live environment: `https://rookhposh.ir` inspected in the connected browser.
- External systems: `https://blog.rookhposh.ir`, `https://dash.rookhposh.ir`, and the e-Namad host.
- Search Console, ranking, indexing, and field Core Web Vitals were not accessed and are not claimed.

## Source and controlled-production validation

| Check | Status | Evidence |
| --- | --- | --- |
| Production build | PASS | `npm run build` completed; Next.js generated the homepage, four content routes, manifest, robots, and sitemap. The sandbox-only attempt hit `spawn EPERM`; the permitted rerun passed. |
| R4 HTTP smoke | PASS | `npm run test:r4:smoke` verified 200 responses for the five public routes, 200 for robots and sitemap, exact metadata/canonical expectations, JSON-LD syntax, internal links, and an exact 404 for a nonexistent route. |
| R1-R3 smoke regression | PASS | `npm run test:seo:smoke` and `npm run test:r3:smoke` passed against the controlled production server. |
| Controlled rendered HTML | PASS | Browser inspection found Persian RTL markup, readable semantic content, one primary homepage heading, canonical, robots, Open Graph/Twitter metadata, Organization/WebSite/Service JSON-LD, canvas fallback, and internal links. |
| Controlled console errors | PASS | Browser console inspection returned no error or warning entries after page load. |
| Mobile rendering | NOT_RUN | The connected browser surface does not expose viewport emulation. The build includes a responsive viewport declaration and responsive CSS, but no emulated mobile render is claimed. |
| Reduced-motion rendering | NOT_RUN | The connected browser surface cannot emulate `prefers-reduced-motion`. R2 source validation remains PASS for the reduced-motion implementation. |

## Live production verification

| Check | Status | Evidence |
| --- | --- | --- |
| HTTPS | PASS | Navigating from `http://rookhposh.ir/` ended at `https://rookhposh.ir/`. |
| Canonical host | FAIL | The live host is reachable at `https://rookhposh.ir/`, but the rendered homepage contains no canonical link. |
| Homepage 200 | NOT_RUN | The homepage rendered successfully in the browser. A protocol-level status was not independently captured because the terminal HTTP client could not reach the site through the configured proxy. |
| Nonexistent URL genuine 404 | NOT_RUN | The live browser rendered the framework's `404 / This page could not be found` response for `/r4-nonexistent-verification-route`; the exact live HTTP status was not independently captured. The controlled build returned exact HTTP 404. |
| `robots.txt` | FAIL | `https://rookhposh.ir/robots.txt` rendered the site's 404 page. |
| `sitemap.xml` | FAIL | `https://rookhposh.ir/sitemap.xml` rendered the site's 404 page. |
| Canonical metadata | FAIL | No `<link rel="canonical">` was present in the rendered live homepage. |
| Open Graph | FAIL | No `og:title`, `og:description`, `og:url`, or `og:image` was present in the rendered live homepage. |
| Twitter metadata | FAIL | No Twitter card/title/image metadata was present in the rendered live homepage. |
| Raw HTML | NOT_RUN | The environment could inspect the rendered DOM but could not obtain a raw HTTP response body through the terminal client; no raw-HTML claim is made. |
| Rendered homepage HTML | PASS | Live homepage rendered Persian `lang="fa"`, `dir="rtl"`, readable pricing and product content, one H1, a canvas, and a completed loader state. |
| Rendered R3 routes | FAIL | `/for-online-stores`, `/how-it-works`, `/pricing`, and `/faq` all rendered the live site's 404 page. These routes are present in the repository but are not deployed to the live host. |
| JSON-LD | FAIL | No JSON-LD script was present in the rendered live homepage. |
| Internal links | FAIL | The live homepage still exposes hash-only navigation and old footer destinations. The R3 public routes are not linked from the deployed page; FAQ, Terms, and Privacy still point to the blog root in the live deployment. |
| Blog link | FAIL | `https://blog.rookhposh.ir/` failed browser DNS resolution with `ERR_NAME_NOT_RESOLVED`. |
| Dashboard link | PASS | `https://dash.rookhposh.ir/` loaded a page titled `رخ‌پوش` with the logo visible. |
| Mobile rendering | NOT_RUN | No mobile viewport emulation was available in the connected browser. |
| Reduced-motion | NOT_RUN | No live `prefers-reduced-motion` emulation was available. |
| Page load/network behavior | NOT_RUN | The live loader reached 100% and the canvas rendered, but no protocol-level network trace or request-size measurement was available. |
| Console-breaking errors | PASS | No error or warning entries were returned by the browser console inspection after loading the live homepage. |

## Root cause and remaining blockers

The public host is serving an older deployment than the verified repository. The live homepage title and description are present, but the R1-R3 metadata, crawl routes, JSON-LD, internal-link architecture, and four public content routes are absent. This is a deployment synchronization issue, not a source-build failure.

Required before production SEO verification can pass:

1. Deploy the verified R1-R3 build to the authorized production target.
2. Recheck the live homepage, `robots.txt`, `sitemap.xml`, all four public routes, canonical/social metadata, JSON-LD, and internal links with a protocol-level HTTP client.
3. Resolve or remove the externally hosted blog destination after owner/operator confirmation; do not change DNS from this source repository.
4. Perform mobile viewport and reduced-motion browser checks in a browser capable of those emulations.
5. Run Search Console or another authorized provider check separately; do not infer indexing or ranking from this verification.

## Final verdict

The R1-R3 source and controlled production build pass the R4 regression contract. Live production SEO verification fails until the verified build is deployed and the external blog/DNS issue is resolved or explicitly accepted by the owner/operator.
