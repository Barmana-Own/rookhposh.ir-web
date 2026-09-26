# Deployment and Production Readiness — Stage 11

## Target

Provider-neutral Next.js deployment. The repository does not contain provider credentials, DNS configuration, or an authorized release target.

## Build and run

```text
npm ci
npm run lint
npm run typecheck
npm run test:seo
npm run build
npm run start
```

`NEXT_PUBLIC_SITE_URL` should be set to the canonical public origin in production. If omitted or invalid, the source safely falls back to `https://rookhposh.ir`; deployment should still configure it explicitly so previews and production cannot be confused.

## Runtime configuration

- No secret environment variable is required by this repository.
- `.env.example` contains only a safe public-origin placeholder.
- The app has no local database migration, queue, worker, or external API credential.

## Health and observability

The Next.js process provides the application health boundary through the public homepage and metadata routes. `/`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` should be smoke-tested after deploy. Hosting-level uptime, error reporting, TLS termination, and log redaction remain provider responsibilities.

## Security and proxy assumptions

The app disables the `X-Powered-By` header and emits `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, and `Permissions-Policy`. The deployment proxy must terminate HTTPS and preserve the canonical host. HSTS is intentionally left to the hosting/TLS policy because this repository does not control all subdomain deployment state.

## Rollback

Rollback is an application artifact rollback: restore the previous immutable build and verify the same smoke URLs. No database rollback is required for this change.

## Actual deployment status

NOT_PERFORMED — no target, credentials, DNS authority, or explicit production-launch authorization was provided.

## R4 live verification follow-up — 2026-09-26

The public host was inspected separately from this repository. It redirects HTTP to HTTPS and renders the existing homepage, but it is not serving the verified R1-R3 build: the live canonical/social/JSON-LD metadata and crawl routes are absent, and the four R3 public routes render 404. The dashboard loaded; the blog host failed DNS resolution. No deployment action was taken from this workspace. The verified build must be deployed by the authorized operator and then rechecked using [`docs/r4-production-seo-verification.md`](r4-production-seo-verification.md).
