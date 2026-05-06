# Sharia Branding + Domain Health Check Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Sharia-aligned branding and a full ethics section to `index.html`, and replace the hero domain form stub with a real DNS-based health check that slides up a narrative results drawer.

**Architecture:** All changes are in `index.html` only — no new files, no new dependencies, no backend. DNS checks use Cloudflare's free DNS-over-HTTPS API (`cloudflare-dns.com/dns-query`) from the browser. The drawer is a fixed-position element that animates in with CSS transitions. The Sharia section uses existing CSS patterns (`.section`, `.reveal`, `--paper-2`) already in the file.

**Tech Stack:** Vanilla HTML/CSS/JS (ES2020), Cloudflare DNS-over-HTTPS (free, no key), `Promise.allSettled()` for parallel DNS queries.

---

## File Map

| File | Lines affected | What changes |
|------|---------------|--------------|
| `index.html` | ~1720–1726 | Header nav — add Sharia-aligned anchor link |
| `index.html` | ~1740 | Hero overline text |
| `index.html` | `<style>` block | Add Sharia section CSS + drawer CSS |
| `index.html` | ~1898 (between §02 and §03) | Insert Sharia section HTML; shift §03→§04, §04→§05, §05→§06 |
| `index.html` | before `</body>` | Add drawer backdrop + drawer HTML |
| `index.html` | ~2225 (healthForm JS handler) | Replace stub with DNS check + drawer logic |

---

## Task 1: Sharia-Aligned Branding (hero overline + nav link)

**Files:**
- Modify: `index.html` — line ~1721 (nav) and line ~1740 (hero overline)

- [ ] **Step 1: Update hero overline**

Find this exact string in `index.html`:
```html
      <div class="pre-headline">Deliverability Infrastructure</div>
```

Replace with:
```html
      <div class="pre-headline">Sharia-Aligned Outbound Infrastructure · AU/NZ</div>
```

- [ ] **Step 2: Verify the overline change**

Run:
```bash
grep -n "pre-headline" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: line shows `Sharia-Aligned Outbound Infrastructure · AU/NZ`

- [ ] **Step 3: Add Sharia-aligned nav link**

Find this exact string in `index.html`:
```html
      <a href="research.html" style="font-size:12.5px;color:var(--mid);text-decoration:none;margin-right:20px;letter-spacing:0.01em;transition:color 0.15s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--mid)'">Research</a>
```

Replace with:
```html
      <a href="research.html" style="font-size:12.5px;color:var(--mid);text-decoration:none;margin-right:20px;letter-spacing:0.01em;transition:color 0.15s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--mid)'">Research</a>
      <a href="#sharia" style="font-size:12.5px;color:var(--mid);text-decoration:none;margin-right:20px;letter-spacing:0.01em;transition:color 0.15s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--mid)'">Sharia-aligned</a>
```

- [ ] **Step 4: Verify nav link**

Run:
```bash
grep -n "sharia" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -5
```
Expected: line with `href="#sharia"` in the header area

- [ ] **Step 5: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add index.html
git commit -m "feat: add Sharia-aligned branding to hero overline and header nav"
```

---

## Task 2: Sharia Section CSS

**Files:**
- Modify: `index.html` — `<style>` block (add before closing `</style>`)

- [ ] **Step 1: Find the closing style tag**

Run:
```bash
grep -n "^</style>" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -3
```
Note the line number of the first `</style>`. Read 5 lines before it to get the exact surrounding context.

- [ ] **Step 2: Add Sharia section CSS**

Find the closing `</style>` tag of the main stylesheet (it will be preceded by existing CSS rules, not by `</script>`). Insert the following CSS block **immediately before** that `</style>`:

