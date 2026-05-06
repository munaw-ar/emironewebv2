# CTA, Forms & Research Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire all interactive elements in `emironewebv2` (hero domain form, CTA buttons, reserve button) to real destinations, and add two new pages — a booking flow (`book.html`) and a research/experiment logs page (`research.html`) — ported from `emir-one-design`'s React app to vanilla HTML/CSS/JS.

**Architecture:** Pure HTML/CSS/JS — no bundler, no framework. Supabase is called via raw `fetch()` against the REST and Edge Function APIs (same Supabase project as `emir-one-design`). Cal.com is embedded as an `<iframe>`. The booking flow is a standalone `book.html`; research is a standalone `research.html`; `index.html` gets its JS handlers updated and a newsletter subscribe widget added to the footer.

**Tech Stack:** HTML/CSS/JS (ES2020+), Supabase REST API (`/rest/v1/`) + Edge Functions (`/functions/v1/`), Cal.com iframe embed (`https://cal.com/munawar-emirone/30min`)

---

## Prerequisites (manual — do once before starting tasks)

### ⚠️ Get Supabase Anon Key

The Supabase project ID is `yzogunnnrfkajmbkndfn`. The anon (public) key is not in the repo.

1. Go to: **https://supabase.com/dashboard/project/yzogunnnrfkajmbkndfn/settings/api**
2. Copy the **`anon` `public`** key (starts with `eyJ...`)
3. Replace every instance of `REPLACE_WITH_ANON_KEY` in the files below with that key.

The Supabase URL is always: `https://yzogunnnrfkajmbkndfn.supabase.co`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Modify | Wire hero form, finalCtaBtn, reserveBtn; add newsletter widget to footer; add Research nav link |
| `book.html` | Create | Two-step booking flow: pre-qual form → Cal.com iframe |
| `research.html` | Create | Experiment logs from Supabase, editorial style, industry filter, subscribe widget |

---

## Task 1: Create `book.html` — Booking Page

**Files:**
- Create: `book.html`

The booking page is a port of `emir-one-design`'s `BookPage.tsx`. Two steps:
1. Pre-qual form collects: email (required), name (required), company, website, phone, goal
2. On submit → calls `capture-lead` edge function → shows Cal.com iframe

The domain passed via `?domain=` URL param is shown as context in the form.

- [ ] **Step 1: Create the HTML skeleton**

Create `/Users/munawaranjum/Desktop/emironewebv2.0/book.html` with this full content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Book a Call — Emir One</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FAF8F3'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-size='13' font-weight='700' text-anchor='middle' fill='%230C0B09'%3EE1%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --paper:  #FAF8F3;
  --paper-2:#F3F0E8;
  --ink:    #0C0B09;
  --ink-2:  #2A2820;
  --mid:    #5C5648;
  --light:  #9A9080;
  --rule:   #D8D0C0;
  --green:  #0D5C38;
  --green-h:#0A4A2D;
  --serif:  "Fraunces", Georgia, serif;
  --body:   "Inter Tight", -apple-system, sans-serif;
  --ease:   cubic-bezier(0.22,1,0.36,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:var(--body);font-size:16px;line-height:1.65;color:var(--ink);background:var(--paper);-webkit-font-smoothing:antialiased;}
a{color:var(--green);text-decoration:underline;text-underline-offset:3px;}
button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid var(--green);outline-offset:3px;}

/* Header */
.site-header{border-bottom:1px solid var(--rule);background:var(--paper);}
.hdr{max-width:880px;margin:0 auto;padding:0 32px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.wordmark{font-family:var(--serif);font-size:18px;font-weight:400;letter-spacing:-0.02em;color:var(--ink);text-decoration:none;display:inline-flex;align-items:center;gap:14px;}
.wordmark::before{content:"E1";display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:1.5px solid var(--ink);font-family:var(--serif);font-size:11px;font-weight:600;letter-spacing:0.05em;color:var(--ink);}
.wordmark:hover{text-decoration:none;}
.back-link{font-size:12.5px;color:var(--mid);text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:color 0.15s;}
.back-link:hover{color:var(--ink);}

/* Main layout */
main{max-width:880px;margin:0 auto;padding:64px 32px 80px;}
@media(max-width:600px){main{padding:40px 24px 60px;}}

.page-overline{font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid);margin-bottom:20px;}
.page-title{font-family:var(--serif);font-size:clamp(26px,4vw,38px);font-weight:300;letter-spacing:-0.025em;line-height:1.1;color:var(--ink);margin-bottom:16px;}
.page-desc{font-size:15.5px;line-height:1.7;color:var(--mid);max-width:520px;margin-bottom:40px;}
.page-desc ul{margin-top:10px;padding-left:18px;}
.page-desc li{margin-bottom:6px;}

/* Domain context badge */
.domain-ctx{display:inline-flex;align-items:center;gap:8px;font-family:"JetBrains Mono",Consolas,monospace;font-size:12px;color:var(--mid);background:var(--paper-2);border:1px solid var(--rule);padding:6px 12px;margin-bottom:36px;}
.domain-ctx::before{content:"⊙";color:var(--green);}

