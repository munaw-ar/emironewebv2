# Site Refinement v2.1 — Design Spec

**Date:** 2026-06-02
**Status:** Approved
**Source:** User feedback after reviewing the live v2.0 site.

## Goal

Refine the existing v2.0 editorial site so it reads as if built by a premium ($50k)
agency — honest, credible, responsive, and tastefully animated — without altering the
established editorial design language (wavy logo, Fraunces/Inter Tight/Libre Baskerville
type, paper/ink/deep-green palette).

## Decisions (from user)

1. **Hero stat** — Remove the unverifiable `98.7% inbox placement`. The GlockApps report
   the user provided actually showed **53.6% inbox / 46.4% spam** for an unwarmed test
   domain (`e.emir-growth.com`), which contradicts the claim. Replace the whole stat row
   with provable metrics only.
2. **Pricing** — Add a transparent "starting from" anchor. Default anchor: **$1,000**
   (user selected the $1,000–$2,500 range; exact figure editable).
3. **Comparison table** — Make honest + balanced. Agency / In-house get real ✓s where
   they genuinely compete; add a "partial" state. No all-green wall.
4. **Domain tool** — Stays in the hero only. No nav tab.

## Changes

### A. Hero stat row — verifiable only (`src/components/sections/Hero.tsx`)
Replace `98.7% / Sprint / 0–92 blacklists` with:
- `10 / 10` — MXToolbox domain score (consistent with Proof table)
- `21-day` — Monitored warm-up protocol
- `SPF·DKIM·DMARC` — Hardened on every domain

### B. Pricing anchor (`Hero.tsx` + `src/components/sections/SectionOffer.tsx`)
- Hero: add subline "Sprints start at $1,000."
- Offer card: add price line "From $1,000 — scoped on the call." above the CTA.

### C. Comparison table — honest + balanced (`src/components/sections/SectionDistinction.tsx`)
- Introduce a tri-state (yes / partial / no) instead of boolean.
- Award Agency and In-house genuine capabilities (research-backed).
- Add a footnote clarifying "partial".

### D. Scroll animation + responsiveness (site-wide)
- Enhance the existing IntersectionObserver reveal with tasteful staggered translate/fade;
  keep `prefers-reduced-motion` honored.
- Responsive audit: section grids (`minmax(0,180px) 1fr`) collapse the label column on
  mobile; wide tables (`SectionProof`, `SectionDistinction`) become stacked cards under
  ~640px. Verify at iPhone (390), iPad portrait (768), iPad landscape (1024).

### E. Research-informed polish (10 parallel agents)
Research feeds the above + general premium polish:
- Premium editorial B2B design patterns
- Cold-email-infrastructure competitor capabilities (for table C)
- Scroll/micro-interaction craft
- Responsive type & spacing systems
- Accessibility (WCAG AA)

## Out of scope
- No nav tab for the domain tool.
- No change to the wavy logo, fonts, or color tokens.
- No backend/Supabase changes (tracked separately).

## Success criteria
- No unverifiable claims remain on the site.
- Pricing anchor visible in hero + offer.
- Comparison table reads as credible, not self-serving.
- Site renders cleanly with no horizontal overflow at 390/768/1024 widths.
- Scroll reveals feel smooth and intentional; reduced-motion respected.
- `npm run build` passes with 0 TS errors.