```css
/* ══════════════════════════════════════════
   SHARIA-ALIGNED SECTION
══════════════════════════════════════════ */
.pillar-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: 1px solid var(--rule);
  margin-bottom: 56px;
}
@media (max-width: 640px) { .pillar-grid { grid-template-columns: 1fr; } }

.pillar-card {
  padding: 28px 24px;
  border-right: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.pillar-card:nth-child(even) { border-right: none; }
.pillar-card:nth-last-child(-n+2) { border-bottom: none; }
@media (max-width: 640px) {
  .pillar-card { border-right: none; }
  .pillar-card:nth-last-child(-n+2) { border-bottom: 1px solid var(--rule); }
  .pillar-card:last-child { border-bottom: none; }
}

.pillar-glyph {
  font-size: 18px;
  margin-bottom: 14px;
  display: block;
  color: var(--green);
}
.pillar-title {
  font-family: var(--serif);
  font-size: 18px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 8px;
}
.pillar-practice {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--mid);
  margin-bottom: 10px;
}
.pillar-benefit {
  font-size: 13.5px;
  color: var(--green);
  font-style: italic;
  line-height: 1.5;
}

.islamic-blocks { display: flex; flex-direction: column; gap: 0; margin-bottom: 56px; }

.islamic-block {
  border: 1px solid var(--rule);
  border-bottom: none;
  background: var(--paper-2);
  padding: 28px 32px;
}
.islamic-block:last-child { border-bottom: 1px solid var(--rule); }

.arabic-text {
  font-family: var(--serif);
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.5;
  margin-bottom: 8px;
  text-align: right;
  direction: rtl;
}
.islamic-transliteration {
  font-size: 13px;
  color: var(--light);
  font-style: italic;
  margin-bottom: 14px;
}
.islamic-practice {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--mid);
}
.islamic-practice strong { font-weight: 600; color: var(--ink-2); font-style: normal; }

.sharia-outcomes {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 48px;
  max-width: 600px;
}
.sharia-outcome {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule-2);
  font-size: 15px;
  line-height: 1.55;
  color: var(--ink-2);
}
.sharia-outcome:last-child { border-bottom: none; }
.sharia-check { color: var(--green); flex-shrink: 0; margin-top: 2px; font-size: 13px; }

.fit-gate {
  border: 1px solid var(--rule);
  padding: 28px 32px;
  max-width: 600px;
  margin-bottom: 36px;
}
.fit-gate p { font-size: 15px; line-height: 1.65; color: var(--mid); }
.fit-gate p + p { margin-top: 8px; }
.fit-gate strong { color: var(--ink); font-weight: 600; }
```

- [ ] **Step 3: Verify CSS was added**

Run:
```bash
grep -c "pillar-grid\|islamic-block\|arabic-text\|fit-gate" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: `4` (one match for each class definition)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Sharia section CSS classes"
```

---

## Task 3: Sharia Section HTML + Section Number Shift

**Files:**
- Modify: `index.html` — insert section between §02 and §03; update §03/§04/§05 labels

- [ ] **Step 1: Shift section numbers 03→04, 04→05, 05→06**

Run this to confirm current numbers:
```bash
grep -n "section-num" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected lines like: `03 &mdash; The Offer`, `04 &mdash; The Distinction`, `05 &mdash; Proof of Work`

Make three targeted edits:

**Edit A** — Find:
```html
      <div class="section-num">03 &mdash; The Offer</div>
```
Replace with:
```html
      <div class="section-num">04 &mdash; The Offer</div>
```

**Edit B** — Find:
```html
      <div class="section-num">04 &mdash; The Distinction</div>
```
Replace with:
```html
      <div class="section-num">05 &mdash; The Distinction</div>
```

**Edit C** — Find:
```html
      <div class="section-num">05 &mdash; Proof of Work</div>
```
Replace with:
```html
      <div class="section-num">06 &mdash; Proof of Work</div>
```

- [ ] **Step 2: Verify the number shift**

Run:
```bash
grep -n "section-num" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: `01`, `02`, `04`, `05`, `06` — no `03` remaining.

- [ ] **Step 3: Insert the Sharia section HTML**

