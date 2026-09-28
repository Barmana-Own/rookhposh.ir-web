# R3 — Information Architecture and Indexable Content Report

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Phase | R3 — Content, Information Architecture and Internal Links |
| Gregorian date | 2026-09-26 |
| Jalali date | ۱۴۰۵-۰۷-۰۴ |
| Result | PASS WITH DOCUMENTED OWNER DECISIONS |
| Scope | Public marketing routes, internal links, metadata, breadcrumbs, and sitemap |

## INTENT ANALYSIS

### B2C messaging

- The hero invites the visitor to try a virtual fitting experience before purchase.
- The story asks for a personal image and describes seeing clothing on that image.
- The copy discusses choosing a model, color, and size and comparing styles.

### B2B/store messaging

- The site description explicitly says the service is for stores (`فروشگاه‌ها`).
- Pricing copy repeatedly refers to a store, store growth, campaigns, collections, access terms, and usage credits.
- The dashboard CTA and the plan-selection CTAs point to `dash.rookhposh.ir`, which is a separate product host.

### Shared product messaging

The factual overlap is the virtual clothing try-on workflow: upload a clear full-body image, choose clothing options, preview the result, compare choices, refine color/size, and make a more informed purchase decision.

### Recommendation

The primary homepage intent should be B2B/store enablement: Rookhposh is presented as a virtual clothing try-on service for stores, while the consumer try-on language explains the product experience and its user-facing result. The implementation preserves the current homepage H1 and visual positioning until the owner approves a positioning change; no silent B2B rewrite was made.

## OWNER DECISIONS REQUIRED

1. Confirm that the primary public positioning is “virtual try-on for stores” and that the consumer language is a product demonstration rather than a separate direct-to-consumer offering.
2. Confirm whether individual consumers can sign up directly. If yes, a dedicated `/virtual-try-on/` route can be evaluated later with an approved consumer CTA and service details. If no, the current route plan should remain B2B-first.
3. Approve the production destination and copy for Terms of Use and Privacy Policy. Those routes remain unpublished and their footer labels remain non-interactive.
4. Confirm that the `/for-online-stores/` slug is acceptable even though the visible copy intentionally uses the broader factual term “فروشگاه‌ها”.

## ROUTES CREATED

| Route | Intent | Factual content basis |
| --- | --- | --- |
| `/for-online-stores/` | Store/operator understanding of the service | Existing store language, image → clothing selection → preview workflow, dashboard and plan links |
| `/how-it-works/` | Workflow explanation | Existing seven story stages and visible product behavior |
| `/pricing/` | Plan comparison | Existing trial, seasonal, and annual plans, terms, credits, prices, and unit rates |
| `/faq/` | Question-led discovery and support | Existing four factual FAQ questions and answers |

The existing homepage remains the primary entry point and now links to these routes through the shared header/footer architecture. No separate page was created for every keyword variant.

## ROUTES NOT CREATED AND WHY

| Candidate | Decision | Reason |
| --- | --- | --- |
| `/virtual-try-on/` | Not created | Consumer intent is present in the experience, but a separate consumer product, signup path, and owner-approved positioning are not established. |
| `/features/` | Not created | The factual feature set is adequately covered by the workflow and store pages; a separate page would substantially duplicate them. |
| `/about/` | Not created | No approved company history, team, mission, or other distinct factual narrative was supplied. |
| `/contact/` | Not created | The repository has a phone number and address, but no approved contact workflow or additional content sufficient for a useful standalone page. They remain visible in the shared footer. |
| `/terms/` and `/privacy/` | Not created | Binding legal copy and approved production routes were not supplied. Placeholder legal pages would be misleading. |
| `/blog/` | Not created at R3 time | The first-party Blog was intentionally deferred to Prompt 02; the external `blog.rookhposh.ir` host was not treated as a route of this app. |

## INTERNAL LINK MAP

| Source | Destination | Anchor / purpose |
| --- | --- | --- |
| Shared header | `/how-it-works/` | `نحوه کار` |
| Shared header | `/pricing/` | `تعرفه‌ها` |
| Homepage/footer | `/` | `صفحه اصلی` |
| Homepage/footer | `/how-it-works/` | `نحوه کار` |
| Homepage/footer | `/faq/` | `سؤالات متداول` |
| Homepage/footer | `/for-online-stores/` | `برای فروشگاه‌ها` |
| Homepage/footer | `/pricing/` | `تعرفه‌ها` |
| `/how-it-works/` | `/for-online-stores/` | `آشنایی با کاربرد برای فروشگاه‌ها` |
| `/for-online-stores/` | `/pricing/` | `مشاهده تعرفه‌ها` |
| `/pricing/` | `/faq/` | `مشاهده سؤالات متداول` |
| `/faq/` | `/how-it-works/` | `مشاهده نحوه کار` |

