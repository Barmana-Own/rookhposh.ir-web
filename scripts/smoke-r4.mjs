const origin = process.env.SEO_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";

const publicRoutes = [
  ["/", "رخ پوش | اتاق پرو دیجیتال لباس"],
  ["/for-online-stores", "راهکار اتاق پرو مجازی برای فروشگاه‌های آنلاین | رخ پوش"],
  ["/how-it-works", "مراحل استفاده از پرو مجازی لباس | رخ پوش"],
  ["/pricing", "انتخاب پلن رخ پوش برای فروشگاه‌ها | رخ پوش"],
  ["/faq", "پاسخ پرسش‌های رایج درباره رخ پوش | رخ پوش"],
];

const failures = [];
const pages = new Map();

async function fetchPage(pathname, expectedStatus) {
  let response;

  try {
    response = await fetch(new URL(pathname, origin));
  } catch (error) {
    failures.push(`${pathname}: request failed (${error.message})`);
    return null;
  }

  const html = await response.text();

  if (response.status !== expectedStatus) {
    failures.push(`${pathname}: expected ${expectedStatus}, received ${response.status}`);
  }

  return { response, html };
}

for (const [pathname, expectedTitle] of publicRoutes) {
  const result = await fetchPage(pathname, 200);

  if (!result) {
    continue;
  }

  const { html } = result;
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  )?.[1];
  const canonical = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  )?.[1];
  const ogUrl = html.match(
    /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i,
  )?.[1];
  const robots = html.match(
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
  )?.[1];

  if (title !== expectedTitle) {
    failures.push(`${pathname}: unexpected title "${title ?? "missing"}"`);
  }

  if (!description) {
    failures.push(`${pathname}: missing description`);
  }

  const expectedCanonical = new URL(
    pathname === "/" ? "/" : `${pathname}/`,
    "https://rookhposh.ir",
  ).toString();

  if (canonical !== expectedCanonical || ogUrl !== expectedCanonical) {
    failures.push(`${pathname}: canonical or Open Graph URL is not ${expectedCanonical}`);
  }

  if (!robots?.includes("index") || !robots.includes("follow")) {
    failures.push(`${pathname}: robots metadata is not index/follow`);
  }

  if (!html.includes('property="og:title"') || !html.includes('name="twitter:title"')) {
    failures.push(`${pathname}: missing social title metadata`);
  }

  if (!html.includes('<html lang="fa" dir="rtl">')) {
    failures.push(`${pathname}: document language/direction is not fa/rtl`);
  }

  const jsonLdScripts = [...html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )];

  if (jsonLdScripts.length === 0) {
    failures.push(`${pathname}: missing JSON-LD`);
  } else {
    for (const [, jsonText] of jsonLdScripts) {
      try {
        JSON.parse(jsonText);
      } catch (error) {
        failures.push(`${pathname}: invalid JSON-LD (${error.message})`);
      }
    }
  }

  pages.set(pathname, html);
}

const homepage = pages.get("/") ?? "";
for (const marker of [
  'href="/how-it-works/"',
  'href="/for-online-stores/"',
  'href="/pricing/"',
  'href="/faq/"',
  'href="/blog/"',
  'href="https://dash.rookhposh.ir"',
]) {
  if (!homepage.includes(marker)) {
    failures.push(`/: missing internal link ${marker}`);
  }
}

if (homepage.includes('href="https://blog.rookhposh.ir"')) {
  failures.push("/: public navigation still contains the external blog link");
}

const robotsResult = await fetchPage("/robots.txt", 200);
const sitemapResult = await fetchPage("/sitemap.xml", 200);
const notFoundResult = await fetchPage("/r4-controlled-production-404", 404);

if (!robotsResult?.html.includes("Sitemap: https://rookhposh.ir/sitemap.xml")) {
  failures.push("/robots.txt: canonical sitemap pointer is missing");
}

for (const [pathname] of publicRoutes) {
  const expectedUrl = new URL(
    pathname === "/" ? "/" : `${pathname}/`,
    "https://rookhposh.ir",
  ).toString();

  if (!sitemapResult?.html.includes(`<loc>${expectedUrl}</loc>`)) {
    failures.push(`/sitemap.xml: missing ${expectedUrl}`);
  }
}

if (!notFoundResult) {
  failures.push("/r4-controlled-production-404: no response available");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("R4 controlled production SEO smoke validation passed.");
}
