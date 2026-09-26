# R2 Before Measurements — Performance and Rendering Refactor

| Field | Value |
| --- | --- |
| Project | Rookhposh / رخ پوش |
| Phase | R2 — Performance, Rendering and Client-Bundle Refactor |
| Gregorian date | 2026-09-26 |
| Jalali date | ۱۴۰۵-۰۷-۰۴ |
| Measurement build | R1 production build, before R2 source changes |
| Lab-data status | Local lab observations only; no field Core Web Vitals claim |

## Production build baseline

The R1 build immediately before this refactor completed with Next.js 16.3.5 Turbopack and generated these App Router routes:

```text
/                    static
/_not-found          static
/manifest.webmanifest static
/robots.txt          static
/sitemap.xml         static
```

No Lighthouse CLI or local Lighthouse package was available in the workspace, so Lighthouse lab scores are `NOT_RUN` rather than estimated.

## Client JavaScript baseline

The pre-refactor `.next/static/chunks` inventory contained 9 JavaScript chunks totaling 699,466 bytes (683.1 KiB). The largest chunks were:

| Chunk | Size |
| --- | ---: |
| `3fb105us0tqcg.js` | 229,154 bytes |
| `011fvvfxb8kt-.js` | 183,172 bytes |
| `0cz1d0mv5g_q7.js` | 112,594 bytes |
| `1l-84zbn-9awz.js` | 69,850 bytes |

The animation runtime was present in `357ybp_c0qqbq.js`.

## Animation asset baseline

The repository contains 535 WebP frames totaling 11,423,938 bytes (10.89 MiB), with a measured range of 11,462–41,652 bytes and an average of 21,353 bytes per frame. The existing client effect constructed an `Image` object and assigned a source for all 535 paths in one synchronous loop, with no concurrency bound or progressive queue.

## Browser baseline

Using the local production server at `http://127.0.0.1:3100/` and the Codex browser asset inventory:

- The page title and Persian RTL semantic content were present.
- The initial accessibility observation exposed the loader status at `۱۰۰٪` after the pre-refactor load cycle.
- The browser asset inventory observed 231 frame assets after the page settled for three seconds. The inventory is an observation of assets exposed by the browser tool, not a substitute for a protocol-level request trace; the source loop is the authoritative evidence that all 535 requests were initiated without a scheduler.
- The browser smoke observation exposed the navigation, pricing, FAQ, footer and external links.

## Measurement limitations

- Exact transfer timing and protocol request counts were not available through the connected browser surface because its page-evaluation context does not expose the Performance API.
- No field data, RUM, Core Web Vitals, or production traffic data was available.
- The external e-Namad image host was not treated as part of the local bundle measurement.
