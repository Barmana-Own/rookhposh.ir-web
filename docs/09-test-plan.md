# Software Test Plan — Stage 09

## Test matrix

| ID | Risk/requirement | Test level | Test |
| --- | --- | --- | --- |
| T-001 | FR-001–FR-005 metadata and crawl surfaces | Source + HTTP smoke | `scripts/validate-seo.mjs`; local production requests |
| T-002 | FR-006 semantic structure | Source regression | Required H1/section-label markers in `test:seo` |
| T-003 | FR-007 image naming | Source review | Informative logo/trust-seal alt text and decorative loader alt behavior |
| T-004 | FR-008 no-JavaScript fallback | Source regression | Server-rendered fallback marker and content review |
| T-005 | FR-009 origin validation | Unit-level source review | `lib/site.ts` protocol validation and fallback path |
| T-006 | NFR-006 browser protections | Source + HTTP smoke | `next.config.ts` headers and production response inspection |
| T-007 | FR-011 preservation | Build/integrity review | Existing sections, assets, links, and pricing remain present |
| T-008 | Overall integration | Build | `npm run lint`, `npm run typecheck`, `npm run build` |

## Test environment

- Windows PowerShell workspace.
- Node.js v22.15.0.
- Next.js 16.3.5, TypeScript 5.9.3, ESLint 9.36.0.
- Dependency installation used the locked `package-lock.json`.

## Test approach

The repository has no backend or persistent data layer, so fast source checks and a local production-server smoke test provide more relevant evidence than invented integration fixtures. External crawler and Search Console validation remain outside the local test environment.
