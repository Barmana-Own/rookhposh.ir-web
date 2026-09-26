# Reference audit — Octaboot

Source: `https://tailor-by-octaboot.vercel.app/`

Observed after a full load and slow desktop scroll-through at approximately 2146 × 1272 CSS pixels. The reference uses a 10px/10px/11px near-black base, Cormorant Garamond for display type, Jost for utility/body type, and a canvas-backed 535-frame WebP sequence for the pinned story scene.

## Global structure

- Initial loader overlays the page and locks body scrolling until the asset preparation phase finishes.
- Fixed header sits above the story scene and translates out while the story advances.
- `#scene` is a roughly 10,812px pinned ScrollTrigger region at the observed desktop viewport; its `.sticky` child is fixed to the viewport.
- The story counter and 2px gold progress line are scene-local overlays.
- Closing section `#book` follows the pinned scene and contains the final CTA and footer.
- Full document height observed: roughly 11,938px at the reference viewport.

## Loader — Phase 1 scope

- DOM shape observed: `#loader.loader` → `.loader__mark` with `octaboot.png`, `.loader__bar` → `#loaderFill`, `.loader__pct` → `#loaderPct` plus italic `%`, `.loader__label`.
- Full-viewport fixed overlay, `z-index: 1000`, flex column centered, background `rgb(10, 10, 11)`.
- At 2146 × 1272: overlay content is centered around x=1065.5. Mark renders at 70 × 46.66px; bar is 240 × 1px; percentage display is 32px Cormorant Garamond with 0.64px tracking; label is 9.92px Jost with 3.968px tracking and color `rgb(109, 104, 95)`.
- Bar base is `rgba(255,255,255,.12)`; fill is `rgb(198,163,92)`; fill width transitions linearly over 0.25s.
- Initial visible state shows `0%`; observed intermediate uncached state showed `22%`, `60%`, and `68%`; final state shows `100%` before the overlay exits.
- The label is rendered in uppercase visually through CSS, while source text is `Preparing the atelier`.
- Completion applies `.is-done`, sets `aria-hidden=true`, fades opacity/visibility to zero over 1s with `cubic-bezier(.16,.84,.32,1)`, and restores page interaction after critical assets are ready.
- At first paint, the page DOM is already present behind the overlay. The loader is asset-aware rather than a pure fixed-delay splash: the reference loads the 535-frame sequence (`/assets/frames/frame_00001.webp` through `frame_00535.webp`) and the progress advances while those resources prepare.
- Reduced motion should keep the overlay timing short and preserve the locked-to-unlocked state transition.

## Story scene / narrative audit

All seven story chapters share the same pinned full-screen canvas and layered grades (vignette, top/bottom gradients, grain). The canvas frame changes scrub with scroll; text panels alternate left/right and switch around the chapter boundaries.

| ID | Copy | Media / visual | Desktop placement | Mobile behavior | Motion / trigger |
| --- | --- | --- | --- | --- | --- |
| 00 | Octaboot · Bespoke Since MCMXC8 / The Anatomy of a Suit / Scroll | Frame sequence, initial translucent human figure on reflective floor | Centered hero panel over canvas | Text and canvas remain centered with tighter type and crop | Intro state before chapter 01; canvas is pinned immediately |
| 01 | The Foundation / A Shirt of Pure Cotton / Cloth Egyptian Two-Ply Poplin · 120s | White shirt assembling from separated components | Left panel | Left/right panel placement adapts to narrow viewport | Scroll-scrubbed frame sequence; counter `01 / 07` |
| 02 | The Waistcoat / Structure, Held Close / body copy / Silk Mulberry, Woven in Como | Black waistcoat and tie over shirt | Right panel | Panel stacks/relocates for narrow viewport | Scroll-scrubbed; counter `02 / 07` |
| 03 | The Canvas / Built on Full Canvas / Construction Hand-Padded Full Canvas | Suit components separating around a jacket | Left panel | Narrower crop and panel | Scroll-scrubbed; counter `03 / 07` |
| 04 | The Cut / The Complete Silhouette / Cloth Super 150's Merino · 240g | Finished suit on a man fastening the sleeve | Right panel | Narrow crop and relocated panel | Scroll-scrubbed; counter `04 / 07` |
| 05 | The Man / Made to Be Worn / Fit Individually Made to Measure | Dark-suited man centered | Left panel | Narrow crop and panel | Scroll-scrubbed; counter `05 / 07` |
| 06 | The Procession / A Language of Colour / Palette Four Signature Tones | Four suited figures walking in a lit street | Right panel | Narrow crop and panel | Scroll-scrubbed; counter `06 / 07` |
| 07 | The Detail / The Last Quarter-Inch / body copy / Finish Working Surgeon's Cuffs | Close-up of sleeve cuff and buttons | Left panel | Narrow crop and panel | Scroll-scrubbed; counter `07 / 07`; gold scene progress completes |

## Closing section

- `#book` is a roughly 1,126px flex section at the observed desktop viewport, separated from the scene by the scene progress line.
- Centered Octaboot mark, gold uppercase kicker `THE HOUSE OF FASHION`, large two-line Cormorant heading `Tailoring / for the few.`, centered body copy, and outlined gold CTA `BOOK A PRIVATE FITTING`.
- Footer is a centered max-width grid with brand at left and Atelier/Wardrobe/Visit link columns at right; fine divider and low-contrast copyright line.

## Media inventory

- Reference uses one small PNG mark at `/assets/img/octaboot.png` and 535 WebP frame assets under `/assets/frames/`.
- No `<video>` elements were present in the inspected DOM. The animated visual is a canvas image sequence.
- The local implementation keeps the same frame sequence, canvas cover-fit rendering, GSAP/ScrollTrigger choreography, editorial copy, CTA, footer, responsive breakpoints, cinematic overlays, and loader lifecycle.

## Implementation status

- The full page is implemented in the Next.js client experience. The loader is asset-aware, the visual scene begins after a comfortable frame buffer, and the canvas is scrubbed across the same chapter cue map as the reference.
