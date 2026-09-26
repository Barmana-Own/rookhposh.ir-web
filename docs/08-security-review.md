# Application Security Review — Stage 08

## Scope and authorization

The review covers the active Rookhposh repository and the public homepage/metadata routes. No probing or exploitation was performed against the external dashboard, blog, trust-seal service, or any production system.

## Threat model summary

| Asset | Entry point | Trust boundary | Relevant risk |
| --- | --- | --- | --- |
| Canonical identity and metadata | Root layout and metadata files | Build environment to rendered HTML | Wrong origin, misleading schema, secret leakage |
| Crawl surfaces | `/robots.txt`, `/sitemap.xml`, manifest | Crawler to framework route | Broken discovery or accidental route exposure |
| Public page | `/` | Browser/crawler to server-rendered content and client animation | XSS, unsafe external resource behavior, inaccessible content |
| Trust seal | External HTTPS image/link | Browser to third party | Availability and referrer leakage |

## Findings

| ID | Severity | Component | Finding | Remediation | Status |
| --- | --- | --- | --- | --- | --- |
| SEC-001 | Medium | `app/layout.tsx` | Metadata did not define a canonical URL or complete social cards. | Added validated metadata base, canonical, Open Graph, Twitter, robots, and viewport metadata. | FIXED |
| SEC-002 | Medium | App Router | No crawler routes existed. | Added generated robots, sitemap, and manifest routes limited to actual public scope. | FIXED |
| SEC-003 | Medium | Document semantics | Client-driven story had no explicit section heading and brand image alt text was empty. | Added accessible section heading and informative alt text; preserved decorative loader treatment. | FIXED |
| SEC-004 | Low | Client-only visual experience | Users without JavaScript had no concise service fallback. | Kept the service copy in the server-rendered scene and removed the need for duplicated SEO-only markup. | FIXED |
| SEC-005 | Low | Response headers | Next.js fingerprint and baseline browser protections were not explicitly configured. | Disabled `X-Powered-By` and added `nosniff`, referrer, framing, and permissions headers. | FIXED |

## Review results

- JSON-LD is static and serialized from repository-controlled constants; there is no user-controlled interpolation.
- The site origin accepts only `http:` or `https:` and falls back to `https://rookhposh.ir` when invalid.
- No SQL, NoSQL, command, template, SSRF, upload, archive, redirect, or authentication surface exists in this repository.
- The external trust-seal URL remains HTTPS and retains `referrerPolicy="origin"`.
- The project does not add dependencies for SEO and `npm ci` reported no audit vulnerabilities.
- No secrets were found in source, `.env.example`, metadata, JSON-LD, or documentation.

## Residual risks

- HSTS and TLS termination are deployment concerns; this repository does not control the hosting proxy.
- The trust-seal asset is an external dependency and can be unavailable without a local fallback.
- Live Search Console, rich-result eligibility, and production crawler behavior were not run locally.

## Verification

Executed: `npm run test:seo`, `npm run lint`, `npm run typecheck`, `npm run build`, and local HTTP smoke requests to `/`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest`.

## Handoff to Stage 09

Security regression checks are included in `npm run test:seo`; normal lint, typecheck, build, and HTTP smoke validation remain required.
