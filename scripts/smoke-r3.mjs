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

for (const [pathname, expectedTitle] of publicRoutes) {
  const response = await fetch(new URL(pathname, origin));
  const html = await response.text();

  if (response.status !== 200) {
    failures.push(`${pathname}: expected 200, received ${response.status}`);
  }

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1];
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  const ogUrl = html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i)?.[1];
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1];

  if (title !== expectedTitle) {
    failures.push(`${pathname}: expected unique title "${expectedTitle}", received "${title ?? "missing"}"`);
  }

  if (!description) {
    failures.push(`${pathname}: missing description`);
  }

  const expectedCanonical = new URL(pathname === "/" ? "/" : `${pathname}/`, "https://rookhposh.ir").toString();
  if (canonical !== expectedCanonical || ogUrl !== expectedCanonical) {
    failures.push(`${pathname}: canonical or Open Graph URL is not ${expectedCanonical}`);
  }

  if (!robots?.includes("index") || !robots.includes("follow")) {
    failures.push(`${pathname}: robots metadata is not index/follow`);
  }

  if (!html.includes('property="og:title"') || !html.includes('name="twitter:title"')) {
    failures.push(`${pathname}: missing social title metadata`);
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

const sitemap = await (await fetch(new URL("/sitemap.xml", origin))).text();
const blogResponse = await fetch(new URL("/blog", origin));
const blogHtml = await blogResponse.text();
const blogRobots = blogHtml.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1];

if (blogResponse.status !== 200) {
  failures.push(`/blog: expected 200, received ${blogResponse.status}`);
}

if (!blogRobots?.includes("noindex")) {
  failures.push("/blog: temporary destination must be noindex");
}

if (sitemap.includes("https://rookhposh.ir/blog/")) {
  failures.push("/sitemap.xml: temporary blog destination must not be listed");
}

for (const [pathname] of publicRoutes) {
  const expectedUrl = new URL(pathname === "/" ? "/" : `${pathname}/`, "https://rookhposh.ir").toString();
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
    failures.push(`/sitemap.xml: missing ${expectedUrl}`);
  }
}

for (const pathname of ["/privacy", "/terms"]) {
  const response = await fetch(new URL(pathname, origin));
  if (response.status !== 404) {
    failures.push(`${pathname}: unapproved legal route returned ${response.status} instead of 404`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("R3 information architecture production smoke passed.");
}
