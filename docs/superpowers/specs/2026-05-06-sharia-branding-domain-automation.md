# Sharia-Aligned Branding + Domain Health Check Automation

## Summary

Three additions to `emironewebv2` (`index.html` only — no new pages):

1. **Sharia-aligned branding** — hero overline and header nav updated
2. **Sharia-aligned section** — full inline section (pillars + Arabic principles + outcomes) inserted between Section 02 and Section 03
3. **Domain health check drawer** — hero form runs real DNS checks and slides up a narrative results drawer

---

## Feature 1: Sharia-Aligned Branding (hero + nav)

### Hero overline
Change the `pre-headline` text inside `.headline-wrap` from:
```
Deliverability Infrastructure
```
to:
```
Sharia-Aligned Outbound Infrastructure · AU/NZ
```

### Header nav
The header currently has only the live-dot + "Infrastructure live" on the right. Add an anchor link before that:
```html
<a href="#sharia" ...>Sharia-aligned</a>
```
Smooth-scrolls to the new section's `id="sharia"`.

---

## Feature 2: Sharia-Aligned Section (inline in index.html)

### Placement
Inserted as a new `<section>` between the existing Section 02 (How We Work / guide+DNS panel) and Section 03 (The Offer). Section numbers after it shift: current 03 → 04, current 04 → 05, etc.

### Section ID
`id="sharia"` on the section element (so the nav anchor works).

### Section number label
`03 — Ethics & Transparency`
(existing 03/04/05 become 04/05/06)

### Content blocks (in order)

**A. Section heading + intro**
```
Sharia-aligned outbound.
What that actually means.
```
Subline (italic, var(--mid)):
*"Honesty, fairness, and respect for all parties — operationalized in every campaign decision."*

**B. Four Pillars — 2×2 grid**
Each card has: icon glyph (Unicode, no external lib), title, practice, benefit (prefixed "↳")

| Title | Practice | Benefit |
|-------|----------|---------|
| No deception | Truthful subject lines, clear identity, clear purpose | Lower reputational risk; fewer complaint events |
| No manipulation | No pressure, no dark patterns, no manufactured urgency | Sustainable relationships; prospects remember you positively |
| Quality over volume | Signal-based targeting, manual verification, reasonable limits | Higher conversion rates; lower spam complaints |
| Full transparency | Full message approval, complete data access, real-time visibility | Full control; no surprises; you own everything |

Card style: border 1px var(--rule), padding 28px 24px, same paper aesthetic as existing `.v-col` pattern.

**C. Islamic Principles — 3 blocks**
Each block: Arabic text (RTL, Fraunces or fallback, right-aligned, font-size clamp(20px,2.5vw,28px)), transliteration (italic, var(--light)), meaning, "In practice:" paragraph.

| Arabic | Transliteration | Meaning | Practice |
|--------|-----------------|---------|----------|
| لا ضرر ولا ضرار | La darar wa la dirar | No harm and no reciprocating harm | We design systems that protect your reputation and the recipient's inbox. |
| المسلم من سلم الناس من لسانه ويده | Al-Muslim man salima al-nasu min lisanihi wa yadihi | A Muslim is one from whose tongue and hand people are safe | Every message we send should leave the recipient better informed, not annoyed. |
| الصدق في المعاملة | As-sidq fil-mu'amala | Truthfulness in dealings | We never misrepresent capabilities, create false urgency, or use deceptive tactics. |

Block style: border 1px var(--rule), background var(--paper-2), padding 28px.

**D. Outcomes — 3 checkmarks**
- Your reputation is protected
- No tactics you'd be embarrassed by
- Sustainable, long-term relationships

Style: same `.del-item` / reveal pattern as rest of page.

**E. Fit gate**
Two short lines + CTA button:
- "Yes if: you want long-term deliverability and brand safety."
- "No if: you want shortcuts, mass blasting, or pressure tactics."
- Button: "Book a call →" → `book.html`

### Animation
All blocks use existing `.reveal` / IntersectionObserver class — no new animation code needed.

### Section background
Alternating `--paper-2` (same as existing `section--alt` pattern) to visually separate from adjacent sections.

---

## Feature 3: Domain Health Check Drawer

