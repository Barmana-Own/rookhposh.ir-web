# Operations Runbook — Rookhposh Landing Page

## Release smoke test

1. Set `NEXT_PUBLIC_SITE_URL` to the intended canonical HTTPS origin.
2. Build and start the app with the locked dependencies.
3. Check HTTP 200 for `/`, `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest`.
4. Confirm the homepage head contains the canonical URL and social metadata.
5. Confirm the sitemap and robots sitemap pointer use the same origin.
6. Confirm the dashboard, blog, trust-seal, and telephone links remain reachable according to their own service status.

## Incident response

- If metadata points to the wrong host, correct `NEXT_PUBLIC_SITE_URL`, rebuild, and redeploy.
- If crawler routes fail, roll back the app artifact and inspect the Next.js route build output.
- If the trust seal fails, keep the page available and coordinate with the trust-seal provider; it is not a release-blocking local dependency.
- If frame assets fail, verify static asset delivery and CDN caching without removing the text content or SEO fallback.

## Recovery

No data restore or migration recovery is applicable because this repository has no persistent local data.