Find this exact string (the comment + opening tag of the Offer section):
```html
<!-- ─── OFFER ──────────────────────────── -->
<section class="section" id="sprint" aria-labelledby="offer-h">
```

Replace with:

```html
<!-- ─── SHARIA ─────────────────────────── -->
<section class="section section--alt" id="sharia" aria-labelledby="sharia-h">
  <div class="w">
    <div class="section-header">
      <div class="section-num">03 &mdash; Ethics &amp; Transparency</div>
      <div>
        <h2 class="section-h reveal" id="sharia-h">Sharia-aligned outbound. <em>What that actually means.</em></h2>
        <p class="section-sub reveal reveal-delay-1">Honesty, fairness, and respect for all parties &mdash; operationalized in every campaign decision.</p>
      </div>
    </div>

    <!-- Four Pillars -->
    <div class="pillar-grid reveal">
      <div class="pillar-card">
        <span class="pillar-glyph" aria-hidden="true">&#9632;</span>
        <div class="pillar-title">No deception</div>
        <div class="pillar-practice">Truthful subject lines, clear identity, clear purpose in every message.</div>
        <div class="pillar-benefit">&darr; Lower reputational risk; fewer complaint and brand-damage events.</div>
      </div>
      <div class="pillar-card">
        <span class="pillar-glyph" aria-hidden="true">&#9632;</span>
        <div class="pillar-title">No manipulation</div>
        <div class="pillar-practice">No pressure, no dark patterns, no manufactured urgency or false scarcity.</div>
        <div class="pillar-benefit">&darr; Sustainable relationships; prospects remember you positively.</div>
      </div>
      <div class="pillar-card">
        <span class="pillar-glyph" aria-hidden="true">&#9632;</span>
        <div class="pillar-title">Quality over volume</div>
        <div class="pillar-practice">Signal-based targeting, manual verification, reasonable sending limits.</div>
        <div class="pillar-benefit">&darr; Higher conversion rates; lower spam complaints.</div>
      </div>
      <div class="pillar-card">
        <span class="pillar-glyph" aria-hidden="true">&#9632;</span>
        <div class="pillar-title">Full transparency</div>
        <div class="pillar-practice">Full message approval, complete data access, real-time visibility into campaigns.</div>
        <div class="pillar-benefit">&darr; Full control; no surprises; you own everything.</div>
      </div>
    </div>

    <!-- Islamic Principles -->
    <div class="section-h reveal" style="font-family:var(--serif);font-size:clamp(22px,3vw,32px);font-weight:300;letter-spacing:-0.02em;color:var(--ink);margin-bottom:28px;">Rooted in Islamic business ethics.</div>
    <div class="islamic-blocks reveal reveal-delay-1">
      <div class="islamic-block">
        <div class="arabic-text">&#x644;&#x627; &#x636;&#x631;&#x631; &#x648;&#x644;&#x627; &#x636;&#x631;&#x627;&#x631;</div>
        <div class="islamic-transliteration">&ldquo;La darar wa la dirar&rdquo; &mdash; No harm and no reciprocating harm</div>
        <div class="islamic-practice"><strong>In practice:</strong> We design systems that protect your reputation and the recipient&rsquo;s inbox &mdash; not just your open rate.</div>
      </div>
      <div class="islamic-block">
        <div class="arabic-text">&#x627;&#x644;&#x645;&#x633;&#x644;&#x645; &#x645;&#x646; &#x633;&#x644;&#x645; &#x627;&#x644;&#x646;&#x627;&#x633; &#x645;&#x646; &#x644;&#x633;&#x627;&#x646;&#x647; &#x648;&#x64A;&#x62F;&#x647;</div>
        <div class="islamic-transliteration">&ldquo;Al-Muslim man salima al-nasu min lisanihi wa yadihi&rdquo; &mdash; A Muslim is one from whose tongue and hand people are safe</div>
        <div class="islamic-practice"><strong>In practice:</strong> Every message we send should leave the recipient better informed, not annoyed.</div>
      </div>
      <div class="islamic-block">
        <div class="arabic-text">&#x627;&#x644;&#x635;&#x62F;&#x642; &#x641;&#x64A; &#x627;&#x644;&#x645;&#x639;&#x627;&#x645;&#x644;&#x629;</div>
        <div class="islamic-transliteration">&ldquo;As-sidq fil-mu&lsquo;amala&rdquo; &mdash; Truthfulness in dealings</div>
        <div class="islamic-practice"><strong>In practice:</strong> We never misrepresent capabilities, create false urgency, or use deceptive tactics.</div>
      </div>
    </div>

    <!-- Outcomes -->
    <div class="sharia-outcomes reveal">
      <div class="sharia-outcome"><span class="sharia-check" aria-hidden="true">&#10003;</span><span>Your reputation is protected &mdash; no tactics you&rsquo;d be embarrassed by.</span></div>
      <div class="sharia-outcome"><span class="sharia-check" aria-hidden="true">&#10003;</span><span>Sustainable, long-term relationships built on honesty and consent.</span></div>
      <div class="sharia-outcome"><span class="sharia-check" aria-hidden="true">&#10003;</span><span>Full visibility into every message sent on your behalf.</span></div>
    </div>

    <!-- Fit gate -->
    <div class="fit-gate reveal">
      <p><strong>Yes if:</strong> you want long-term deliverability, brand safety, and outbound you can be proud of.</p>
      <p><strong>No if:</strong> you want shortcuts, mass blasting, or pressure tactics.</p>
    </div>
    <a href="book.html" class="btn-submit reveal" style="display:inline-flex;align-items:center;justify-content:space-between;max-width:360px;text-decoration:none;">
      <span>Book a call</span>
      <span class="arr" aria-hidden="true">&rarr;</span>
    </a>

  </div>
</section>

<!-- ─── OFFER ──────────────────────────── -->
<section class="section" id="sprint" aria-labelledby="offer-h">
```

