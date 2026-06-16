# How We Make It — Full Pipeline Flow (Design Spec)

**Date:** 2026-06-16
**Page:** `/how-we-make-it` (`src/pages/HowWeMakeIt.tsx`)
**Status:** Approved design, pending spec review

## Goal

Rebuild the body of the "How We Make It" page into a single, continuous **four-stage
pipeline** that walks any visitor through the entire Emir One outbound method —
**Infrastructure → List (from triggers) → Copy → Replies** — and is engineered to
**convert a cold visitor into a booked call**. Conversion is achieved the way the brand
demands: by demonstrating rigor, surfacing proof, and offering a low-pressure next step —
never with manufactured urgency.

## Scope

**In scope:** Everything below the page's existing top hero section. The current body
(ramp / copy / replies / transparency / bottom CTA) is replaced by the new pipeline.

**Out of scope (do not touch):**
- The page's existing top hero section — kept exactly as it is.
- Publishing operational secrets: real sending domains, exact tool stack, costs, internal
  revenue/MRR targets, founder milestones, VA plans. None of these appear on the page.

## Source material

Content is drawn from the research portal and the `RESEARCH/` playbook docs, translated
into public-safe language:
- **Infrastructure:** own-your-domains principle (the sheet-metal case study caveat — reporting
  died with rented domains), SPF·DKIM·DMARC, secondaries, 21-day warm-up.
- **List/triggers:** the "Signal Stack" of trigger types + the weighted ICP scoring model.
- **Copy:** trigger+offer structure, value-first asset, 4–5 touch / ~14-day cadence, break-up,
  the human pre-send discipline. Real anonymized sample emails live in `industry_research.what_worked`.
- **Replies:** the 5 response types (already on the page), 24h human handling, consent-first.

## Page structure (top → bottom)

The existing hero is followed by:

1. **Flow overview** — a compact, animated left-to-right diagram:
   `INFRA → LIST (triggers) → COPY → REPLIES → calls booked`. One framing line:
   "Most agencies start at step 3 and rent everything. We start at step 1 — and you own it."
   Visual language echoes the homepage hero's email→calls motif. The four stages below are
   joined by a continuous vertical **spine** (the "pipeline").

2. **01 · The Infrastructure — "We build on ground you own."**
   Dedicated sending domains (never the brand domain), SPF·DKIM·DMARC hardened to 10/10,
   secondaries for resilience, 21-day monitored warm-up. Retains the existing **ramp cards**
   (Day 1 → Day 14+). Differentiator framing: own it, don't rent it.
   - *Conversion:* `10/10 MXToolbox` proof chip; low-friction CTA **"Score your domain free"**.
   - *Research link:* deliverability method.

3. **02 · The List (the engine) — "We don't buy lists. We build them from signals."**
   The centerpiece and primary persuasion block.
   - **Trigger chips:** Funding · Exec hire · Project awarded · Expansion · Stale job post ·
     Grant/season window.
   - **Weighted scoring model** rendered as labeled bars: Firmographic fit 40 / Role fit 30 /
     Trigger event 20 / Engagement 10 → tiered **A (8–10) / B (5–7) / C (hold)**.
   - Then: verified + hand-curated (role accounts removed).
   - *Conversion:* the "they're genuinely rigorous" moment. Honest line — signal-led replies
     run well above the ~5% spray-and-pray baseline — carrying the existing **modeled/recalled
     caveat**; hard figures stay in the linked case studies.
   - *Research links:* the real triggers in the 3 case studies (e.g. Manufacturing shutdown
     windows, Social Impact CSR cycles, AI lab hiring signals).

4. **03 · The Copy — "Written by a human, for one human."**
   Trigger + offer; value-first (send a usable asset, never a call ask in email 1); 4–5 touch /
   ~14-day cadence with a gracious break-up; no filler / no pressure / no spam-trigger phrasing.
   Retains a **live sample-email card**, upgraded to rotate the 3 real anonymized examples from
   `industry_research.what_worked`. A small cadence timeline (Day 0·1·4·7·11·14) visualizes the rhythm.
   - *Conversion:* real sample emails as proof; "every email passes a 5-question human test before
     it sends."
   - *Research link:* the messages that worked.