/* Form */
.form-section{border-top:1px solid var(--rule);padding-top:36px;}
.form-grid{display:flex;flex-direction:column;gap:14px;margin-bottom:24px;}
.field-group{display:flex;flex-direction:column;gap:5px;}
.field-label{font-size:11.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--mid);}
.field-input{font-family:var(--body);font-size:15.5px;color:var(--ink);background:transparent;border:none;border-bottom:1.5px solid var(--rule);padding:10px 0;width:100%;transition:border-color 0.2s;}
.field-input::placeholder{color:var(--light);}
.field-input:focus{outline:none;border-bottom-color:var(--ink);}
.field-input.required-field{border-bottom-color:var(--ink);}
textarea.field-input{resize:vertical;min-height:72px;border:1.5px solid var(--rule);padding:10px 12px;background:var(--paper-2);}
textarea.field-input:focus{border-color:var(--ink);}

.btn-continue{display:inline-flex;align-items:center;justify-content:space-between;width:100%;font-family:var(--body);font-size:14px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:var(--paper);background:var(--ink);border:1.5px solid var(--ink);padding:16px 22px;cursor:pointer;transition:background 0.18s,opacity 0.18s;margin-top:8px;}
.btn-continue:hover{background:var(--green);border-color:var(--green);}
.btn-continue:disabled{opacity:0.4;cursor:not-allowed;}
.btn-continue .arr{font-size:18px;font-weight:300;}

.form-trust{font-size:12px;color:var(--light);font-style:italic;margin-top:12px;}

/* Status messages */
.status-msg{font-size:13.5px;padding:12px 16px;border:1px solid var(--rule);background:var(--paper-2);color:var(--mid);margin-top:12px;display:none;}
.status-msg.visible{display:block;}
.status-msg.error{border-color:#EFC8C0;background:#FBE9E7;color:#7A1F10;}

/* Cal.com calendar embed */
.cal-section{display:none;}
.cal-section.visible{display:block;}
.cal-label{font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid);margin-bottom:16px;}
.cal-frame{width:100%;min-height:640px;border:1px solid var(--rule);background:var(--paper-2);}
.cal-fallback{font-size:13px;color:var(--light);font-style:italic;margin-top:10px;text-align:center;}
.cal-fallback a{color:var(--green);}

/* Loading spinner */
.spinner{display:none;width:16px;height:16px;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;margin-right:8px;}
@keyframes spin{to{transform:rotate(360deg);}}
.btn-continue.loading .spinner{display:inline-block;}
.btn-continue.loading .btn-text{opacity:0.7;}
</style>
</head>
<body>

<header class="site-header">
  <div class="hdr">
    <a href="index.html" class="wordmark">Emir One</a>
    <a href="index.html" class="back-link">← Back</a>
  </div>
</header>

<main>
  <div class="page-overline">Private Strategy Call</div>
  <h1 class="page-title">Revenue Sprint Consultation</h1>
  <div class="page-desc">
    <p>For founders and operators building predictable outbound. On this call we will:</p>
    <ul>
      <li>Diagnose your current deliverability and pipeline</li>
      <li>Identify the infrastructure gaps costing you replies</li>
      <li>Outline a sprint execution plan specific to your domain</li>
    </ul>
    <p style="margin-top:12px;">Please complete the details below so we can prepare properly.</p>
  </div>

  <!-- Domain context (shown if ?domain= param present) -->
  <div class="domain-ctx" id="domainCtx" style="display:none;"></div>

  <!-- Step 1: Pre-qual form -->
  <div class="form-section" id="formSection">
    <div class="form-grid">
      <div class="field-group">
        <label class="field-label" for="fEmail">Work Email <span style="color:var(--red-ed,#7A1F10)">*</span></label>
        <input class="field-input required-field" type="email" id="fEmail" name="email" placeholder="you@yourfirm.com" autocomplete="email" required maxlength="255">
      </div>
      <div class="field-group">
        <label class="field-label" for="fName">Full Name <span style="color:var(--red-ed,#7A1F10)">*</span></label>
        <input class="field-input required-field" type="text" id="fName" name="fullName" placeholder="Your name" autocomplete="name" required maxlength="200">
      </div>
      <div class="field-group">
        <label class="field-label" for="fCompany">Company</label>
        <input class="field-input" type="text" id="fCompany" name="company" placeholder="Company name" autocomplete="organization" maxlength="200">
      </div>
      <div class="field-group">
        <label class="field-label" for="fWebsite">Website</label>
        <input class="field-input" type="text" id="fWebsite" name="website" placeholder="yourfirm.com.au" autocomplete="url" maxlength="500">
      </div>
      <div class="field-group">
        <label class="field-label" for="fPhone">Best Phone</label>
        <input class="field-input" type="tel" id="fPhone" name="phone" placeholder="+61 4xx xxx xxx" autocomplete="tel" maxlength="30">
      </div>
      <div class="field-group">
        <label class="field-label" for="fGoal">Primary Revenue Goal (Next 90 Days)</label>
        <textarea class="field-input" id="fGoal" name="goal" rows="3" placeholder="e.g. 20 qualified conversations/month, fix spam placement, launch outbound from scratch…" maxlength="500"></textarea>
      </div>
    </div>

    <button class="btn-continue" id="continueBtn" type="button" disabled>
      <span class="spinner" aria-hidden="true"></span>
      <span class="btn-text">Continue to Calendar</span>
      <span class="arr" aria-hidden="true">→</span>
    </button>
    <div class="status-msg" id="formStatus"></div>
    <p class="form-trust">No sales call until you want one. Just pick a time.</p>
  </div>

  <!-- Step 2: Cal.com embed -->
  <div class="cal-section" id="calSection">
    <div class="cal-label">Pick a time that works</div>
    <iframe class="cal-frame" id="calFrame" src="" allow="payment" title="Schedule a call" loading="lazy"></iframe>
    <p class="cal-fallback">Calendar not loading? <a id="calFallback" href="https://cal.com/munawar-emirone/30min" target="_blank" rel="noopener noreferrer">Open scheduling page</a></p>
  </div>
