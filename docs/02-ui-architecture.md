# UI Architecture — Rookhposh SEO Delivery

## Role-based navigation

The repository exposes one public role: an anonymous visitor. The header exposes plan navigation, the blog link, and a dashboard CTA. No authenticated or administrative navigation is implemented in this repository.

## Screen and route inventory

| Surface | Purpose | Primary action | Important states |
| --- | --- | --- | --- |
| `/` homepage | Explain Rookhposh and the virtual fitting-room journey | Scroll, view plans, enter dashboard | Loader, content, frame failure tolerance, reduced motion |
| `/for-online-stores/` | Explain the store-facing use case | Read workflow, view pricing | Static content, responsive cards, external dashboard CTA |
| `/how-it-works/` | Explain the seven factual workflow stages | Read stages, continue to store page | Ordered steps, responsive layout |
| `/pricing/` | Compare the existing plans | Select a plan, read FAQ | Responsive plan cards, external dashboard CTA |
| `/faq/` | Answer factual product questions | Expand an answer, read workflow | Keyboard-operable details, responsive content |
| Loader overlay | Prepare the opening frame window | Wait for useful readiness | Critical-window progress, completion, no-JS bypass |
| Story scene | Explain seven steps of the product experience | Scroll through chapters | Hero, chapters 01–07, mobile stacked panels |
| Plans section | Compare trial, seasonal, and annual packages | Select a package | Responsive cards, featured plan, CTA focus |
| Footer | Contact, trust, blog/legal links, attribution | Follow a link or call | External asset failure, keyboard focus |
| `/robots.txt` | Declare crawl access and sitemap | Crawler fetch | Static generated response |
| `/sitemap.xml` | Declare canonical public route | Crawler fetch | One canonical homepage |
| `/manifest.webmanifest` | Describe install/share identity | Browser fetch | Persian RTL manifest |

## Journey-to-surface mapping

| Journey | Surfaces |
| --- | --- |
| Discover service | Metadata, hero H1, no-JS fallback, story scene |
| Understand workflow | Hidden story heading, seven scene panels, canvas visuals, descriptive copy |
| Compare plans | Plans section, semantic headings, CTA links |
| Continue to product | Header CTA, plan CTAs, no-JS CTA |
| Search/social discovery | Canonical, Open Graph, Twitter, JSON-LD, robots, sitemap |

## Responsive rules

- Desktop keeps alternating left/right scene panels and a three-column pricing grid.
- Narrow viewports stack scene panels near the bottom of the viewport and collapse the pricing grid to one column.
- Mobile hides secondary header links while preserving the dashboard CTA.
- Footer content becomes a single-column sequence on narrow screens.
- Metadata and crawl files are viewport-independent.

## State matrix

| State | Behavior |
| --- | --- |
| Loading | Loader reports critical-window preparation while server-rendered page content remains available behind it. |
| Empty | Not applicable to the static homepage; pricing and service copy are always present. |
| Error | Individual frame failures advance progress; text and CTAs remain available. |
| Success | Loader fades after four critical frames settle; later frames continue loading progressively. |
| Permission denied | Not applicable to public route; dashboard authorization is external. |
| Offline/degraded | Existing text content remains in HTML; remote trust seal may fail without blocking the page. |
| No JavaScript | The server-rendered scene remains visible and does not depend on a client overlay or duplicated hidden copy. |

## Stage 03 handoff

Implement SEO at the server boundary, keep only browser-dependent animation code in the client module, and avoid moving metadata or crawl-critical content into the animated runtime.
