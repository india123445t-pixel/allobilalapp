# VEXORA RA-04 — Morocco Plate Change Decision Checker

Task: `VXR-TASK-20260925-005`
Branch: `ra04-organic-ads`
Budget: `0 MAD`

## Layout
- `site/` — deployable static asset.
- `qa/test.js` — deterministic decision-logic tests.

## Staging controls
The staging build intentionally uses both `<meta name="robots" content="noindex,nofollow">` and `robots.txt: Disallow: /`. Remove both only after live visual QA, source verification, privacy check, and the final publication readiness gate pass.

## Data / privacy
The checker is client-side only. It does not request or store registration numbers, identity details, email, location, cookies, local/session storage, analytics, or network API calls.

## Sources
Primary legal source: Moroccan Bulletin Officiel no. 7531, decision 640.26. Current clarification: SNRT/NARSA coverage dated September 2026.

## Hosting
Target: Render Static Site on the free tier, isolated to this subdirectory so the existing VEXORA revenue site is not replaced.