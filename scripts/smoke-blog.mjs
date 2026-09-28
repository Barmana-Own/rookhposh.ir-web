const origin = process.env.SEO_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";
const failures = [];

async function fetchPage(pathname) {
  try {
    const response = await fetch(new URL(pathname, origin));
    return { response, html: await response.text() };
  } catch (error) {
    failures.push(`${pathname}: request failed (${error.message})`);
    return null;
  }
}

const indexResult = await fetchPage("/blog");
const missingResult = await fetchPage("/blog/does-not-exist");
const sitemapResult = await fetchPage("/sitemap.xml");
const feedResult = await fetchPage("/feed.xml");
const imageResult = await fetch(new URL("/opengraph-image", origin)).catch(() => null);

if (!indexResult || indexResult.response.status !== 200) {
  failures.push(`/blog: expected 200, received ${indexResult?.response.status ?? "no response"}`);
}

if (indexResult) {
  const { html } = indexResult;
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";

  for (const marker of ["مقالات رخ پوش", "مقاله‌ای منتشر نشده است", 'href="/for-online-stores/"']) {
    if (!html.includes(marker)) {
      failures.push(`/blog: missing empty-state marker ${marker}`);
    }
  }

  if (!robots.includes("noindex")) {
    failures.push("/blog: no-CMS state must be noindex");
  }
}

if (!missingResult || missingResult.response.status !== 404) {
  failures.push(`/blog/does-not-exist: expected 404, received ${missingResult?.response.status ?? "no response"}`);
}

if (missingResult && !missingResult.html.includes("صفحه مورد نظر پیدا نشد")) {
  failures.push("/blog/does-not-exist: custom 404 content is missing");
}

if (sitemapResult?.html.includes("https://rookhposh.ir/blog/")) {
  failures.push("/sitemap.xml: empty Blog state must not be listed");
}

if (!feedResult || feedResult.response.status !== 200) {
  failures.push(`/feed.xml: expected 200, received ${feedResult?.response.status ?? "no response"}`);
} else {
  const contentType = feedResult.response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/rss+xml")) {
    failures.push(`/feed.xml: expected RSS content type, received ${contentType || "missing"}`);
  }

  for (const marker of ["<rss", "<channel>", "https://rookhposh.ir/blog/"]) {
    if (!feedResult.html.includes(marker)) {
      failures.push(`/feed.xml: missing marker ${marker}`);
    }
  }

  if (feedResult.html.includes("<item>")) {
    failures.push("/feed.xml: no-CMS state must not contain article items");
  }
}

if (!imageResult || imageResult.status !== 200) {
  failures.push(`/opengraph-image: expected 200, received ${imageResult?.status ?? "no response"}`);
} else if (!(imageResult.headers.get("content-type") ?? "").includes("image/png")) {
  failures.push("/opengraph-image: expected image/png content type");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Blog production smoke validation passed.");
}
