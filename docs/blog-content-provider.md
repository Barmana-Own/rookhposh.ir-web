# First-Party Blog Content Provider

The marketing app remains a frontend-only Next.js application. Blog content is read from a separate public CMS/API when `BLOG_CONTENT_API_URL` is configured; no CMS database, authentication, editor, or write endpoint is implemented here.

## Configuration

Set the server-only environment variable:

```text
BLOG_CONTENT_API_URL=https://cms.example.invalid/public/blog/
```

The value must be an HTTP(S) URL. It must not contain a secret in source control or in `.env.example`.

## Read contract

The provider requests:

```text
GET {BLOG_CONTENT_API_URL}/posts?status=published&limit=100
GET {BLOG_CONTENT_API_URL}/posts/{slug}?status=published
```

The response may be an array or an object containing `posts`, `data`, or `post`. The repository accepts only records that contain the required public fields documented by `lib/blog/types.ts`. It rejects malformed records, unsupported content formats, unsafe asset URLs, invalid dates, future publication dates, and records explicitly marked as not published.

The endpoint is expected to expose already-published public content. If a response includes `status` or `published`, the repository applies an additional published-only filter. No authorization header is sent for public reads.

## Content safety

Article `content` is treated as Markdown or plain text. It is rendered on the server with `react-markdown`, `rehype-sanitize`, and raw HTML disabled. CMS-provided HTML is not inserted into the document with unsanitized `dangerouslySetInnerHTML`. Markdown images are intentionally not rendered; the validated `featuredImage` field is the supported article image surface.

## Failure behavior

- Missing or invalid `BLOG_CONTENT_API_URL` produces a safe empty Blog state.
- CMS timeout, non-2xx response, invalid JSON, oversized response, or invalid records produce no posts rather than a build/runtime crash.
- `/blog/` remains useful with a truthful empty state and product-context link.
- `/blog/[slug]/` returns the application 404 for missing, unpublished, invalid, or unavailable content.

## Indexing behavior

The empty Blog index is `noindex` and is not added to the sitemap. When published posts are available, the index becomes indexable and sitemap entries are generated only for posts whose `noindex` value is false. Canonical URLs supplied by the provider are accepted only when they resolve to the configured main site origin.

## Discovery and structured data

- Published, indexable posts are emitted by the request-time `app/sitemap.ts` route; static marketing routes remain present when the CMS is unavailable.
- `/feed.xml` exposes published, indexable posts with escaped RSS XML, canonical trailing-slash article links, and no draft/private provider fields.
- Article pages emit a validated `BlogPosting` JSON-LD object that references the server-rendered Rookhposh Organization entity and the visible breadcrumb route. No ratings, reviews, offers, or unsupported claims are synthesized.
- `/opengraph-image` is a deterministic 1200×630 PNG route used as the default large social card. Its rendered text is intentionally minimal so the existing Next.js image runtime remains reliable with the installed font stack.
