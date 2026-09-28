const BLOG_REQUEST_TIMEOUT_MS = 4_000;
const MAX_BLOG_RESPONSE_BYTES = 5_000_000;
const BLOG_POSTS_PATH = "posts";

function getConfiguredBaseUrl() {
  const rawValue = process.env.BLOG_CONTENT_API_URL?.trim();

  if (!rawValue) {
    return null;
  }

  try {
    const url = new URL(rawValue);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
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

function buildResourceUrl(slug?: string) {
  const baseUrl = getConfiguredBaseUrl();

  if (!baseUrl) {
    return null;
  }

  const path = slug
    ? `${BLOG_POSTS_PATH}/${encodeURIComponent(slug)}`
    : BLOG_POSTS_PATH;
  const url = new URL(path, baseUrl);

  url.searchParams.set("status", "published");

  if (!slug) {
    url.searchParams.set("limit", "100");
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
  const url = buildResourceUrl();
  return url ? requestBlogPayload(url) : null;
}

export async function fetchBlogPostPayload(slug: string) {
  const url = buildResourceUrl(slug);
  return url ? requestBlogPayload(url) : null;
}