</main>

<script>
(function () {
  const SUPABASE_URL = 'https://yzogunnnrfkajmbkndfn.supabase.co';
  const SUPABASE_ANON_KEY = 'REPLACE_WITH_ANON_KEY';
  const CAL_URL = 'https://cal.com/munawar-emirone/30min';

  // --- Read URL params ---
  const params = new URLSearchParams(location.search);
  const prefillEmail  = params.get('email') || localStorage.getItem('booking_email') || '';
  const prefillDomain = params.get('domain') || '';

  // Show domain context
  if (prefillDomain) {
    const ctx = document.getElementById('domainCtx');
    ctx.textContent = 'Audit requested for: ' + prefillDomain;
    ctx.style.display = 'inline-flex';
  }

  // Pre-fill email
  const emailInput = document.getElementById('fEmail');
  if (prefillEmail) emailInput.value = prefillEmail;

  // --- Enable/disable continue button ---
  const nameInput = document.getElementById('fName');
  const continueBtn = document.getElementById('continueBtn');
  const formStatus = document.getElementById('formStatus');

  function checkReady() {
    continueBtn.disabled = !(emailInput.value.trim() && nameInput.value.trim());
  }
  emailInput.addEventListener('input', checkReady);
  nameInput.addEventListener('input', checkReady);
  checkReady();

  // --- Submit: capture lead then show calendar ---
  let submitted = false;
  continueBtn.addEventListener('click', async function () {
    const email = emailInput.value.trim();
    const name  = nameInput.value.trim();
    if (!email || !name) return;

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', true);
      return;
    }

    if (submitted) { showCalendar(email, name); return; }

    continueBtn.classList.add('loading');
    continueBtn.disabled = true;
    formStatus.classList.remove('visible', 'error');

    const payload = {
      email,
      fullName:    name,
      companyName: document.getElementById('fCompany').value.trim(),
      website:     document.getElementById('fWebsite').value.trim() || prefillDomain,
      phone:       document.getElementById('fPhone').value.trim(),
      goal:        document.getElementById('fGoal').value.trim(),
    };

    try {
      await fetch(SUPABASE_URL + '/functions/v1/capture-lead', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
        body:    JSON.stringify(payload),
      });
    } catch (e) {
      // Non-blocking: proceed to calendar even if capture fails
      console.warn('Lead capture failed:', e);
    }

    submitted = true;
    localStorage.setItem('booking_email', email);
    showCalendar(email, name, payload);
  });

  function showStatus(msg, isError) {
    formStatus.textContent = msg;
    formStatus.className = 'status-msg visible' + (isError ? ' error' : '');
  }

  function showCalendar(email, name, payload) {
    continueBtn.classList.remove('loading');

    // Build Cal.com URL with pre-fill
    const cp = new URLSearchParams({
      embed:  'true',
      layout: 'month_view',
      name:   name,
      email:  email,
    });
    const notes = [
      payload && payload.companyName && 'Company: ' + payload.companyName,
      payload && payload.website     && 'Website: ' + payload.website,
      payload && payload.phone       && 'Phone: '   + payload.phone,
      payload && payload.goal        && 'Goal: '    + payload.goal,
    ].filter(Boolean).join(' | ');
    if (notes) cp.set('notes', notes);

    const calSrc = CAL_URL + '?' + cp.toString();
    document.getElementById('calFrame').src = calSrc;
    document.getElementById('calFallback').href = CAL_URL + '?email=' + encodeURIComponent(email);

    document.getElementById('formSection').style.display = 'none';
    const calSection = document.getElementById('calSection');
    calSection.classList.add('visible');
    calSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify book.html opens and form validation works**

Run: `open /Users/munawaranjum/Desktop/emironewebv2.0/book.html`

Check:
- Continue button is disabled until email + name are filled
- Filling both enables the button
- Clicking button with a bad email shows the error status message
- Clicking with valid email/name shows the Cal.com iframe (may show a 404 until anon key is replaced)

- [ ] **Step 3: Replace SUPABASE_ANON_KEY with the real key**

In `book.html`, replace `REPLACE_WITH_ANON_KEY` with the actual anon key from the Supabase dashboard. The key goes in the `SUPABASE_ANON_KEY` const in the `<script>` block.

- [ ] **Step 4: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add book.html
git commit -m "feat: add book.html — two-step Cal.com booking page with lead capture"
```

---

## Task 2: Wire the Hero Domain Form (`index.html`)

**Files:**
- Modify: `index.html` — JS handler for `#healthForm` (approx lines 2224–2232)

Currently the form shows `alert('Demo...')`. Replace with a redirect to `book.html?domain=...&source=hero_score`.

- [ ] **Step 1: Find the exact handler lines**

Run:
```bash
grep -n "healthForm\|Score my domain\|n8n webhook\|alert.*Demo" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```

Expected output shows the form submit handler with the `alert()` call, approximately:
```
2224:  if(form){
2225:    form.addEventListener('submit', function(e){
2226:      e.preventDefault();
2227:      var d=(document.getElementById('domain').value||'').trim();
2228:      alert('Demo — Emir One v3.0\nIn production this triggers ...');
2229:    });
2230:  }
```

- [ ] **Step 2: Replace the alert handler with redirect logic**

In `index.html`, replace the entire `if(form){ ... }` block (the one containing `alert('Demo — Emir One`) with:

```js
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var raw = (document.getElementById('domain').value || '').trim();
      // Strip protocol prefix so we pass a clean domain
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

- [ ] **Step 3: Verify in browser**

Run: `open /Users/munawaranjum/Desktop/emironewebv2.0/index.html`

Wait for the kinetic animation, then:
- Type `yourfirm.com.au` in the hero form and click "Score my domain →"
- Expected: navigates to `book.html?domain=yourfirm.com.au&source=hero_score`
- Check that `book.html` shows the domain context badge at the top

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: wire hero domain form to book.html with domain pre-fill"
```

---

## Task 3: Wire Final CTA Button and Reserve Button (`index.html`)

**Files:**
- Modify: `index.html` — JS handlers for `#finalCtaBtn` and `#reserveBtn` (approx lines 2234–2248)

Currently `finalCtaBtn` scrolls to the hero input and `reserveBtn` shows an alert. Both should navigate to `book.html`.

- [ ] **Step 1: Find the exact lines**

```bash
grep -n "finalCtaBtn\|reserveBtn\|scroll.*lenis\|alert.*Cal\.com" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```

- [ ] **Step 2: Replace finalCtaBtn handler**

Find this block in `index.html`:
```js
  document.getElementById('finalCtaBtn').addEventListener('click', function(){
    var inp = document.getElementById('domain');
    if (inp) {
      var l = window.__lenis;
      if (l) { l.scrollTo(inp, { offset: -window.innerHeight * 0.35, duration: 1.6 }); }
      else { inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      setTimeout(function(){ inp.focus({ preventScroll: true }); }, 1100);
    }
  });
```

Replace it with:
```js
  document.getElementById('finalCtaBtn').addEventListener('click', function(){
    window.location.href = 'book.html';
  });
```

- [ ] **Step 3: Replace reserveBtn handler**

Find this block:
```js
  document.getElementById('reserveBtn').addEventListener('click',function(){
    alert('Demo — Emir One v3.0\nIn production this opens the Cal.com 15-minute fit-call flow.');
  });
```

Replace it with:
```js
  document.getElementById('reserveBtn').addEventListener('click',function(){
    window.location.href = 'book.html';
  });
```

- [ ] **Step 4: Verify in browser**

- Reload `index.html`
- Scroll to bottom → click "See If My Domain Is Ready" → should navigate to `book.html`
- Find the Offer section → click the Reserve/Apply button → should navigate to `book.html`

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: wire finalCtaBtn and reserveBtn to book.html"
```

---

## Task 4: Add Newsletter Subscribe Widget to Footer (`index.html`)

**Files:**
- Modify: `index.html` — footer HTML and JS (find footer section via `grep -n "site-footer" index.html`)

The widget appears below the footer links, before the copyright line.

- [ ] **Step 1: Find the footer in index.html**

```bash
grep -n "site-footer\|footer-row\|footer-copy\|footer-legal" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -20
```

Read the footer HTML block to understand its current structure.

- [ ] **Step 2: Add CSS for the subscribe widget**

In `index.html`, inside the `<style>` block, add before the closing `</style>` tag:

```css
/* ── NEWSLETTER WIDGET (footer) ── */
.subscribe-widget {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 28px;
  margin-top: 28px;
  max-width: 400px;
}
.sub-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--light);
  margin-bottom: 10px;
}
.sub-desc { font-size: 13px; color: var(--light); font-style: italic; margin-bottom: 16px; line-height: 1.5; }
.sub-row { display: flex; gap: 0; }
.sub-email {
  flex: 1;
  font-family: var(--body);
  font-size: 14px;
  color: var(--paper);
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-right: none;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;
}
.sub-email::placeholder { color: var(--light); }
.sub-email:focus { border-color: var(--green); }
.sub-btn {
  font-family: var(--body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--paper);
  padding: 10px 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}
