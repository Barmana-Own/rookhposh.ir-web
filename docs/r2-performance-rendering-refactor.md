# R2 Performance, Rendering and Client-Bundle Refactor

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Phase | R2 — Performance, Rendering and Client-Bundle Refactor |
| Gregorian date | 2026-09-26 |
| Jalali date | ۱۴۰۵-۰۷-۰۴ |
| Scope | Existing homepage performance, rendering boundary, accessibility, and frame scheduling |
| Design status | Existing visual identity and scroll story preserved |

## BEFORE MEASUREMENTS

The R1 production build generated the static App Router routes `/`, `/_not-found`, `/manifest.webmanifest`, `/robots.txt`, and `/sitemap.xml` with Next.js 16.3.5 Turbopack. The pre-refactor JavaScript inventory contained 9 chunks totaling 699,466 bytes (683.1 KiB). The largest chunks were 229,154, 183,172, 112,594, and 69,850 bytes.

The source runtime created an `Image` object and assigned a source for all 535 WebP frames in one synchronous loop. The frames total 11,423,938 bytes (10.89 MiB), ranging from 11,462 to 41,652 bytes. A local browser asset inventory observed 231 frame assets after three seconds on the baseline build. This is a browser-tool observation, not a protocol-level request trace.

Lighthouse CLI and a local Lighthouse package were unavailable. The connected browser context did not expose the Performance API, so no exact transfer timing, request waterfall, Lighthouse score, field Core Web Vitals, or production RUM claim is made. Full baseline evidence is in [`docs/r2-before-measurements.md`](r2-before-measurements.md).

## SERVER/CLIENT REFACTOR

`OctabootExperience.tsx` is now a Server Component. It owns server-rendered navigation, headings, story copy, pricing, FAQ, footer, external links, accessible image alternatives, and the static fallback scene.

`AnimationRuntime.tsx` is the focused Client Component. It owns only canvas setup, GSAP/ScrollTrigger enhancement, frame scheduling, resize/scroll listeners, loader progress updates, and cleanup. GSAP and ScrollTrigger are dynamically imported after a usable frame is available.

The semantic page is present in the initial HTML and accessibility tree. The old duplicated hidden `noscript` content was removed because the same visible content is now server-rendered once. The canvas is `aria-hidden` because the story information is represented by semantic text.

## FRAME LOADING STRATEGY

The implementation uses a bounded queue with these documented controls:

| Control | Value | Purpose |
| --- | ---: | --- |
| Total frames | 535 | Existing visual sequence |
| Critical window | 18 | Establishes the opening sequence and readiness accounting |
| Ready threshold | 4 settled frames | Dismisses the loader after useful content is available |
| Initial continuation | 18 frames | Extends the opening window after the first usable frame |
| Maximum concurrent downloads | 4 | Bounds browser work and connection pressure |
| Ahead / behind window | 24 / 8 frames | Prefetches near the current scroll position |
| Device-pixel-ratio cap | 2 | Bounds canvas backing-store memory |

Frame failures settle as failed entries and do not block the page indefinitely. The queue prioritizes the requested frame, renders the nearest loaded frame when the exact one is unavailable, and cancels active image handlers and sources during unmount.

## INITIAL REQUEST REDUCTION

On a fresh local production-browser navigation, the asset inventory observed 36 frame assets after approximately 1.2 seconds: `frame_00001.webp` through `frame_00036.webp`. The first 18 are the critical queue and the next 18 are the continuation window after the first usable frame. This represents 36 of 535 frames (6.7%) exposed during the initial observation, while the baseline source attempted to initiate all 535.

The baseline inventory observed 231 frames after three seconds and the R2 inventory was observed at a different timing, so the two observations are directional rather than a controlled request-count benchmark. The source-level concurrency bound and queue are the authoritative R2 behavior. Exact network request reduction requires a browser protocol trace or production telemetry that was not available.

The client JavaScript total changed from 699,466 bytes to 698,459 bytes across 9 chunks: a reduction of 1,007 bytes (0.15%). This is intentionally reported as a small bundle change; the material improvement is moving static content out of the animation runtime and controlling frame work, not claiming a large bundle shrink.

## REDUCED-MOTION RESULT

