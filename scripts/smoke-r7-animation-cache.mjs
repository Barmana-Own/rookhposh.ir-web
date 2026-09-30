const origin = process.env.ANIMATION_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";
const expectedCache = "public, max-age=31536000, immutable";
const representativeFrames = [1, 268, 535];
const failures = [];

for (const frameNumber of representativeFrames) {
  const name = `frame_${String(frameNumber).padStart(5, "0")}.webp`;
  const url = `${origin}/frames/v1/${name}`;
  try {
    const response = await fetch(url);
    const body = await response.arrayBuffer();
    const cacheControl = response.headers.get("cache-control") ?? "";
    const contentType = response.headers.get("content-type") ?? "";

    if (response.status !== 200) {
      failures.push(`${name}: expected HTTP 200, received ${response.status}`);
    }
    if (cacheControl !== expectedCache) {
      failures.push(`${name}: expected Cache-Control "${expectedCache}", received "${cacheControl}"`);
    }
    if (!contentType.toLowerCase().startsWith("image/webp")) {
      failures.push(`${name}: expected image/webp content type, received "${contentType}"`);
    }
    if (body.byteLength === 0) {
      failures.push(`${name}: response body was empty`);
    }
  } catch (error) {
    failures.push(`${name}: request failed (${error instanceof Error ? error.message : String(error)})`);
  }
}

try {
  const legacyResponse = await fetch(`${origin}/frames/frame_00001.webp`);
  if (legacyResponse.status !== 404) {
    failures.push(`legacy frame path: expected HTTP 404, received ${legacyResponse.status}`);
  }
} catch (error) {
  failures.push(`legacy frame path: request failed (${error instanceof Error ? error.message : String(error)})`);
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`R7 animation cache smoke passed for ${representativeFrames.length} versioned frames; legacy path returned 404.`);
}