5. **04 · The Replies — "Every reply handled like it matters — because it does."**
   Reviewed within 24 hours, by a person, never an auto-responder; no persistence beyond consent.
   Retains the 5 **response-type cards** (Interested / Not right now / More information /
   Forwarded internally / Not interested).
   - *Conversion:* meta-move — "when you reply to *us*, you'll feel exactly this." Inline
     high-intent CTA **"Book a revenue sprint call."**

6. **05 · Proof & transparency — "Don't take our word for it — read the research."**
   Retains the existing transparency list (campaigns, targeting rationale, drafts before send,
   outcomes). Adds the capstone: every claim on the page is backed by a published case study.
   - *Conversion:* honesty as the closer. CTA **"Explore the research & case studies"** → `/research`;
     link to the ethics standard → `/sharia-aligned`.

7. **06 · Final close — "Built carefully, operated ethically, reviewed continuously."**
   Dual close: **"Book a revenue sprint call"** (committed) + **"Or just score your domain free"**
   (not-ready visitors enter the funnel). Explicit no-pressure reassurance.

## Conversion architecture

- **Two-tier CTA system throughout:** high-intent ("Book a revenue sprint call", routes to `/book`)
  + zero-friction lead magnet ("Score your domain free", routes to the existing domain checker —
  linked, not embedded mid-page).
- **Proof at every stage:** a concrete proof point + a research link per stage.
- **Honest framing as the persuasion engine:** the modeled/recalled caveats stay; this is the
  brand differentiator that converts skeptics.
- **CTA cadence:** low-friction after Stage 01, high-intent after Stage 04, dual close at the end.

## Visual / interaction treatment

- **Pipeline spine:** the four numbered stages are visually connected by a continuous vertical
  line, reinforcing "one connected system." Reuses the existing numbered-section style
  (`section-grid`, `sec-num`, `section-eyebrow`).
- **Flow overview diagram:** compact, animated left-to-right; honors `prefers-reduced-motion`
  (static fallback).
- **Scoring bars, trigger chips, cadence timeline:** lightweight CSS/SVG, no heavy deps.
- **Design tokens:** existing system only (`--green`, `--mint`, `--paper`, `--display`, etc.).

## Components

- **Reuse:** `Navigation`, `Footer`, the page's existing hero (untouched), the ramp cards, the
  response-type cards, the transparency list, `useScrollReveal`, the `cta` / `link-wipe` styles.
- **New (page-local, extracted if they grow):** `FlowOverview` (the top diagram + spine header),
  `ScoringModel` (weighted bars + tier legend), `TriggerChips`, `CadenceTimeline`, and a
  `SampleEmailCard` that rotates the 3 real examples. Each is a small, single-purpose unit.
- **Data:** the 3 rotating sample emails are **inlined as vetted constants** (sourced verbatim
  from the published case studies' `what_worked`) so this marketing page stays static and fast
  with no loading state or Supabase dependency. If they later drift from the case studies, they
  are updated in one place.

## Responsiveness & accessibility

- Must look polished from 320px to ultrawide. The spine collapses gracefully; the flow overview
  wraps/stacks on narrow screens; scoring bars and chips reflow.
- Respects `prefers-reduced-motion`; all interactive/animated elements have static fallbacks.
- Semantic headings, sufficient contrast, focus-visible states (consistent with the rest of the site).

## Success criteria

- The four stages read as one connected flow, fully scannable without interaction.
- Stage 02 clearly communicates the trigger-based, scored list-building method.
- A high-intent and a low-friction CTA are always within reach as the visitor scrolls.
- No operational secrets exposed; all numeric claims carry their caveats and link to evidence.
- Flawless across devices; hero untouched.
