# Design System — Rookhposh SEO Delivery

## Purpose

Preserve the existing Rookhposh editorial landing page while making its semantic, responsive, and crawl-facing surfaces explicit.

## Visual foundations

- Direction: RTL, language `fa-IR`.
- Base: near-black `#0a0a0b` with a softer surface `#111114`.
- Brand accent: gold `#c6a35c` and light gold `#d8bd82`.
- Primary text: warm white `#f3efe6`; secondary text: `#b8b2a6`; muted text: `#6d685f`.
- Typography: Vazirmatn for Persian content, with the existing weight range from 400 through 800.
- Motion: existing GSAP scroll choreography; reduced-motion rules remain in place.
- Density: cinematic hero and scene, then a readable pricing grid and footer.

## SEO-facing design rules

- Keep one visible primary H1 for the service promise.
- Use a hidden but accessible section heading to label the seven-step workflow.
- Keep structured data aligned with visible service claims.
- Keep no-JavaScript fallback copy concise and equivalent to the visible value proposition.
- Use meaningful logo and trust-seal alt text; do not add keyword-stuffed alt text to decorative frames.

## Component states

| Component | Required states |
| --- | --- |
| Loader | Initial, progressive loading, completion, reduced motion |
| Scroll story | Hero, seven chapter states, frame error tolerance, reduced motion |
| Pricing cards | Default, featured, hover/focus, CTA navigation |
| Footer/trust seal | Loaded, external image failure, keyboard focus |
| SEO surfaces | Metadata present, crawl files available, JSON-LD serializable, no-JS fallback |

## Accessibility and localization

- Preserve `lang="fa"`, `dir="rtl"`, isolated Persian copy, and explicit LTR treatment for phone numbers.
- Preserve the existing `role="status"` loader announcement.
- Use `aria-labelledby` for the story section instead of an unlabeled generic region.
- Keep the trust-seal link keyboard reachable and its image name meaningful.
- Do not convey SEO or status meaning by color alone.

## Handoff to Stage 03

The frontend implementation should use the existing component boundaries. SEO metadata belongs in the server root layout and App Router metadata files; structured data belongs in a small server component; client-only animation code should not own crawl-critical information.
