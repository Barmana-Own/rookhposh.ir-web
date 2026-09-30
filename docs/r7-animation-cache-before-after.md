# R7 Animation Cache Before/After

## Scope

This document records the measured animation-frame integrity and cache behavior for the R7 versioned-asset change. The approved animation runtime behavior is unchanged; only the static frame URL base path and its response-cache policy are in scope.

Date: 2026-09-29 (Gregorian) / ۱۴۰۵/۰۷/۰۷ (Solar Hijri)

## Before

Measured from the working tree before the asset-path change:

| Measure | Result |
| --- | --- |
| Frame directory | `public/frames/` |
| Frame count | `535` |
| Total bytes | `11,423,938` |
| First frame | `frame_00001.webp` |
| Middle frame | `frame_00268.webp` |
| Last frame | `frame_00535.webp` |
| Runtime frame root | `"/frames"` |
| Representative production-server cache header | `public, max-age=0` |

Representative content hashes before the move:

| Frame | SHA-256 |
| --- | --- |
| `frame_00001.webp` | `c7b1ba9e912c52e3a77de2d3ad20f040984d958e0504b9e239256edef89152bb` |
| `frame_00268.webp` | `37823354bd6924ad57440e0a042b18a94c39ee28b426ebbfae2be8a019f97f22` |
| `frame_00535.webp` | `db2ebe2448f6c91c85e5f4a25ea480da680e99d9312c764f265316f723b210ef` |

The sequence integrity signature is the SHA-256 of the UTF-8, LF-newline-separated list of sorted entries in the form `filename:lowercase-file-sha256`:

`739bb260101d54d3d86d6077388363de9f6a52b9e71bfea9e1265c70c0200d86`

The existing `next.config.ts` had no frame-specific immutable cache rule. The current controlled loader, concurrency limit, reduced-motion branch, frame order, scroll mapping, GSAP, ScrollTrigger, and canvas drawing were recorded as protected behavior and were not changed.

## Change applied

- Moved the 535 existing WebP files from `public/frames/` to `public/frames/v1/` without changing file contents or names.
- Changed the single `FRAME_ROOT` constant in `AnimationRuntime.tsx` from `/frames` to `/frames/v1`.
- Added a targeted `Cache-Control: public, max-age=31536000, immutable` rule for `/frames/v1/:path*`.
- Kept the old unversioned frame directory free of frame files so the production build does not retain a duplicate sequence.
- Did not change frame loading, queueing, concurrency, readiness, reduced-motion behavior, animation timing, canvas drawing, or layout.

## After

Measured after the move and implementation:

| Measure | Result |
| --- | --- |
| Frame directory | `public/frames/v1/` |
| Frame count | `535` |
| Total bytes | `11,423,938` |
| Missing frame numbers | `0` |
| Frame files remaining directly under `public/frames/` | `0` |
| First/middle/last local production requests | `200` |
| New representative cache header | `public, max-age=31536000, immutable` |
| Old unversioned representative request | `404` |

The after sequence signature and representative frame hashes must equal the before values above. Validation output and any environment limitations are recorded with the final implementation report.

Verified after implementation:

- The after sequence signature is `739bb260101d54d3d86d6077388363de9f6a52b9e71bfea9e1265c70c0200d86`, equal to the before signature.
- `npm run test:r2`, `npm run test:seo`, `npm run test:r3`, `npm run test:r6`, and `npm run test:blog` passed.
- `npm run typecheck` and `npm run lint` passed.
- `npm run build` passed after rerunning outside the restricted worker-spawn environment; the initial sandboxed run returned `spawn EPERM` during TypeScript worker startup.
- `npm run test:r7:smoke` passed against the local production server.
- `npm run test:seo:smoke`, `npm run test:r3:smoke`, and `npm run test:r4:smoke` passed against the same server.
- Direct HTTP checks confirmed `200`, `image/webp`, and `public, max-age=31536000, immutable` for the first, middle, and last versioned frames.
- Direct HTTP checks confirmed the old `/frames/frame_00001.webp` URL returns `404`.
- `npm run test:r6:smoke` remains a pre-existing page-copy assertion failure (`/` H1 expectation) outside this asset-cache scope; it is not a frame-path or cache regression.

## Operational note

The deployment artifact must include `public/frames/v1/`. Because the URL is versioned and immutable, a future frame-content change requires a new versioned directory and a corresponding runtime base-path update; the existing version must not be mutated in place.
