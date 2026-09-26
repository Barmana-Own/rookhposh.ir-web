# Software Test Results — Stage 09

## Executed validation

| Command/check | Result | Evidence |
| --- | --- | --- |
| `npm ci --ignore-scripts` | PASS | 374 packages installed; npm audit reported 0 vulnerabilities |
| `npm run test:seo` | PASS | `SEO source validation passed.` |
| `npm run test:r2` | PASS | Controlled frame queue, server/client boundary, fallback, reduced-motion markers, 535-frame inventory, and brand assets verified |
| `npm run test:r3` | PASS | Public route registry, unique page metadata, internal-link architecture, and unpublished legal route checks |
| `npm run lint` | PASS | ESLint completed with exit code 0 |
| `npm run typecheck` | PASS | TypeScript completed with exit code 0 |
| `npm run build` | PASS | Next.js compiled, typechecked, generated 6 static pages, and emitted metadata routes |
| Local HTTP smoke | PASS | `/`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` returned HTTP 200; home HTML contained canonical, Open Graph, Twitter, and JSON-LD markers |
| Browser smoke | PASS | Fresh local production page exposed server-rendered semantics, loader readiness, 36 initial frame assets, and an interactive FAQ |
| `npm run test:r3:smoke` | PASS | Four new routes, unique canonical/title metadata, internal links, sitemap, and legal 404s |
| Browser route smoke | PASS | Four new routes exposed purpose-specific content, breadcrumbs, and FAQ interaction |
| Lighthouse / field Core Web Vitals | NOT_RUN | Lighthouse tooling and production field data were unavailable |
| Live Search Console/rich-result test | NOT_RUN | Requires external production URL access and account/tooling not available in this repository run |

## Failure and recovery record

The first sandboxed `npm run build` compiled successfully but failed during the TypeScript worker spawn with `spawn EPERM`. The same command was rerun with the approved elevated execution profile and passed. No source defect was indicated by the first failure.

## Coverage statement

No percentage coverage metric is configured. The relevant SEO requirements are covered by a dependency-free regression script, production build, and rendered HTTP smoke checks. There are no backend/database/auth suites applicable to this frontend-only scope.
