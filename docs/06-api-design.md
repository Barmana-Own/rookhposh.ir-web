# API Design and Integration — Stage 06

## Status

PASS — not applicable to this repository's approved scope.

## Evidence

The app has no business API. Public metadata endpoints are generated through Next.js file conventions:

| Route | Contract | Purpose |
| --- | --- | --- |
| `/robots.txt` | `MetadataRoute.Robots` | Crawl policy and sitemap pointer |
| `/sitemap.xml` | `MetadataRoute.Sitemap` | Canonical homepage discovery |
| `/manifest.webmanifest` | `MetadataRoute.Manifest` | Install/share metadata |

These routes contain no user input, no mutable state, no authentication, and no database calls.

## Integration decision

The frontend continues to link to the separately owned dashboard and blog domains. No production mock or hidden API adapter was introduced.

## Handoff

Authentication, authorization, and API contract work are outside this repository and must not be inferred from public landing-page links.
