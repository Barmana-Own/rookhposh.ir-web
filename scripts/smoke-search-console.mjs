const origin = process.env.SEARCH_CONSOLE_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";
const expectedVerification = process.env.SEARCH_CONSOLE_EXPECT_VERIFICATION?.trim() ?? "";
const failures = [];

let homepage = "";
let sitemap = "";
let robots = "";

try {
  const response = await fetch(new URL("/", origin));
  homepage = await response.text();
  if (response.status !== 200) {
    failures.push(`/: expected HTTP 200, received ${response.status}`);
  }
} catch (error) {
  failures.push(`/: request failed (${error instanceof Error ? error.message : String(error)})`);
}

try {
  const response = await fetch(new URL("/sitemap.xml", origin));
  sitemap = await response.text();
  if (response.status !== 200) {
    failures.push(`/sitemap.xml: expected HTTP 200, received ${response.status}`);
  }
} catch (error) {
  failures.push(`/sitemap.xml: request failed (${error instanceof Error ? error.message : String(error)})`);
}

try {
  const response = await fetch(new URL("/robots.txt", origin));
  robots = await response.text();
  if (response.status !== 200) {
    failures.push(`/robots.txt: expected HTTP 200, received ${response.status}`);
  }
} catch (error) {
  failures.push(`/robots.txt: request failed (${error instanceof Error ? error.message : String(error)})`);
}

const verificationMatches = [
  ...homepage.matchAll(/<meta[^>]+name=["']google-site-verification["'][^>]+>/gi),
];
if (expectedVerification) {
  const escapedValue = expectedVerification.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expectedPattern = new RegExp(`content=["']${escapedValue}["']`, "i");
  if (verificationMatches.length !== 1 || !expectedPattern.test(verificationMatches[0][0])) {
    failures.push("/: expected exactly one configured Google verification meta tag.");
  }
} else if (verificationMatches.length !== 0) {
  failures.push("/: Google verification metadata must be omitted when no token is configured.");
}

if (!robots.includes("Sitemap: https://rookhposh.ir/sitemap.xml")) {
  failures.push("/robots.txt: canonical sitemap pointer is missing.");
}

if (!sitemap.includes("<loc>https://rookhposh.ir/</loc>")) {
  failures.push("/sitemap.xml: canonical homepage is missing.");
}

for (const forbidden of ["dash.rookhposh.ir", "cms.rookhposh.ir", "/api/", "not-found"]) {
  if (sitemap.includes(forbidden)) {
    failures.push(`/sitemap.xml: private or non-indexable URL marker found: ${forbidden}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Search Console smoke passed (${expectedVerification ? "configured verification" : "verification omitted"}); sitemap and robots boundaries are valid.`,
  );
}
