const BLOG_REQUEST_TIMEOUT_MS = 4_000;
const MAX_BLOG_RESPONSE_BYTES = 5_000_000;
const BLOG_PAGE_LIMIT = 100;
const MAX_BLOG_PAGES = 100;
const MAX_BLOG_POSTS = BLOG_PAGE_LIMIT * MAX_BLOG_PAGES;
const BLOG_POSTS_PATH = "posts";

export function getBlogContentBaseUrl() {
  const rawValue = process.env.BLOG_CONTENT_API_URL?.trim();

  if (!rawValue) {
    return null;
  }

  try {
    const url = new URL(rawValue);

    const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
    if ((url.protocol !== "https:" && !localHttp) || url.username || url.password) {
      return null;
    }

    if (!url.pathname.endsWith("/")) {
      url.pathname = `${url.pathname}/`;
    }

    return url;
  } catch {
    return null;
  }
}

function buildResourceUrl(slug?: string, page = 1) {
  const baseUrl = getBlogContentBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const path = slug
    ? `${BLOG_POSTS_PATH}/${encodeURIComponent(slug)}`
    : BLOG_POSTS_PATH;
  const url = new URL(path, baseUrl);

  url.searchParams.set("status", "published");

  if (!slug) {
    url.searchParams.set("limit", String(BLOG_PAGE_LIMIT));
    url.searchParams.set("page", String(page));
  }

  return url;
}

async function requestBlogPayload(url: URL) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BLOG_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300, tags: ["blog-content"] },
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const contentLength = response.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BLOG_RESPONSE_BYTES) {
      return null;
    }

    const body = await response.arrayBuffer();
    if (body.byteLength > MAX_BLOG_RESPONSE_BYTES) {
      return null;
    }

    return JSON.parse(new TextDecoder().decode(body)) as unknown;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchBlogPostsPayload() {
  const firstUrl = buildResourceUrl();
  if (!firstUrl) {
    return null;
  }

  const firstPayload = await requestBlogPayload(firstUrl);
  if (!firstPayload || Array.isArray(firstPayload) || typeof firstPayload !== "object" || !Array.isArray((firstPayload as { posts?: unknown }).posts)) {
    return firstPayload;
  }

  const pagination = (firstPayload as { pagination?: { hasMore?: unknown } }).pagination;
  if (!pagination || typeof pagination.hasMore !== "boolean") {
    return firstPayload;
  }

  const posts = [...(firstPayload as { posts: unknown[] }).posts];
  let hasMore = pagination.hasMore;
  for (let page = 2; hasMore && page <= MAX_BLOG_PAGES; page += 1) {
    const url = buildResourceUrl(undefined, page);
    const payload = url ? await requestBlogPayload(url) : null;
    if (!payload || typeof payload !== "object" || Array.isArray(payload) || !Array.isArray((payload as { posts?: unknown }).posts)) {
      return null;
    }

    const pagePagination = (payload as { pagination?: { hasMore?: unknown } }).pagination;
    if (!pagePagination || typeof pagePagination.hasMore !== "boolean") {
      return null;
    }

    posts.push(...(payload as { posts: unknown[] }).posts);
    if (posts.length > MAX_BLOG_POSTS) {
      return null;
    }
    hasMore = pagePagination.hasMore;
  }

  return hasMore ? null : { posts };
}

export async function fetchBlogPostPayload(slug: string) {
  const url = buildResourceUrl(slug);
  return url ? requestBlogPayload(url) : null;
}