- [ ] **Step 4: Verify the section was inserted**

Run:
```bash
grep -n "id=\"sharia\"\|03 &mdash; Ethics\|pillar-grid\|arabic-text" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -10
```
Expected: all four patterns found, `id="sharia"` near the top of results.

- [ ] **Step 5: Open in browser and verify visually**

Run:
```bash
open /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Scroll past Section 02. You should see:
- Section label "03 — Ethics & Transparency" on alternate paper background
- The four pillar cards in a 2×2 grid
- Three Arabic text blocks with transliteration
- Three outcome checkmarks
- Fit gate + Book a call button

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add Sharia-aligned ethics section with pillars, Islamic principles, and outcomes"
```

---

## Task 4: Domain Health Drawer CSS + HTML

**Files:**
- Modify: `index.html` — `<style>` block (add CSS) + before `</body>` (add HTML)

- [ ] **Step 1: Add drawer CSS**

Find the closing `</style>` tag again (same location as Task 2 Step 1). Insert the following CSS immediately **before** `</style>`:

```css
/* ══════════════════════════════════════════
   DOMAIN HEALTH CHECK DRAWER
══════════════════════════════════════════ */
.health-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(12,11,9,0.4);
  z-index: 98;
  cursor: pointer;
}
.health-backdrop.visible { display: block; }

.health-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background: var(--paper);
  border-top: 2px solid var(--ink);
  max-height: 80vh;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
  -webkit-overflow-scrolling: touch;
}
.health-drawer.visible { transform: translateY(0); }

.hd-inner {
  max-width: 780px;
  margin: 0 auto;
  padding: 28px 32px 36px;
}
@media (max-width: 600px) { .hd-inner { padding: 20px 20px 28px; } }

.hd-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--rule);
}
.hd-domain-label {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--mid);
  letter-spacing: 0.02em;
}
.hd-close {
  font-size: 12px;
  color: var(--light);
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px 0;
  font-family: var(--body);
  letter-spacing: 0.04em;
  transition: color 0.15s;
}
.hd-close:hover { color: var(--ink); }

.hd-score-bar {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 18px 20px;
  background: var(--paper-2);
  border: 1px solid var(--rule);
  margin-bottom: 16px;
}
.hd-score-num {
  font-family: var(--serif);
  font-size: 40px;
  font-weight: 300;
  letter-spacing: -0.03em;
  color: var(--ink);
  line-height: 1;
  flex-shrink: 0;
}
.hd-commentary {
  font-size: 15px;
  font-style: italic;
  color: var(--mid);
  line-height: 1.55;
  padding-top: 4px;
}

.hd-checks {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 20px;
  border: 1px solid var(--rule);
}
.hd-check {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--rule-2);
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--mid);
}
.hd-check:last-child { border-bottom: none; }
.hd-check-glyph {
  font-size: 13px;
  flex-shrink: 0;
  margin-top: 1px;
  width: 16px;
  text-align: center;
}
.hd-check--pass .hd-check-glyph { color: var(--green); }
.hd-check--warn .hd-check-glyph { color: #B8860B; }
.hd-check--fail .hd-check-glyph { color: var(--red-ed); }
.hd-check--unknown .hd-check-glyph { color: var(--light); }
.hd-check-label { font-weight: 600; color: var(--ink-2); }

.hd-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: var(--body);
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  border: 1.5px solid var(--ink);
  padding: 16px 22px;
  text-decoration: none;
  transition: background 0.18s, border-color 0.18s;
  box-sizing: border-box;
}
.hd-cta:hover { background: var(--green); border-color: var(--green); color: var(--paper); text-decoration: none; }
.hd-cta-arr { font-size: 18px; font-weight: 300; }

/* Loading state for hero button */
.btn-score.checking { opacity: 0.6; cursor: not-allowed; }
```

