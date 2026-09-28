import { createServer } from "node:http";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const root = join(import.meta.dirname, "..");
const cmsPort = 4110;
const appPort = 3110;
const appOrigin = `http://127.0.0.1:${appPort}`;
const cmsOrigin = `http://127.0.0.1:${cmsPort}`;
const failures = [];

const publishedPost = {
  id: "fixture-safe-post",
  slug: "safe-post",
  title: "عنوان مقاله آزمایشی",
  excerpt: "خلاصه واقعی مقاله آزمایشی.",
  content: "# محتوای مقاله\n\nمحتوای قابل نمایش.\n\n<script>alert('blocked')</script>",
  featuredImage: {
    url: "/images/rookhposh-mark.webp",
    alt: "نشان رخ پوش",
  },
  category: "راهنما",
  tags: ["راهنما"],
  author: { displayName: "نویسنده آزمایشی" },
  publishedAt: "2026-09-20T09:00:00.000Z",
  updatedAt: "2026-09-21T09:00:00.000Z",
  seoTitle: "عنوان سئوی مقاله آزمایشی",
  metaDescription: "توضیحات سئوی مقاله آزمایشی.",
  canonicalUrl: "https://rookhposh.ir/blog/safe-post?tracking=ignored",
  ogTitle: "عنوان اجتماعی مقاله آزمایشی",
  ogDescription: "توضیحات اجتماعی مقاله آزمایشی.",
  ogImage: "/images/rookhposh-mark.webp",
  noindex: false,
  status: "published",
};

const noindexPost = {
  ...publishedPost,
  id: "fixture-noindex-post",
  slug: "noindex-post",
  title: "مقاله noindex آزمایشی",
  noindex: true,
};

const draftPost = {
  ...publishedPost,
  id: "fixture-draft-post",
  slug: "draft-post",
  title: "پیش‌نویس نباید نمایش داده شود",
  status: "draft",
};

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

const cms = createServer((request, response) => {
  const url = new URL(request.url ?? "/", cmsOrigin);

  if (url.pathname === "/posts") {
    sendJson(response, 200, { posts: [publishedPost, noindexPost, draftPost] });
    return;
  }

  if (url.pathname === "/posts/safe-post") {
    sendJson(response, 200, { post: publishedPost });
    return;
  }

  if (url.pathname === "/posts/noindex-post") {
    sendJson(response, 200, { post: noindexPost });
    return;
  }

  if (url.pathname === "/posts/draft-post") {
    sendJson(response, 200, { post: draftPost });
    return;
  }

  sendJson(response, 404, { error: "not found" });
});

function listen(server, port) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", resolve);
  });
}

async function waitFor(url) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.status > 0) {
        return response;
      }
    } catch {
      // The production server is still starting.
    }

    await delay(250);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function fetchPage(pathname) {
  const response = await fetch(new URL(pathname, appOrigin));
  return { response, html: await response.text() };
}

function extractJsonLd(html) {
  return [...html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )].map(([, value]) => JSON.parse(value));
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

let app;

try {
  await listen(cms, cmsPort);
  app = spawn(
    process.execPath,
    [join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(appPort)],
    {
      cwd: root,
      env: {
        ...process.env,
        BLOG_CONTENT_API_URL: cmsOrigin,
        NEXT_PUBLIC_SITE_URL: "https://rookhposh.ir",
      },
      stdio: ["ignore", "ignore", "pipe"],
    },
  );

  let serverError = "";
  app.stderr?.on("data", (chunk) => {
    serverError += chunk.toString();
  });

  await waitFor(new URL("/blog", appOrigin));

  const index = await fetchPage("/blog");
  const article = await fetchPage("/blog/safe-post");
  const draft = await fetchPage("/blog/draft-post");
  const sitemap = await fetchPage("/sitemap.xml");
  const feed = await fetchPage("/feed.xml");
  const articleJsonLd = extractJsonLd(article.html);
  const blogPosting = articleJsonLd.find((value) => value["@type"] === "BlogPosting");
  const breadcrumb = articleJsonLd.find((value) => value["@type"] === "BreadcrumbList");

  assert(index.response.status === 200, `/blog: expected 200, received ${index.response.status}`);
  assert(index.html.includes('href="/blog/safe-post/"'), "/blog: published article link is missing");
  assert(!index.html.includes("draft-post"), "/blog: draft article was rendered");
  assert(article.response.status === 200, `/blog/safe-post: expected 200, received ${article.response.status}`);
  assert(article.html.includes("عنوان سئوی مقاله آزمایشی | رخ پوش"), "/blog/safe-post: SEO title metadata is missing");
  assert(article.html.includes("توضیحات سئوی مقاله آزمایشی"), "/blog/safe-post: meta description is missing");
  assert(article.html.includes('property="og:type" content="article"'), "/blog/safe-post: article Open Graph type is missing");
  assert(article.html.includes("article:published_time"), "/blog/safe-post: published time metadata is missing");
  assert(article.html.includes("article:modified_time"), "/blog/safe-post: modified time metadata is missing");
  assert(article.html.includes("https://rookhposh.ir/blog/safe-post/"), "/blog/safe-post: normalized canonical is missing");
  assert(!article.html.includes("alert('blocked')"), "/blog/safe-post: unsanitized script payload was emitted");
  assert(article.response.status === 200 && blogPosting, "/blog/safe-post: BlogPosting JSON-LD is missing");
  assert(blogPosting?.headline === publishedPost.title, "/blog/safe-post: BlogPosting headline is incorrect");
  assert(blogPosting?.publisher?.["@id"] === "https://rookhposh.ir/#organization", "/blog/safe-post: publisher does not reference Organization");
  assert(blogPosting?.inLanguage === "fa-IR", "/blog/safe-post: BlogPosting language is incorrect");
  assert(blogPosting?.mainEntityOfPage?.["@id"] === "https://rookhposh.ir/blog/safe-post/", "/blog/safe-post: mainEntityOfPage is incorrect");
  assert(breadcrumb?.itemListElement?.[1]?.item === "https://rookhposh.ir/blog/safe-post/", "/blog/safe-post: breadcrumb canonical is incorrect");
  assert(draft.response.status === 404, `/blog/draft-post: expected 404, received ${draft.response.status}`);
  assert(sitemap.html.includes("https://rookhposh.ir/blog/safe-post/"), "sitemap: published article is missing");
  assert(!sitemap.html.includes("draft-post"), "sitemap: draft article was included");
  assert(!sitemap.html.includes("noindex-post"), "sitemap: noindex article was included");
  assert((feed.response.headers.get("content-type") ?? "").includes("application/rss+xml"), "feed: RSS content type is missing");
  assert(feed.html.includes("عنوان مقاله آزمایشی"), "feed: published article is missing");
  assert(!feed.html.includes("draft-post"), "feed: draft article was included");
  assert(!feed.html.includes("noindex-post"), "feed: noindex article was included");

  if (failures.length === 0) {
    console.log("Blog CMS fixture smoke validation passed.");
  }

  if (serverError && failures.length > 0) {
    failures.push(`Next.js fixture server error: ${serverError.trim()}`);
  }
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
} finally {
  cms.close();
  if (app && !app.killed) {
    app.kill();
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
