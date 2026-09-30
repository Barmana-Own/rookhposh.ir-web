# First-Party Blog Content Provider and CMS Integration

The public marketing application remains a separate Next.js application. It owns the server-rendered Blog presentation at `/blog/` and `/blog/[slug]/`; it does not own CMS authentication, editorial mutations, or the CMS database.

## Application boundaries

| Application | Responsibility | Host |
| --- | --- | --- |
| Public marketing site | Homepage, marketing routes, Blog presentation, sitemap, RSS feed, and revalidation receiver | `https://rookhposh.ir` |
| Content CMS | Authenticated article authoring, media, workflow, and published-content API | `https://cms.rookhposh.ir` |
| Customer dashboard | Customer/product application | `https://dash.rookhposh.ir` |

The CMS is not linked from the public header and no dashboard authentication or code is imported into this repository.

## Configuration

These values are server-only. They must not be prefixed with `NEXT_PUBLIC_`.

```text
BLOG_CONTENT_API_URL=https://cms.rookhposh.ir/api/public
BLOG_REVALIDATION_SECRET=replace-with-a-separate-long-random-value
```

`BLOG_CONTENT_API_URL` is optional. If it is missing, invalid, unavailable, or returns an invalid payload, the public Blog renders a truthful empty state and the homepage remains independent of the CMS. HTTPS is required for remote CMS origins; HTTP is accepted only for loopback local testing.

`BLOG_REVALIDATION_SECRET` must be the same high-entropy value configured as `PUBLIC_REVALIDATION_SECRET` in the CMS. It is accepted only by the server-side Route Handler at `/api/revalidate/blog`.

## CMS public read contract

The current CMS exposes only published, currently due posts:

```text
GET {BLOG_CONTENT_API_URL}/posts?status=published&limit=100&page=1
GET {BLOG_CONTENT_API_URL}/posts/{slug}?status=published
```

The list response is:

```json
{
  "posts": [],
  "pagination": { "page": 1, "limit": 100, "hasMore": false }
}
```

The article response is an object containing `post`. Public records include only the article contract consumed by the marketing site: identifiers, title/summary/body, validated SEO fields, public media references, category/tags, public author display name, dates, and `noindex`. Drafts, review notes, password hashes, sessions, audit records, private user data, and storage credentials are never part of this boundary. The public provider follows `hasMore` pages with a bounded 100-page/10,000-record safety limit; malformed or over-limit pagination fails closed rather than emitting an unbounded request sequence.

The CMS stores editor content as validated `contentFormat: "tiptap-json"`. The public site validates the same allowlist before rendering. Legacy Markdown/plain-text records remain supported for compatibility, with server-side Markdown sanitization, disabled raw HTML, and no Markdown image rendering.

## Content safety and URL handling

The provider validates every response at the boundary. It rejects malformed records, unsupported formats, unsafe URLs, invalid dates, future publication dates, invalid slugs, oversized content, and records marked as unpublished. Relative CMS media URLs are resolved against the configured CMS origin; arbitrary non-HTTPS absolute media URLs are rejected.

Tiptap JSON is rendered recursively from an allowlisted node/mark set. It is never passed to unsanitized `dangerouslySetInnerHTML`. CMS image nodes require alt text and safe HTTP(S)/internal URLs. Markdown uses `react-markdown` with `rehype-sanitize`, raw HTML disabled, and Markdown image output suppressed.

## Failure and indexing behavior

- CMS timeout, non-2xx response, invalid JSON, oversized response, database outage, or invalid records produce an empty provider result rather than a homepage failure.
- `/blog/` remains useful with a truthful empty state and is `noindex` while it has no indexable published posts.
- `/blog/[slug]/` uses `notFound()` for missing, unpublished, invalid, unavailable, or unsafe content.
- Sitemap and RSS preserve static marketing routes and include only published, validated, non-`noindex` articles.
- Article metadata and JSON-LD are generated from the validated record; canonical overrides are accepted only when they resolve to the main public origin.

## Publish/unpublish revalidation

After a CMS create, update, publish, unpublish, archive, or slug change, the CMS sends a server-to-server `POST` to:

```text
https://rookhposh.ir/api/revalidate/blog
```

The request body contains a small `post.changed` event with an event ID, current slug, optional previous slug, and status. The CMS signs `timestamp.eventId.body` with HMAC-SHA256 and sends the signature in `X-Rookhposh-Signature`, with the timestamp and event ID in their corresponding headers.

The public Route Handler rejects missing/invalid configuration, stale timestamps, malformed event IDs, invalid slugs/statuses, oversized bodies, and invalid signatures. On success it invalidates the `blog-content` fetch tag and the affected article, Blog index, sitemap, and feed paths. The secret is never sent to the browser or included in a public response.

The receiver returns `401` for an invalid signature, `413` for an oversized request, `503` when the receiver is not configured, and `200` after accepted invalidation. Revalidation failures in the CMS are non-fatal to the database mutation; normal five-minute cache expiry remains the fallback.

## Validation

```text
npm run test:blog
npm run test:blog:fixture
npm run test:revalidation
npm run lint
npm run typecheck
npm run build
```

`test:blog:fixture` exercises published visibility, draft/noindex exclusion, safe rendering, invalid revalidation authorization, unpublish removal from the article/index/sitemap/feed surfaces, and republish visibility after signed invalidation. `test:revalidation` is a live-server smoke and requires `SEO_SMOKE_ORIGIN` plus a test `BLOG_REVALIDATION_SECRET`.

The fixture does not replace a CMS-backed integration environment. A real publish/unpublish database test requires an authorized MySQL instance and deployed CMS/public-site endpoints.

## Deployment requirements

Configure the same secret value in the CMS `PUBLIC_REVALIDATION_SECRET` and public-site `BLOG_REVALIDATION_SECRET` environments. Configure the CMS API origin in `BLOG_CONTENT_API_URL`. Use HTTPS in production. Do not place either value in client-exposed environment variables, source control, logs, or browser requests.

## Framework references

- [Next.js `revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Next.js `revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