- [ ] **Step 2: Add drawer HTML before `</body>`**

Find this exact string at the end of `index.html`:
```html
</body>
</html>
```

Replace with:
```html
<!-- ─── DOMAIN HEALTH DRAWER ──────────── -->
<div class="health-backdrop" id="healthBackdrop" role="presentation"></div>
<div class="health-drawer" id="healthDrawer" role="dialog" aria-modal="true" aria-labelledby="hdDomainLabel">
  <div class="hd-inner">
    <div class="hd-header">
      <span class="hd-domain-label" id="hdDomainLabel"></span>
      <button class="hd-close" id="hdClose" aria-label="Close health report">&#10005; close</button>
    </div>
    <div class="hd-score-bar">
      <div class="hd-score-num" id="hdScore"></div>
      <div class="hd-commentary" id="hdCommentary"></div>
    </div>
    <div class="hd-checks" id="hdChecks"></div>
    <a class="hd-cta" id="hdCta" href="book.html">
      <span>Book a call &mdash; we&rsquo;ll fix this in the sprint</span>
      <span class="hd-cta-arr" aria-hidden="true">&rarr;</span>
    </a>
  </div>
</div>

</body>
</html>
```

- [ ] **Step 3: Verify drawer HTML**

Run:
```bash
grep -c "healthDrawer\|healthBackdrop\|hd-score-bar\|hd-checks\|hdCta" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: `5`

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add domain health drawer CSS and HTML structure"
```

---

## Task 5: Domain Health Check JavaScript

**Files:**
- Modify: `index.html` — replace the `if(form){...}` healthForm handler

- [ ] **Step 1: Find the existing handler**

Run:
```bash
grep -n "healthForm\|hero_score\|book\.html\?domain" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -10
```

This will show the current form handler. Read ±10 lines around it to get the exact surrounding text.

- [ ] **Step 2: Replace the form handler**

Find this block (the one that was set in a previous session):
```js
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var raw = (document.getElementById('domain').value || '').trim();
      var domain = raw.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
      if (!domain) {
        document.getElementById('domain').focus();
        return;
      }
      var dest = 'book.html?domain=' + encodeURIComponent(domain) + '&source=hero_score';
      window.location.href = dest;
    });
  }
```