.sub-btn:hover { background: var(--paper-2); }
.sub-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.sub-note { font-size: 11.5px; color: var(--light); font-style: italic; margin-top: 8px; opacity: 0.7; }
.sub-success { font-size: 13.5px; color: var(--green); font-style: italic; margin-top: 8px; display: none; }
.sub-success.visible { display: block; }
```

- [ ] **Step 3: Add subscribe widget HTML to the footer**

Inside the `<footer class="site-footer">` element, after the existing footer content (copyright line / footer-legal div), add:

```html
    <div class="subscribe-widget">
      <div class="sub-label">Research Updates</div>
      <p class="sub-desc">Field experiments, deliverability benchmarks, and quarterly reports. 4 emails a year, max.</p>
      <div class="sub-row">
        <input class="sub-email" type="email" id="subEmail" placeholder="your@email.com" maxlength="255" autocomplete="email">
        <button class="sub-btn" id="subBtn" type="button">Subscribe</button>
      </div>
      <p class="sub-note">No spam. Unsubscribe anytime.</p>
      <p class="sub-success" id="subSuccess">You're subscribed. Expect quarterly updates.</p>
    </div>
```

- [ ] **Step 4: Add subscribe JS handler**

In `index.html`, at the bottom of the inline `<script>` block (before the closing `</script>`), add:

```js
  // Newsletter subscribe
  (function(){
    var SUPABASE_URL = 'https://yzogunnnrfkajmbkndfn.supabase.co';
    var SUPABASE_ANON_KEY = 'REPLACE_WITH_ANON_KEY';
    var btn = document.getElementById('subBtn');
    var inp = document.getElementById('subEmail');
    var suc = document.getElementById('subSuccess');
    var lastAttempt = 0;

    if (!btn) return;

    btn.addEventListener('click', async function(){
      var email = (inp.value || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { inp.focus(); return; }

      var now = Date.now();
      if (now - lastAttempt < 5000) return;
      lastAttempt = now;

      btn.disabled = true;
      btn.textContent = '…';

      try {
        var res = await fetch(SUPABASE_URL + '/functions/v1/subscribe-newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
          body: JSON.stringify({ email: email, source: 'footer_widget' }),
        });
        if (res.ok || res.status === 200) {
          inp.style.display = 'none';
          btn.style.display = 'none';
          suc.classList.add('visible');
        } else {
          btn.disabled = false;
          btn.textContent = 'Try Again';
        }
      } catch(e) {
        btn.disabled = false;
        btn.textContent = 'Retry';
      }
    });
  })();
