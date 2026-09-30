# Google Search Console Setup

| Field | Value |
| --- | --- |
| Project | `rookhposh.ir` public marketing application |
| Document date | 2026-09-29 Gregorian / ۱۴۰۵/۰۷/۰۷ Solar Hijri |
| Supported verification path | Next.js Metadata API with server/build environment variable |
| Current Search Console data | NOT_AVAILABLE; no owner property access or export was supplied |

## Recommended property

Create a Google Search Console **Domain property** for `rookhposh.ir`. A Domain property is the preferred operational view when the owner controls DNS because it covers the HTTPS canonical site and related subdomains without requiring separate URL-prefix properties.

If DNS verification is not available, create the URL-prefix property:

`https://rookhposh.ir/`

The source change in this repository supports the HTML meta-tag method for that URL-prefix property.

## HTML meta-tag verification supported by this source

1. In Search Console, select the `https://rookhposh.ir/` URL-prefix property and choose **HTML tag** verification.
2. Copy only the value of the `content` attribute from Google’s generated tag.
3. Set `GOOGLE_SITE_VERIFICATION` in the deployment/build environment. The value must be a non-empty token containing only letters, numbers, `_`, or `-`; this validation prevents malformed configuration from being emitted.
4. Keep the variable server/build-only. Do not rename it to `NEXT_PUBLIC_*`, commit a real token, or place it in a browser bundle.
5. Build and deploy the public site with the variable present.
6. Use Search Console’s **Verify** action after the deployment is reachable.

When `GOOGLE_SITE_VERIFICATION` is absent or invalid, the Metadata API omits the verification tag. No placeholder token is shipped by this repository. The variable is evaluated as deployment/build configuration, so it must be available before the production build or server metadata is generated.

## Sitemap submission

Submit this exact sitemap URL in the verified property:

`https://rookhposh.ir/sitemap.xml`

The site also advertises the same URL from:

`https://rookhposh.ir/robots.txt`

The generated sitemap is restricted to the public indexable marketing routes and, when the CMS provider is configured and returns published indexable records, `/blog/` and those article URLs. Draft, unpublished, `noindex`, error, placeholder, CMS/admin, and dashboard URLs are excluded.

## Post-deployment checks

Run these checks against the deployed host before interpreting Search Console reports:

1. Open `https://rookhposh.ir/` and inspect the HTML for exactly one canonical pointing to `https://rookhposh.ir/`.
2. Open `https://rookhposh.ir/robots.txt` and confirm it allows the public site and points to the HTTPS sitemap.
3. Open `https://rookhposh.ir/sitemap.xml` and confirm every `<loc>` uses the canonical public origin.
4. Confirm the sitemap contains the intended first-party Blog route and published, indexable articles when published CMS content exists.
5. Confirm the sitemap contains no `dash.rookhposh.ir`, `cms.rookhposh.ir`, `/api/`, private, draft, `noindex`, or error URL.
6. Use URL Inspection for the homepage, `/blog/`, and one published article. Record crawl/indexing results from Search Console; do not infer them from local build output.
7. Check the Page indexing report for exclusions and inspect representative URLs before changing robots, canonical, or noindex configuration.
8. Check Enhancements and Core Web Vitals only after Search Console has collected data. Local lab checks and source validation are not field data.

The public host currently requires an authorized deployment and owner-controlled Search Console access for these external checks. This repository does not claim a verification, indexing, ranking, traffic, CTR, position, URL-count, or field Core Web Vitals result.

## Exporting Queries and Pages data later

After the property has accumulated data:

1. Open **Performance → Search results** in Search Console.
2. Select the required date range and search type.
3. Use the **Queries** tab and choose **Export** to save query data.
4. Repeat with the **Pages** tab to export landing-page data.
5. Preserve the date range, property, search type, filters, and export timestamp with each file.
6. Provide the export for analysis; no query, page, click, impression, CTR, or position conclusions should be generated without the owner’s actual export.

## Configuration reference

Safe template entry in `.env.example`:

```dotenv
GOOGLE_SITE_VERIFICATION=
```

The empty value is intentional. A real token belongs only in the deployment secret/configuration store controlled by the site owner or operator.
