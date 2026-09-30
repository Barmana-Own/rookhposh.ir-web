const origin = process.env.R8_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";
const failures = [];

const checks = [
  ["/", 200, "text/html"],
  ["/for-online-stores/", 200, "text/html"],
  ["/how-it-works/", 200, "text/html"],
  ["/pricing/", 200, "text/html"],
  ["/faq/", 200, "text/html"],
  ["/blog/", 200, "text/html"],
  ["/robots.txt", 200, "text/plain"],
  ["/sitemap.xml", 200, "xml"],
  ["/feed.xml", 200, "xml"],
  ["/manifest.webmanifest", 200, "json"],
  ["/blog/r8-release-missing-slug/", 404, "text/html"],
];

const responses = new Map();

for (const [pathname, expectedStatus, expectedType] of checks) {
  try {
    const response = await fetch(new URL(pathname, origin));
    const body = await response.text();
    const contentType = response.headers.get("content-type") ?? "";
    responses.set(pathname, { body, contentType, status: response.status });

    if (response.status !== expectedStatus) {
      failures.push(`${pathname}: expected HTTP ${expectedStatus}, received ${response.status}`);
    }
    if (expectedType === "text/html" && !contentType.includes("text/html")) {
      failures.push(`${pathname}: expected HTML content type, received ${contentType}`);
    }
    if (expectedType === "text/plain" && !contentType.includes("text/plain")) {
      failures.push(`${pathname}: expected text/plain content type, received ${contentType}`);
    }
    if (expectedType === "xml" && !contentType.includes("xml")) {
      failures.push(`${pathname}: expected XML content type, received ${contentType}`);
    }
    if (expectedType === "json" && !contentType.includes("json")) {
      failures.push(`${pathname}: expected JSON content type, received ${contentType}`);
    }
  } catch (error) {
    failures.push(`${pathname}: request failed (${error instanceof Error ? error.message : String(error)})`);
  }
}

const homepage = responses.get("/")?.body ?? "";
const robots = responses.get("/robots.txt")?.body ?? "";
const sitemap = responses.get("/sitemap.xml")?.body ?? "";
const missingArticle = responses.get("/blog/r8-release-missing-slug/")?.body ?? "";
const canonicalMatches = homepage.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) ?? [];

if (canonicalMatches.length !== 1) {
  failures.push(`/: expected exactly one canonical, received ${canonicalMatches.length}`);
}
if (!homepage.includes('href="https://rookhposh.ir/"')) {
  failures.push("/: canonical origin is missing or incorrect");
}
if (!homepage.includes('property="og:title"')) {
  failures.push("/: Open Graph title is missing");
}
if (!homepage.includes('name="twitter:card"')) {
  failures.push("/: Twitter card metadata is missing");
}
if (!homepage.includes('type="application/ld+json"')) {
  failures.push("/: structured data is missing");
}
if (!robots.includes("Sitemap: https://rookhposh.ir/sitemap.xml")) {
  failures.push("/robots.txt: canonical sitemap pointer is missing");
}
if (!sitemap.includes("<loc>https://rookhposh.ir/</loc>")) {
  failures.push("/sitemap.xml: canonical homepage is missing");
}
for (const forbidden of ["dash.rookhposh.ir", "cms.rookhposh.ir", "/api/", "not-found"]) {
  if (sitemap.includes(forbidden)) {
    failures.push(`/sitemap.xml: forbidden URL marker found: ${forbidden}`);
  }
}
if (missingArticle && !/(404|پیدا نشد|not found)/i.test(missingArticle)) {
  failures.push("/blog/r8-release-missing-slug/: 404 body does not identify a missing page");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("R8 release HTTP smoke passed for public routes, metadata, crawl boundaries, feed, manifest, and missing article behavior.");
}