Replace it with the complete block below. This is a long replacement — paste the entire block:

```js
  /* ── DOMAIN HEALTH CHECK ── */
  var CF_DNS = 'https://cloudflare-dns.com/dns-query';
  var DNS_H  = { 'Accept': 'application/dns-json' };

  function dnsFetch(name, type) {
    return fetch(CF_DNS + '?name=' + encodeURIComponent(name) + '&type=' + type, { headers: DNS_H })
      .then(function(r){ return r.json(); });
  }

  async function checkDomain(domain) {
    // Run SPF, DMARC, MX in parallel; DKIM across 5 selectors in parallel
    var dkimSelectors = ['google', 'mail', 'default', 'selector1', 'selector2'];
    var allChecks = await Promise.allSettled([
      dnsFetch(domain, 'TXT'),                    // index 0: SPF
      dnsFetch('_dmarc.' + domain, 'TXT'),        // index 1: DMARC
      dnsFetch(domain, 'MX'),                     // index 2: MX
    ].concat(dkimSelectors.map(function(sel){     // index 3-7: DKIM selectors
      return dnsFetch(sel + '._domainkey.' + domain, 'TXT');
    })));

    // SPF
    var spf = { found: false, value: '' };
    if (allChecks[0].status === 'fulfilled') {
      var ans = (allChecks[0].value.Answer || []);
      var rec = ans.find(function(a){ return a.data && a.data.includes('v=spf1'); });
      if (rec) { spf.found = true; spf.value = rec.data.replace(/"/g, ''); }
    }

    // DMARC
    var dmarc = { found: false, policy: 'none', value: '' };
    if (allChecks[1].status === 'fulfilled') {
      var dans = (allChecks[1].value.Answer || []);
      var drec = dans.find(function(a){ return a.data && a.data.includes('v=DMARC1'); });
      if (drec) {
        dmarc.found = true;
        dmarc.value = drec.data.replace(/"/g, '');
        var pm = dmarc.value.match(/p=([a-z]+)/i);
        dmarc.policy = pm ? pm[1].toLowerCase() : 'none';
      }
    }

    // MX
    var mx = { found: false, count: 0 };
    if (allChecks[2].status === 'fulfilled') {
      var mans = (allChecks[2].value.Answer || []);
      if (mans.length > 0) { mx.found = true; mx.count = mans.length; }
    }

    // DKIM — any selector found?
    var dkimFound = allChecks.slice(3).some(function(r){
      return r.status === 'fulfilled' && r.value.Answer && r.value.Answer.length > 0;
    });

    // Score
    var score = 0;
    if (spf.found) score += 3;
    if (dmarc.found) {
      if (dmarc.policy === 'reject')       score += 3;
      else if (dmarc.policy === 'quarantine') score += 2;
      else                                 score += 1; // p=none
    }
    if (mx.found)   score += 2;
    if (dkimFound)  score += 2;

    return { spf: spf, dmarc: dmarc, mx: mx, dkim: { found: dkimFound }, score: score };
  }

  function getCommentary(score, r) {
    if (score >= 9) return 'Excellent infrastructure. Your domain is inbox-ready.';
    if (score >= 7) {
      if (!r.dkim.found) return 'Close to inbox-ready. Add a DKIM record to complete your authentication stack.';
      if (r.dmarc.policy === 'none') return 'Close to inbox-ready. Upgrade your DMARC policy from none to quarantine to close the gap.';
      return 'Close to inbox-ready. One configuration gap to address.';
    }
    if (score >= 5) {
      var gaps = [];
      if (!r.spf.found) gaps.push('SPF');
      if (!r.dmarc.found || r.dmarc.policy === 'none') gaps.push('DMARC');
      if (!r.dkim.found) gaps.push('DKIM');
      return 'Moderate risk. ' + gaps.join(' and ') + ' need attention before any cold sending.';
    }
    return 'High risk. Missing fundamentals — emails are likely landing in spam.';
  }

  function makeCheckRow(glyph, label, text, status) {
    return '<div class="hd-check hd-check--' + status + '">' +
      '<span class="hd-check-glyph" aria-hidden="true">' + glyph + '</span>' +
      '<div><span class="hd-check-label">' + label + '</span> — ' + text + '</div>' +
      '</div>';
  }

  function showHealthDrawer(domain, results) {
    var score     = results ? results.score : null;
    var scoreText = score !== null ? score + '/10' : '—/10';
    var commentary = results
      ? getCommentary(score, results)
      : 'Could not reach DNS — check your connection and try again.';

    document.getElementById('hdDomainLabel').textContent = domain + ' — Health Report';
    document.getElementById('hdScore').textContent       = scoreText;
    document.getElementById('hdCommentary').textContent  = commentary;

    var checks = '';
    if (results) {
      checks += makeCheckRow(
        results.spf.found ? '✓' : '✗', 'SPF',
        results.spf.found ? (results.spf.value || 'Record found') : 'No SPF record found',
        results.spf.found ? 'pass' : 'fail'
      );
      var dmarcGlyph  = results.dmarc.found ? (results.dmarc.policy === 'none' ? '⚠' : '✓') : '✗';
      var dmarcStatus = results.dmarc.found ? (results.dmarc.policy === 'none' ? 'warn' : 'pass') : 'fail';
      var dmarcText   = results.dmarc.found
        ? 'p=' + results.dmarc.policy + (results.dmarc.policy === 'none' ? ' — upgrade to quarantine or reject' : '')
        : 'No DMARC record found';
      checks += makeCheckRow(dmarcGlyph, 'DMARC', dmarcText, dmarcStatus);
      checks += makeCheckRow(
        results.mx.found ? '✓' : '✗', 'MX',
        results.mx.found ? results.mx.count + ' record' + (results.mx.count !== 1 ? 's' : '') + ' found' : 'No MX records found',
        results.mx.found ? 'pass' : 'fail'
      );
      checks += makeCheckRow(
        results.dkim.found ? '✓' : '—', 'DKIM',
        results.dkim.found ? 'Selector detected' : 'Selector not found — check manually',
        results.dkim.found ? 'pass' : 'unknown'
      );
    }
    document.getElementById('hdChecks').innerHTML = checks;

    var ctaHref = 'book.html?domain=' + encodeURIComponent(domain) +
      (score !== null ? '&score=' + score : '') + '&source=health_drawer';
    document.getElementById('hdCta').href = ctaHref;

    document.getElementById('healthBackdrop').classList.add('visible');
    document.getElementById('healthDrawer').classList.add('visible');
    document.getElementById('healthDrawer').scrollTop = 0;
  }

  function closeHealthDrawer() {
    document.getElementById('healthBackdrop').classList.remove('visible');
    document.getElementById('healthDrawer').classList.remove('visible');
  }

  document.getElementById('hdClose').addEventListener('click', closeHealthDrawer);
  document.getElementById('healthBackdrop').addEventListener('click', closeHealthDrawer);

  if(form){
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var raw    = (document.getElementById('domain').value || '').trim();
      var domain = raw.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
      if (!domain) { document.getElementById('domain').focus(); return; }

      var btn = form.querySelector('.btn-score');
      var inp = document.getElementById('domain');
      btn.textContent = 'Checking…';
      btn.classList.add('checking');
      btn.disabled = true;
      inp.disabled = true;

      try {
        var results = await Promise.race([
          checkDomain(domain),
          new Promise(function(_, rej){ setTimeout(function(){ rej(new Error('timeout')); }, 8000); })
        ]);
        showHealthDrawer(domain, results);
      } catch(err) {
        showHealthDrawer(domain, null);
      } finally {
        btn.textContent = 'Score my domain →';
        btn.classList.remove('checking');
        btn.disabled = false;
        inp.disabled = false;
      }
    });
  }
```