```

- [ ] **Step 5: Replace SUPABASE_ANON_KEY in the footer script**

Find both occurrences of `REPLACE_WITH_ANON_KEY` in `index.html` (there will be the one you just added for the subscribe widget) and replace with the actual anon key.

- [ ] **Step 6: Verify in browser**

Reload `index.html`, scroll to footer:
- Enter a test email and click Subscribe
- Expected: input and button hide, success message appears (after a moment while the edge function is called)
- If anon key is not set yet, the button shows "Try Again" — that's expected

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: add newsletter subscribe widget to footer"
```

---

## Task 5: Create `research.html` — Experiment Logs Page

**Files:**
- Create: `research.html`

Pulls from Supabase `experiment_logs` table via REST API (no SDK needed). Filters by industry. Editorial card style matching emironewebv2 aesthetic.

- [ ] **Step 1: Create research.html**

Create `/Users/munawaranjum/Desktop/emironewebv2.0/research.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Experiment Logs — Emir One</title>
<meta name="description" content="Real GTM experiments with real results. Documented deliverability tests from the field.">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FAF8F3'/%3E%3Ctext x='16' y='22' font-family='Georgia,serif' font-size='13' font-weight='700' text-anchor='middle' fill='%230C0B09'%3EE1%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root {
  --paper:  #FAF8F3;
  --paper-2:#F3F0E8;
  --ink:    #0C0B09;
  --ink-2:  #2A2820;
  --mid:    #5C5648;
  --light:  #9A9080;
  --rule:   #D8D0C0;
  --rule-2: #EAE4D8;
  --green:  #0D5C38;
  --green-h:#0A4A2D;
  --serif:  "Fraunces", Georgia, serif;
  --body:   "Inter Tight", -apple-system, sans-serif;
  --mono:   "JetBrains Mono", Consolas, monospace;
  --ease:   cubic-bezier(0.22,1,0.36,1);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:var(--body);font-size:16px;line-height:1.65;color:var(--ink);background:var(--paper);-webkit-font-smoothing:antialiased;}
a{color:var(--green);text-underline-offset:3px;}
button:focus-visible,input:focus-visible{outline:2px solid var(--green);outline-offset:3px;}

/* Header */
.site-header{position:sticky;top:0;z-index:50;background:rgba(250,248,243,0.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--rule);}
.hdr{max-width:1120px;margin:0 auto;padding:0 32px;height:62px;display:flex;align-items:center;justify-content:space-between;}
.wordmark{font-family:var(--serif);font-size:18px;font-weight:400;letter-spacing:-0.02em;color:var(--ink);text-decoration:none;display:inline-flex;align-items:center;gap:14px;}
.wordmark::before{content:"E1";display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:1.5px solid var(--ink);font-family:var(--serif);font-size:11px;font-weight:600;letter-spacing:0.05em;color:var(--ink);}
.wordmark:hover{text-decoration:none;}
.hdr-back{font-size:12.5px;color:var(--mid);text-decoration:none;}
.hdr-back:hover{color:var(--ink);}

/* Page layout */
.w{max-width:1120px;margin:0 auto;padding:0 32px;}
@media(max-width:600px){.w{padding:0 20px;}}

/* Page header */
.page-head{padding:72px 0 48px;border-bottom:1px solid var(--rule);}
.page-overline{font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:var(--mid);margin-bottom:20px;}
.page-title{font-family:var(--serif);font-size:clamp(36px,5vw,64px);font-weight:300;letter-spacing:-0.03em;line-height:1.04;color:var(--ink);margin-bottom:14px;}
.page-subtitle{font-size:17px;color:var(--mid);font-style:italic;line-height:1.6;max-width:560px;}

/* Filter bar */
.filter-bar{padding:20px 0;border-bottom:1px solid var(--rule);display:flex;align-items:center;gap:12px;}
.filter-label{font-size:11.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--light);}
.filter-select{appearance:none;font-family:var(--body);font-size:13.5px;color:var(--ink);background:var(--paper-2);border:1px solid var(--rule);padding:7px 32px 7px 12px;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235C5648' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;}
.filter-select:focus{outline:2px solid var(--green);outline-offset:2px;}

/* Loading / empty states */
.state-loading,.state-empty{padding:80px 0;text-align:center;color:var(--light);font-style:italic;font-size:15px;}
.spinner-ring{width:32px;height:32px;border:2px solid var(--rule);border-top-color:var(--mid);border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;}
@keyframes spin{to{transform:rotate(360deg);}}

/* Experiments list */
.experiments{padding:0;margin:0;}

/* Experiment card */
.exp-card{border-bottom:1px solid var(--rule);padding:48px 0;}
.exp-card:first-child{padding-top:40px;}
.exp-meta{display:flex;align-items:center;gap:12px;margin-bottom:18px;}
.exp-date{font-family:var(--mono);font-size:11.5px;color:var(--light);}
.exp-industry{font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--mid);background:var(--paper-2);border:1px solid var(--rule-2);padding:3px 8px;}
.exp-title{font-family:var(--serif);font-size:clamp(20px,2.5vw,28px);font-weight:400;letter-spacing:-0.015em;line-height:1.2;color:var(--ink);margin-bottom:28px;}

.exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--rule);}
@media(max-width:640px){.exp-grid{grid-template-columns:1fr;}}
.exp-field{padding:20px 24px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);}
.exp-field:nth-child(even){border-right:none;}
.exp-field:nth-last-child(-n+2){border-bottom:none;}
@media(max-width:640px){
  .exp-field{border-right:none;}
  .exp-field:nth-last-child(-n+2){border-bottom:1px solid var(--rule);}
  .exp-field:last-child{border-bottom:none;}
}
.exp-field-label{font-size:10.5px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--light);margin-bottom:8px;}
.exp-field-text{font-size:14.5px;line-height:1.65;color:var(--mid);}

/* Conclusion — full width, highlighted */
.exp-conclusion{border:1px solid var(--rule);border-top:none;padding:22px 24px;display:grid;grid-template-columns:100px 1fr;gap:20px;align-items:start;background:var(--paper-2);}
@media(max-width:640px){.exp-conclusion{grid-template-columns:1fr;gap:8px;}}
.exp-conclusion-label{font-size:10.5px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:var(--mid);padding-top:2px;}
.exp-conclusion-text{font-family:var(--serif);font-size:17px;font-weight:300;font-style:italic;color:var(--ink);line-height:1.5;}

/* Next test callout */
.exp-next{display:flex;align-items:flex-start;gap:10px;margin-top:18px;padding:14px 18px;border-left:2px solid var(--rule);font-size:13.5px;color:var(--mid);}
.exp-next-label{font-size:10.5px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;flex-shrink:0;padding-top:2px;color:var(--light);}

/* Subscribe widget */
.subscribe-section{border-top:1px solid var(--rule);background:var(--paper-2);padding:56px 0;}
.sub-inner{max-width:440px;}
.sub-heading{font-family:var(--serif);font-size:clamp(22px,3vw,30px);font-weight:300;letter-spacing:-0.015em;color:var(--ink);margin-bottom:10px;}
.sub-desc{font-size:15px;line-height:1.65;color:var(--mid);margin-bottom:24px;}
.sub-row{display:flex;gap:0;}
.sub-email{flex:1;font-family:var(--body);font-size:15px;color:var(--ink);background:transparent;border:1.5px solid var(--ink);border-right:none;padding:12px 16px;outline:none;transition:border-color 0.2s;}
.sub-email::placeholder{color:var(--light);}
.sub-email:focus{border-color:var(--green);}
.sub-btn{font-family:var(--body);font-size:12.5px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:var(--paper);background:var(--ink);border:1.5px solid var(--ink);padding:12px 20px;cursor:pointer;white-space:nowrap;transition:background 0.15s;}
.sub-btn:hover{background:var(--green);border-color:var(--green);}
.sub-btn:disabled{opacity:0.5;cursor:not-allowed;}
.sub-note{font-size:11.5px;color:var(--light);font-style:italic;margin-top:10px;}
.sub-success{font-size:14px;color:var(--green);font-style:italic;margin-top:12px;display:none;}
.sub-success.visible{display:block;}

/* Footer */
.site-footer{padding:32px;border-top:1px solid var(--rule);font-size:12.5px;color:var(--light);text-align:center;}
.site-footer a{color:var(--mid);}
</style>
</head>
<body>

<header class="site-header">
  <div class="hdr">
    <a href="index.html" class="wordmark">Emir One</a>
    <a href="index.html" class="hdr-back">← Back to main</a>
  </div>
</header>

<section class="page-head">
  <div class="w">
    <div class="page-overline">Field Intelligence · AU/NZ</div>
    <h1 class="page-title">Experiment Logs</h1>
    <p class="page-subtitle">Real tests. Real results. Real learning — including the ones that fail spectacularly.</p>
  </div>
</section>

<div class="filter-bar">
  <div class="w" style="display:flex;align-items:center;gap:12px;">
    <span class="filter-label">Filter</span>
    <select class="filter-select" id="industryFilter">
      <option value="all">All industries</option>
    </select>
  </div>
</div>

<main>
  <div class="w">
    <!-- Loading state -->
    <div class="state-loading" id="stateLoading">
      <div class="spinner-ring"></div>
      Fetching experiment logs…
    </div>

    <!-- Empty state -->
    <div class="state-empty" id="stateEmpty" style="display:none;">
      No experiment logs published yet. Check back soon.
    </div>

    <!-- Experiments list -->
    <div class="experiments" id="experimentsList"></div>
  </div>
</main>

<section class="subscribe-section">
  <div class="w">
    <div class="sub-inner">
      <h2 class="sub-heading">Get Research Updates</h2>
      <p class="sub-desc">New experiments and quarterly benchmarks delivered to your inbox. Four emails a year, maximum.</p>
      <div class="sub-row">
        <input class="sub-email" type="email" id="subEmail" placeholder="your@email.com" maxlength="255" autocomplete="email">
        <button class="sub-btn" id="subBtn" type="button">Subscribe</button>
      </div>
      <p class="sub-note">No spam. Unsubscribe anytime.</p>
      <p class="sub-success" id="subSuccess">You're subscribed. Quarterly updates incoming.</p>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="w">
    © 2026 Emir One. All rights reserved. &nbsp;·&nbsp; <a href="index.html">Home</a>
  </div>
</footer>

<script>
(function(){
  var SUPABASE_URL     = 'https://yzogunnnrfkajmbkndfn.supabase.co';
  var SUPABASE_ANON_KEY = 'REPLACE_WITH_ANON_KEY';

  var list         = document.getElementById('experimentsList');
  var stateLoading = document.getElementById('stateLoading');
  var stateEmpty   = document.getElementById('stateEmpty');
  var filterSelect = document.getElementById('industryFilter');
  var allExperiments = [];

  // ── Fetch experiments from Supabase REST API ──
  async function loadExperiments() {
    try {
      var res = await fetch(
        SUPABASE_URL + '/rest/v1/experiment_logs?is_published=eq.true&order=date_published.desc&select=*',
        { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY } }
      );
      if (!res.ok) throw new Error('HTTP ' + res.status);
      allExperiments = await res.json();
    } catch(e) {
      console.error('Failed to load experiments:', e);
      allExperiments = [];
    }
    stateLoading.style.display = 'none';
    buildIndustryFilter();
    render('all');
  }

  function buildIndustryFilter() {
    var industries = [...new Set(allExperiments.map(function(e){ return e.industry; }).filter(Boolean))];
    industries.forEach(function(ind){
      var opt = document.createElement('option');
      opt.value = ind;
      opt.textContent = ind;
      filterSelect.appendChild(opt);
    });
  }

  filterSelect.addEventListener('change', function(){ render(this.value); });

  function render(industryFilter) {
    var data = industryFilter === 'all'
      ? allExperiments
      : allExperiments.filter(function(e){ return e.industry === industryFilter; });

    list.innerHTML = '';

    if (data.length === 0) {
      stateEmpty.style.display = 'block';
      return;
    }
    stateEmpty.style.display = 'none';

    data.forEach(function(exp){ list.appendChild(buildCard(exp)); });
  }

  function buildCard(exp) {
    var card = document.createElement('article');
    card.className = 'exp-card';

    var dateStr = '';
    if (exp.date_published) {
      var d = new Date(exp.date_published);
      dateStr = d.toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    card.innerHTML =
      '<div class="exp-meta">' +
        (dateStr ? '<span class="exp-date">' + esc(dateStr) + '</span>' : '') +
        (exp.industry ? '<span class="exp-industry">' + esc(exp.industry) + '</span>' : '') +
      '</div>' +
      '<h2 class="exp-title">' + esc(exp.title || 'Untitled Experiment') + '</h2>' +
      '<div class="exp-grid">' +
        field('Hypothesis',    exp.hypothesis) +
        field('Test Setup',    exp.test_setup) +
        field('Results',       exp.results) +
        (exp.sample_size ? field('Sample Size', exp.sample_size) : field('&nbsp;', '')) +
      '</div>' +
      '<div class="exp-conclusion">' +
        '<div class="exp-conclusion-label">Conclusion</div>' +
        '<div class="exp-conclusion-text">' + esc(exp.conclusion || '') + '</div>' +
      '</div>' +
      (exp.next_test
        ? '<div class="exp-next"><span class="exp-next-label">Next&nbsp;Test</span><span>' + esc(exp.next_test) + '</span></div>'
        : '');

    return card;
  }

  function field(label, value) {
    return '<div class="exp-field"><div class="exp-field-label">' + label + '</div><div class="exp-field-text">' + esc(value || '—') + '</div></div>';
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ── Newsletter subscribe ──
  var subBtn = document.getElementById('subBtn');
  var subInp = document.getElementById('subEmail');
  var subSuc = document.getElementById('subSuccess');
  var lastAttempt = 0;

  subBtn.addEventListener('click', async function(){
    var email = (subInp.value || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { subInp.focus(); return; }
    var now = Date.now();
    if (now - lastAttempt < 5000) return;
    lastAttempt = now;
    subBtn.disabled = true;
    subBtn.textContent = '…';
    try {
      var res = await fetch(SUPABASE_URL + '/functions/v1/subscribe-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON_KEY },
        body: JSON.stringify({ email: email, source: 'research_page' }),
      });
      if (res.ok) {
        subInp.style.display = 'none';
        subBtn.style.display = 'none';
        subSuc.classList.add('visible');
      } else {
        subBtn.disabled = false;
        subBtn.textContent = 'Retry';
      }
    } catch(e) {
      subBtn.disabled = false;
      subBtn.textContent = 'Retry';
    }
  });

  // Start
  loadExperiments();
})();
</script>
</body>
</html>
```