When `prefers-reduced-motion: reduce` matches, the runtime does not import GSAP or ScrollTrigger, queues only frame 0, and leaves the server-rendered scene in its static fallback state. CSS disables the remaining decorative loader/grain/scroll-cue animation and removes enhanced-scene motion rules. All story copy, pricing, FAQ, and footer content remains available.

The source path is covered by `npm run test:r2`. Browser-level media emulation was not available in the connected browser surface, so a forced reduced-motion browser run is `NOT_RUN`.

## FALLBACK RESULT

The scene is rendered with `scene--fallback` before enhancement. If JavaScript, canvas setup, GSAP import, or frame loading fails, the static panels remain readable. The loader is hidden by default and is only shown by the runtime, so JavaScript failure does not leave a blocking overlay. The loader status is a separate visually-hidden `role="status"` live region for assistive technology.

## IMAGE OPTIMIZATION

The original `public/images/octaboot.png` was preserved as a compatibility asset. A new additive production asset, `public/images/rookhposh-mark.webp`, is 768×512 and 8,022 bytes, compared with the original 1536×1024 PNG at 239,789 bytes. The replacement is approximately 96.7% smaller and is used by `next/image` in the server-rendered header, footer, loader, metadata, and JSON-LD.

The 535 animation frames remain WebP assets and are not converted to 535 `next/image` elements. The external e-Namad URL and official link behavior remain unchanged. Its local wrapper reserves 82×134 pixels, and the remote image is lazy-loaded with `referrerPolicy="origin"` to avoid avoidable layout movement and preserve the existing integration.

## ACCESSIBILITY RESULT

The browser smoke test observed the Persian RTL heading structure, navigation, pricing content, FAQ, footer, meaningful image alternatives, and loader status in the initial page. Activating the first FAQ summary exposed its factual answer. The canvas is decorative to assistive technology, the loader mark is decorative, and the external trust seal has a meaningful alternative.

No SEO cloaking was introduced. The same server-rendered Persian content is shown to users and crawlers.

## BUILD/LINT/TYPECHECK

| Check | Result | Evidence |
| --- | --- | --- |
| `npm run test:seo` | PASS | Metadata and server-component regression markers |
| `npm run test:r2` | PASS | Controlled queue, fallback, reduced-motion, asset, and 535-frame checks |
| `npm run lint` | PASS | ESLint completed without findings |
| `npm run typecheck` | PASS | TypeScript completed without errors |
| `npm run build` | PASS | Next.js 16.3.5 production build and static route generation |
| `npm run test:seo:smoke` | PASS | Production HTTP metadata, JSON-LD, crawl files, fallback markers, and genuine 404 |
| Browser smoke | PASS | Fresh page semantics, loader readiness, 36-frame initial inventory, FAQ interaction |
| Lighthouse / field CWV | NOT_RUN | Tooling and production field data unavailable |

The first sandboxed build attempt compiled but failed at the Next.js worker step with `spawn EPERM`; the same command passed under the approved elevated execution profile. This is recorded as an environment limitation, not an application failure.

## AFTER MEASUREMENTS

- 9 JavaScript chunks, 698,459 bytes (682.1 KiB), compared with 699,466 bytes before R2.
- 535 frames, 11,423,938 bytes (10.89 MiB), unchanged as required to preserve the visual sequence.
- Fresh browser initial observation: 36 frame assets exposed after approximately 1.2 seconds; no full 535-frame startup load was observed.
- Static Persian semantic content was present before animation enhancement and remained available after the loader became ready.
- The optimized brand asset is 8,022 bytes and is served through Next Image for static uses.

## REMAINING PERFORMANCE RISKS

- The visual sequence remains a 10.89 MiB asset workload and can still consume bandwidth, decode time, memory, and CDN capacity during extended scrolling.
- The current environment does not provide Lighthouse, protocol request timing, field Core Web Vitals, or production RUM. Deployment monitoring is required before claiming user-facing Core Web Vitals improvement.
- External dashboard, blog, and e-Namad availability remain outside this repository.
- The original legacy PNG remains intentionally present for compatibility; it should only be removed after a separate reference and deployment audit.
- Approved Terms of Use and Privacy Policy copy/routes remain an R1 owner-input item and are unrelated to the R2 performance refactor.