- [ ] **Step 3: Verify the JS is in place**

Run:
```bash
grep -c "checkDomain\|cloudflare-dns\|showHealthDrawer\|closeHealthDrawer" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: `4`

Run:
```bash
grep -c "window.location.href = 'book.html'" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: `2` (finalCtaBtn and reserveBtn still use it — the form handler no longer does)

- [ ] **Step 4: Test end-to-end in browser**

```bash
open /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```

Wait for the kinetic animation to finish, then:
1. Type `google.com` in the domain field and click "Score my domain →"
2. Button should show "Checking…" for ~2 seconds
3. Drawer should slide up from the bottom with a score, commentary, and 4 check rows
4. Click the backdrop — drawer should close
5. Type `baddomain12345xyz.com` — should still show drawer (with failures), not crash
6. Click "Book a call" in the drawer — should navigate to `book.html?domain=...&score=...&source=health_drawer`

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: wire domain health check — live DNS via Cloudflare DoH, narrative results drawer"
```

---

## Task 6: Push to GitHub

- [ ] **Step 1: Verify all commits are clean**

```bash
git status
git log --oneline -8
```
Expected: clean working tree. 5 new commits visible above the last push (`ae620c4`).

- [ ] **Step 2: Push**

```bash
git push origin main
```
Expected: `main -> main` with all 5 commits.

---

## Self-Review

### Spec coverage

| Requirement | Task |
|-------------|------|
| Hero overline → "Sharia-Aligned Outbound Infrastructure · AU/NZ" | Task 1, Step 1 |
| Header nav "Sharia-aligned" anchor link → `#sharia` | Task 1, Step 3 |
| Section numbers 03→04, 04→05, 05→06 | Task 3, Step 1 |
| New §03 "Ethics & Transparency" section inserted between §02 and §04 | Task 3, Step 3 |
| Four pillars in 2×2 grid with practice + benefit | Task 3, Step 3 |
| Three Islamic principles with Arabic text (RTL), transliteration, meaning, practice | Task 3, Step 3 |
| Three outcome checkmarks | Task 3, Step 3 |
| Fit gate (Yes if / No if) + book.html CTA | Task 3, Step 3 |
| Drawer backdrop (fixed overlay, click to close) | Task 4, Step 1+2 |
| Drawer CSS: slide-up animation, max-height, border-top | Task 4, Step 1 |
| Drawer HTML: domain label, close button, score bar, checks, CTA | Task 4, Step 2 |
| SPF check via Cloudflare DoH (3 pts) | Task 5, Step 2 |
| DMARC check with p= policy extraction (1–3 pts) | Task 5, Step 2 |
| MX check (2 pts) | Task 5, Step 2 |
| DKIM check across 5 selectors in parallel (2 pts) | Task 5, Step 2 |
| Score 0–10 with 4 editorial commentary bands | Task 5, Step 2 |
| 8-second timeout → fallback drawer with error message | Task 5, Step 2 |
| Loading state on button during check | Task 5, Step 2 |
| CTA in drawer links to book.html?domain=...&score=...&source=health_drawer | Task 5, Step 2 |
| Push to GitHub | Task 6 |

### No placeholders — all code is complete.

### Naming consistency
- `checkDomain()` defined in Task 5 Step 2 — used in same block
- `showHealthDrawer()` defined in Task 5 Step 2 — called in same block
- `closeHealthDrawer()` defined and wired to `hdClose` + backdrop in same block
- `makeCheckRow()` defined in Task 5 Step 2 — called 4 times in `showHealthDrawer`
- `healthBackdrop` / `healthDrawer` / `hdClose` / `hdCta` — all IDs defined in Task 4 Step 2, all referenced in Task 5 Step 2
- `.hd-check--pass/warn/fail/unknown` — CSS defined in Task 4 Step 1, strings passed from `makeCheckRow()` in Task 5 Step 2