- [ ] **Step 2: Replace SUPABASE_ANON_KEY in research.html**

In `research.html`, replace `REPLACE_WITH_ANON_KEY` with the actual anon key.

- [ ] **Step 3: Verify research.html in browser**

Run: `open /Users/munawaranjum/Desktop/emironewebv2.0/research.html`

Check:
- Spinner shows, then either: (a) experiment cards render if there's published data, or (b) empty state shows
- Industry filter dropdown populates with unique industries from the data
- Selecting an industry filters the cards
- Subscribe form: enter email, click Subscribe — success state shows after the edge function call

- [ ] **Step 4: Commit**

```bash
git add research.html
git commit -m "feat: add research.html — experiment logs from Supabase with subscribe widget"
```

---

## Task 6: Add Research Link to `index.html` Header

**Files:**
- Modify: `index.html` — header HTML (approx lines 1665–1710)

- [ ] **Step 1: Find the header HTML**

```bash
grep -n "hdr-right\|site-header\|live-dot\|Infrastructure live" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -10
```

Read lines around the result to see the existing `<div class="hdr-right">` content.

- [ ] **Step 2: Add Research link to the header**

Find the `<div class="hdr-right">` block. It currently contains the live dot and "Infrastructure live" text. Add a Research link before it:

Find:
```html
    <div class="hdr-right">
```

