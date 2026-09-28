# Known Issues — Stage 10

## Non-blocking

- The public social-card endpoint is now a deterministic 1200×630 PNG at `/opengraph-image`. It is intentionally a restrained brand card; a dedicated approved Persian social artwork is still an optional asset improvement.
- The public Blog presentation is now owned by this repository, but article authoring/content availability depends on the optional external `BLOG_CONTENT_API_URL`; the separate `blog.rookhposh.ir` host and trust-seal service remain outside repository control.
- No CMS URL is configured in the validated local environment, so `/blog/` correctly renders an empty `noindex` state and no article URLs are emitted in the sitemap until published content is supplied.
- When the CMS is configured, sitemap and RSS generation are request-time and fail closed to the static marketing routes/empty feed if the provider is unavailable; published `noindex` posts remain excluded from both discovery surfaces.
- Approved Terms of Use and Privacy Policy copy/routes were not supplied. The corresponding footer labels remain non-interactive so the site does not link to misleading content.
- The visual story still contains 535 WebP frames totaling 10.89 MiB by design. R2 bounds initial scheduling and concurrency but does not remove the asset workload.
- Lighthouse, protocol-level request timing, reduced-motion media emulation, and field Core Web Vitals remain unavailable in the current environment.
- Homepage B2B-first positioning, direct-to-consumer availability, and the `/for-online-stores/` slug require owner confirmation; current source preserves both existing messaging tracks.
- Additional routes such as `/virtual-try-on/`, `/features/`, `/about/`, `/contact/`, `/terms/`, and `/privacy/` remain intentionally unpublished until distinct factual or approved content exists.
- R4 live verification found that `https://rookhposh.ir` is serving an older deployment without the R1-R3 metadata, crawl routes, JSON-LD, and four public content routes; deployment synchronization is a release blocker for live SEO verification.
- The live `blog.rookhposh.ir` host failed browser DNS resolution with `ERR_NAME_NOT_RESOLVED`.
- Mobile viewport and reduced-motion emulation remain unverified because the connected browser surface does not expose those controls.

## Not issues introduced by this change

- No existing page, route, asset, plan, or external integration was removed.
- No production database, auth flow, or API was fabricated.
