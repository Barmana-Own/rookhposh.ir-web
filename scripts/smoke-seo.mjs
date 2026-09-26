const origin = process.env.SEO_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";

const checks = [
  ["/", 200],
  ["/robots.txt", 200],
  ["/sitemap.xml", 200],
  ["/manifest.webmanifest", 200],
  ["/r1-route-that-does-not-exist", 404],
];

const failures = [];
const responses = new Map();

for (const [pathname, expectedStatus] of checks) {
  const url = new URL(pathname, origin);
  let response;

  try {
    response = await fetch(url);
  } catch (error) {
    failures.push(`${pathname}: request failed (${error.message})`);
    continue;
  }

  responses.set(pathname, await response.text());

  if (response.status !== expectedStatus) {
    failures.push(`${pathname}: expected ${expectedStatus}, received ${response.status}`);
  }
}

const homepage = responses.get("/") ?? "";
const canonicalMatches = homepage.match(/<link[^>]+rel=["']canonical["'][^>]*>/gi) ?? [];
const canonicalTag = canonicalMatches[0] ?? "";
const jsonLdMatch = homepage.match(
  /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i,
);

if (canonicalMatches.length !== 1) {
  failures.push(`/: expected exactly one canonical link, received ${canonicalMatches.length}`);
}

const canonicalHref = canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1];

if (canonicalHref !== "https://rookhposh.ir/") {
  failures.push("/: canonical link does not target https://rookhposh.ir/");
}

if (!homepage.includes('<html lang="fa" dir="rtl">')) {
  failures.push("/: document language/direction is not fa/rtl");
}

if (!homepage.includes('property="og:title"')) {
  failures.push("/: missing Open Graph title metadata");
}

if (!homepage.includes('name="twitter:card"')) {
  failures.push("/: missing Twitter card metadata");
}

for (const marker of [
  'class="scene scene--fallback"',
  'id="loaderStatus"',
  'id="plans"',
  'id="faq"',
]) {
  if (!homepage.includes(marker)) {
    failures.push(`/: missing server-rendered R2 content marker ${marker}`);
  }
}

if (!jsonLdMatch) {
  failures.push("/: missing JSON-LD script");
} else {
  try {
    const jsonLd = JSON.parse(jsonLdMatch[1]);
    const graphTypes = new Set(
      (jsonLd["@graph"] ?? []).map((entry) => entry["@type"]),
    );

    for (const expectedType of ["Organization", "WebSite", "Service"]) {
      if (!graphTypes.has(expectedType)) {
        failures.push(`/: JSON-LD is missing ${expectedType}`);
      }
    }
  } catch (error) {
    failures.push(`/: JSON-LD is not valid JSON (${error.message})`);
  }
}

const robots = responses.get("/robots.txt") ?? "";
const sitemap = responses.get("/sitemap.xml") ?? "";

if (!robots.includes("Sitemap: https://rookhposh.ir/sitemap.xml")) {
  failures.push("/robots.txt: sitemap pointer is missing or incorrect");
}

if (!sitemap.includes("<loc>https://rookhposh.ir/</loc>")) {
  failures.push("/sitemap.xml: canonical homepage is missing");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("SEO production smoke validation passed.");
}