Replace with:
```html
    <div class="hdr-right">
      <a href="research.html" style="font-size:12.5px;color:var(--mid);text-decoration:none;margin-right:20px;transition:color 0.15s;" onmouseover="this.style.color='var(--ink)'" onmouseout="this.style.color='var(--mid)'">Research</a>
```

- [ ] **Step 3: Verify in browser**

Reload `index.html`. The header should show a "Research" link on the right that navigates to `research.html`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Research nav link to header"
```

---

## Task 7: Push All Changes to GitHub

- [ ] **Step 1: Verify all files are committed**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git status
git log --oneline -8
```

Expected: clean working tree, 6-7 new commits visible.

- [ ] **Step 2: Push**

```bash
git push origin main
```

Expected: `main -> main` with all new commits.

---

## Self-Review

### Spec coverage check

| Requirement | Task |
|-------------|------|
| CTA button wired (finalCtaBtn → book.html) | Task 3 |
| Reserve button wired (reserveBtn → book.html) | Task 3 |
| Hero domain form → book.html with domain param | Task 2 |
| Booking page with Cal.com embed | Task 1 |
| Lead capture on booking form submit | Task 1 (capture-lead edge function) |
| Research/experiment logs page | Task 5 |
| Industry filter on research | Task 5 |
| Newsletter subscribe (research page) | Task 5 |
| Newsletter subscribe (main site footer) | Task 4 |
| Research nav link | Task 6 |
| GitHub push | Task 7 |

### No placeholders — all code is complete in each task.

### Type/naming consistency
- `SUPABASE_ANON_KEY` appears in Task 1 (`book.html`), Task 4 (index.html footer script), Task 5 (`research.html`) — all same variable name, all require the same anon key value.
- Edge function paths: `/functions/v1/capture-lead`, `/functions/v1/subscribe-newsletter` — consistent with `supabase/config.toml` function names.
- Cal.com URL: `https://cal.com/munawar-emirone/30min` — consistent across Task 1.