### Trigger
Hero form `#healthForm` submit → instead of redirecting to `book.html`, runs DNS checks and shows the drawer.

### DNS Checks (all client-side via Cloudflare DoH — no server, no API key)

Base URL: `https://cloudflare-dns.com/dns-query`
Headers: `Accept: application/dns-json`

| Check | Query | Points |
|-------|-------|--------|
| SPF | `?name={domain}&type=TXT` → TXT records contain `v=spf1` | 3 pts |
| DMARC | `?name=_dmarc.{domain}&type=TXT` → TXT contains `v=DMARC1`, extract `p=` value | none=1pt, quarantine=2pt, reject=3pt |
| MX | `?name={domain}&type=MX` → any MX records returned | 2 pts |
| DKIM | Try selectors in order: `google`, `mail`, `default`, `selector1`, `selector2` as `{selector}._domainkey.{domain}` TXT | 2 pts if any found, 0 if none |

**Max score: 10**

All 4 checks run in parallel via `Promise.allSettled()`. Total time: ~1.5–2.5 seconds.

### Loading state
While checks run: hero form button text changes to "Checking…" with a CSS spinner. Domain input is disabled.

### Drawer design (narrative, Option B chosen)

**Structure:**
```
[domain] — Health Report               [✕ close]
┌─────────────────────────────────────────────┐
│  7/10   "Close to inbox-ready. Your DMARC   │
│          policy is set to none — upgrade to  │
│          quarantine to close the gap."       │
└─────────────────────────────────────────────┘
✓ SPF — v=spf1 include:_spf.google.com ~all
⚠ DMARC — p=none (should be p=quarantine or p=reject)
✓ MX — 2 records found
— DKIM — selector not detected (check manually)

[  Book a call — we'll fix this in the sprint →  ]
```

**Editorial commentary by score:**
- 9–10: "Excellent infrastructure. Your domain is inbox-ready."
- 7–8: "Close to inbox-ready. [specific weakest check] is the one gap to close."
- 5–6: "Moderate risk. [list gaps] need attention before any cold sending."
- 0–4: "High risk. Missing fundamentals — emails are likely landing in spam."

**Specific gap messages** (used in 7-8 band):
- DMARC p=none: "Your DMARC policy is set to none — upgrade to quarantine to close the gap."
- No DKIM: "DKIM selector not found — add one to complete your authentication stack."
- No SPF: "No SPF record found — this is the most critical gap to fix first."

### Drawer animation
- Fixed position, `bottom: 0`, full width, `max-height: 80vh`, `overflow-y: auto`
- Slides in: `transform: translateY(100%)` → `translateY(0)` over 0.4s `var(--ease)`
- Backdrop: `position: fixed; inset: 0; background: rgba(12,11,9,0.35); z-index: 98`
- Close: X button in header OR click backdrop → slide back down and remove
- `z-index: 99` for drawer, `z-index: 98` for backdrop

### CTA in drawer
Button: full-width, same `.btn-score` style (ink background, paper text)
Label: "Book a call — we'll fix this in the sprint →"
Link: `book.html?domain={domain}&score={score}&source=health_drawer`

### After close
Hero form re-enables. Domain input retains the value. User can re-check a different domain.

### Error handling
If Cloudflare DoH request fails (network error, timeout after 5s): show score as `—/10` with message "Could not reach DNS — check your connection and try again." CTA still shows.

---

## Files Modified

| File | Change |
|------|--------|
| `index.html` | Hero overline text update (1 line) |
| `index.html` | Header nav — add Sharia-aligned anchor link |
| `index.html` | New Sharia section HTML (between sections 02 and 03) |
| `index.html` | New Sharia section CSS (added to existing `<style>` block) |
| `index.html` | Drawer HTML (appended before `</body>`) |
| `index.html` | Drawer CSS (added to existing `<style>` block) |
| `index.html` | Hero form JS handler replaced with DNS check + drawer logic |

No new files. No new dependencies. No backend changes.

---

## Out of Scope

- DKIM for non-common selectors (requires knowing the ESP)
- Blacklist check (requires server-side reverse DNS lookup)
- Email sending / submission to any database
- Mobile-specific layout changes beyond what the existing responsive CSS handles