The external blog, dashboard, trust-seal, phone, and credit links remain intact. Anchors describe the destination naturally and are not generated from keyword variants.

## METADATA MAP

All created routes use the shared `createPageMetadata` helper. Each route is indexable, has a unique title and description, an absolute trailing-slash canonical, Open Graph URL/title/description/image, Twitter title/description/image, and `index, follow` robots directives.

| Route | Title before root template | Rendered title | Canonical |
| --- | --- | --- | --- |
| `/for-online-stores/` | پرو مجازی لباس برای فروشگاه‌ها | پرو مجازی لباس برای فروشگاه‌ها \| رخ پوش | `https://rookhposh.ir/for-online-stores/` |
| `/how-it-works/` | نحوه کار پرو مجازی لباس | نحوه کار پرو مجازی لباس \| رخ پوش | `https://rookhposh.ir/how-it-works/` |
| `/pricing/` | تعرفه پرو مجازی لباس برای فروشگاه‌ها | تعرفه پرو مجازی لباس برای فروشگاه‌ها \| رخ پوش | `https://rookhposh.ir/pricing/` |
| `/faq/` | سؤالات متداول پرو مجازی لباس | سؤالات متداول پرو مجازی لباس \| رخ پوش | `https://rookhposh.ir/faq/` |

Each page has one purpose-specific H1 provided by the shared page shell. Breadcrumbs are visible and use the same names as their breadcrumb JSON-LD.

## STRUCTURED DATA DECISION

The existing Organization, WebSite, and Service graph remains server-rendered on every public route. Each created route adds visible breadcrumb navigation and matching `BreadcrumbList` JSON-LD.

No `FAQPage` JSON-LD was added. The FAQ is real and visible, but current Google guidance says FAQ rich results are generally limited to well-known authoritative government and health websites; valid structured data also does not guarantee a rich result. The page remains useful and indexable without promising a search enhancement. References: [Google FAQ changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes) and [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## SITEMAP RESULT

`app/sitemap.ts` now uses the maintainable `PUBLIC_INDEXABLE_ROUTES` registry and emits exactly five public indexable routes:

- `https://rookhposh.ir/`
- `https://rookhposh.ir/for-online-stores/`
- `https://rookhposh.ir/how-it-works/`
- `https://rookhposh.ir/pricing/`
- `https://rookhposh.ir/faq/`

The dashboard, blog, trust-seal URL, legal placeholders, private routes, redirects, and error pages are excluded.

## BUILD RESULT

| Check | Result |
| --- | --- |
| `npm run test:seo` | PASS |
| `npm run test:r2` | PASS |
| `npm run test:r3` | PASS |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS; static routes `/`, `/for-online-stores`, `/how-it-works`, `/pricing`, `/faq`, metadata routes, and `/_not-found` generated |
| `npm run test:seo:smoke` | PASS |
| `npm run test:r3:smoke` | PASS; unique metadata, canonical URLs, internal links, sitemap entries, and unpublished legal routes verified |
| Browser route smoke | PASS; all four new routes exposed their purpose-specific content and breadcrumbs; FAQ interaction worked |

R3 preserves the existing homepage visual experience and R2 animation boundary. It adds a small set of distinct, factual, internally linked pages instead of a thin-page collection.

R3_STATUS: PASS_WITH_DOCUMENTED_OWNER_DECISIONS

## Prompt 02 incremental update — first-party Blog foundation

Prompt 02 supersedes the R3-time Blog deferral without turning this repository into a CMS. The public presentation now exposes `/blog/` and `/blog/[slug]/`, reads only validated published records from the optional `BLOG_CONTENT_API_URL`, and renders a truthful empty state when no provider is configured. The public header/footer use `/blog/`; `blog.rookhposh.ir` is not the primary article destination.

The Blog index and article pages are server-rendered and use route-specific metadata, canonical URLs, breadcrumbs, publication/update dates, and a noindex policy for empty or explicitly noindex content. The sitemap adds the Blog index and article URLs only when validated indexable posts exist. Missing, unpublished, malformed, unavailable, or invalid-slug content returns the application 404. Markdown content is rendered with `react-markdown` and `rehype-sanitize`, with raw HTML disabled.

At the Prompt 02 validation checkpoint, no CMS URL was configured, so no article was fabricated or indexed. Default empty-state production smoke, source validation, CMS fixture integration smoke, typecheck, lint, build, and the existing SEO/R2/R3 smoke suites passed. External deployment remains outside this source change.
