# Mobile Responsive & Buttery Smooth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make emironewebv2's `index.html` fully responsive on iPhone and iPad, and buttery smooth to interact with on touch devices.

**Architecture:** All new responsive CSS goes into 6 purpose-scoped files under `css/` (parallel-safe — each is a new independent file). HTML and JS changes to `index.html` are batched into three sequential tasks after the CSS files exist. No new dependencies — pure CSS and vanilla JS only.

**Tech Stack:** HTML/CSS/JS, CSS custom properties already defined in `:root` (`--paper`, `--ink`, `--green`, `--mid`, `--light`, `--rule`, `--rule-2`, `--ease`, `--serif`, `--body`, `--mono`)

---

## File Map

| File | Action | Parallel-safe? |
|------|--------|---------------|
| `css/mobile-layout.css` | Create | ✅ Yes — new file |
| `css/mobile-nav.css` | Create | ✅ Yes — new file |
| `css/mobile-hero.css` | Create | ✅ Yes — new file |
| `css/mobile-table.css` | Create | ✅ Yes — new file |
| `css/mobile-smooth.css` | Create | ✅ Yes — new file |
| `css/mobile-type.css` | Create | ✅ Yes — new file |
| `index.html` `<head>` | Modify — add 6 `<link>` tags | Sequential |
| `index.html` header + script | Modify — hamburger HTML + JS | Sequential |
| `index.html` module script | Modify — Lenis touch guard | Sequential |

**Execution order:** Tasks 1–6 run in parallel. Tasks 7, 8, 9 run sequentially after all CSS files exist. Task 10 pushes.

---

## Task 1: `css/mobile-layout.css` — Container & Section Spacing

**Files:**
- Create: `css/mobile-layout.css`

- [ ] **Step 1: Create the css directory and file**

```bash
mkdir -p /Users/munawaranjum/Desktop/emironewebv2.0/css
```

Then create `/Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-layout.css` with this exact content:

```css
/*
  mobile-layout.css
  Container padding, section spacing, hero sizing for mobile/tablet.
  Breakpoints: 860px (iPad landscape), 768px (iPad portrait), 600px, 480px (phone)
*/

/* ── CONTAINER ─────────────────────────────── */
@media (max-width: 768px) {
  .w { padding: 0 20px; }
  .w--mid { padding: 0 20px; }
  .w--narrow { padding: 0 20px; }
}

@media (max-width: 480px) {
  .w { padding: 0 16px; }
  .w--mid { padding: 0 16px; }
  .w--narrow { padding: 0 16px; }
}

/* ── SECTION VERTICAL SPACING ──────────────── */
@media (max-width: 768px) {
  .section { padding: 56px 0; }
  .section-header { gap: 16px; margin-bottom: 36px; }
  .section-header .section-num { padding-top: 4px; }
}

@media (max-width: 480px) {
  .section { padding: 44px 0; }
  .section-header { grid-template-columns: 1fr; gap: 12px; }
}

/* ── HERO KINETIC PADDING ──────────────────── */
@media (max-width: 768px) {
  .hero-kinetic { padding: 60px 20px 60px; }
}

@media (max-width: 480px) {
  .hero-kinetic { padding: 48px 16px 48px; }
}

/* ── HERO STATS ────────────────────────────── */
@media (max-width: 480px) {
  .hero-stats {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .hero-stat { min-width: 80px; }
  .hero-stat-div { display: none; }
}

/* ── OFFER DOC ─────────────────────────────── */
@media (max-width: 600px) {
  .offer-doc-head { padding: 20px; }
  .offer-body { padding: 20px; }
  .offer-doc-meta { text-align: left; }
  .guarantee { padding: 20px 20px; }
  .time-row { padding: 14px 16px; }
  .bonus-list { margin-bottom: 24px; }
  .del-list { margin-bottom: 24px; }
}

/* ── GUIDE / DNS PANEL ─────────────────────── */
@media (max-width: 600px) {
  .method-note { padding: 14px 16px; }
}

/* ── PROOF SECTION ─────────────────────────── */
@media (max-width: 600px) {
  .dash-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
}

/* ── FOOTER ────────────────────────────────── */
@media (max-width: 600px) {
  .footer-row { flex-direction: column; gap: 20px; align-items: flex-start; }
  .subscribe-widget { max-width: 100%; }
}
```

- [ ] **Step 2: Verify**

```bash
cat /Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-layout.css | wc -l
```
Expected: ~60 lines

- [ ] **Step 3: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add css/mobile-layout.css
git commit -m "feat(mobile): container padding, section spacing, hero sizing"
```

---

## Task 2: `css/mobile-nav.css` — Hamburger Menu Styles

**Files:**
- Create: `css/mobile-nav.css`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /Users/munawaranjum/Desktop/emironewebv2.0/css
```

Create `/Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-nav.css`:

```css
/*
  mobile-nav.css
  Hamburger button + slide-down mobile nav drawer.
  On ≤768px: hides inline header links, shows hamburger toggle.
*/

/* ── HIDE DESKTOP NAV LINKS ON MOBILE ──────── */
@media (max-width: 768px) {
  .hdr-right > a {
    display: none !important;
  }
  .hdr-right .live-dot,
  .hdr-right span:not(.menu-btn-text):not(.menu-btn-icon) {
    display: none !important;
  }
  /* Hide "Infrastructure live" text node wrapper if any */
  .hdr-right {
    gap: 0;
  }
}

/* ── HAMBURGER BUTTON ──────────────────────── */
.menu-btn {
  display: none;
  align-items: center;
  gap: 8px;
  background: none;
  border: 1.5px solid var(--ink);
  padding: 6px 12px;
  font-family: var(--body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.menu-btn:hover,
.menu-btn[aria-expanded="true"] {
  background: var(--ink);
  color: var(--paper);
}

.menu-btn-icon {
  font-size: 16px;
  line-height: 1;
}

@media (max-width: 768px) {
  .menu-btn { display: flex; }
}

/* ── MOBILE NAV DRAWER ─────────────────────── */
.mobile-nav-drawer {
  position: fixed;
  top: 62px; /* same as header height */
  left: 0;
  right: 0;
  z-index: 49;
  background: var(--paper);
  border-bottom: 2px solid var(--ink);
  transform: translateY(-110%);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  visibility: hidden;
}

.mobile-nav-drawer.open {
  transform: translateY(0);
  pointer-events: auto;
  visibility: visible;
}

/* Only show on mobile */
@media (min-width: 769px) {
  .mobile-nav-drawer { display: none !important; }
}

/* ── DRAWER INNER ──────────────────────────── */
.mobile-nav-inner {
  display: flex;
  flex-direction: column;
}

.mobile-nav-link {
  display: block;
  padding: 18px 20px;
  font-family: var(--body);
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  transition: background 0.12s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
  background: var(--paper-2);
  text-decoration: none;
}

.mobile-nav-cta {
  display: block;
  padding: 18px 20px;
  font-family: var(--body);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--paper);
  background: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--rule);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: background 0.15s;
}

.mobile-nav-cta:hover,
.mobile-nav-cta:active {
  background: var(--green);
  color: var(--paper);
  text-decoration: none;
}

.mobile-nav-live {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  font-size: 12px;
  color: var(--mid);
}
```

- [ ] **Step 2: Verify**

```bash
grep -c "menu-btn\|mobile-nav-drawer\|mobile-nav-link\|mobile-nav-cta" /Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-nav.css
```
Expected: `4`

- [ ] **Step 3: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add css/mobile-nav.css
git commit -m "feat(mobile): hamburger nav CSS — slide-down drawer"
```

---

## Task 3: `css/mobile-hero.css` — Hero Form & Kinetic Words

**Files:**
- Create: `css/mobile-hero.css`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /Users/munawaranjum/Desktop/emironewebv2.0/css
```

Create `/Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-hero.css`:

```css
/*
  mobile-hero.css
  Hero form stacking, kinetic word sizing, headline wrap adjustments.
*/

/* ── HERO FORM — STACK ON MOBILE ───────────── */
@media (max-width: 520px) {
  .form-wrap { max-width: 100%; padding: 0; }
  .form-inner { flex-direction: column; }

  .domain-input {
    border-right: 1.5px solid var(--ink);
    border-bottom: none;
    width: 100%;
    padding: 14px 16px;
  }

  .domain-input:focus {
    border-color: var(--green);
  }

  .btn-score {
    width: 100%;
    justify-content: center;
    padding: 14px 16px;
    border-top: none;
  }
}

/* ── KINETIC WORDS — FLOOR AT TINY SCREENS ─── */
@media (max-width: 380px) {
  .word-silent,
  .word-burning {
    font-size: 52px;
    letter-spacing: -0.03em;
  }
  .word-or { font-size: 16px; }
}

/* ── HEADLINE WRAP ──────────────────────────── */
@media (max-width: 600px) {
  .kin-headline {
    font-size: clamp(26px, 7.5vw, 48px);
    line-height: 1.1;
    letter-spacing: -0.025em;
  }
  .pre-headline {
    font-size: 9.5px;
    letter-spacing: 0.14em;
    margin-bottom: 14px;
  }
}

/* ── KIN STAGE HEIGHT ───────────────────────── */
@media (max-width: 600px) {
  .kin-stage { height: clamp(220px, 55vw, 320px) !important; }
}

/* ── FORM NOTE ──────────────────────────────── */
@media (max-width: 480px) {
  .form-note { font-size: 11px; }
}
```

- [ ] **Step 2: Verify**

```bash
grep -c "form-inner\|domain-input\|btn-score\|kin-headline\|kin-stage" /Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-hero.css
```
Expected: `5`

- [ ] **Step 3: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add css/mobile-hero.css
git commit -m "feat(mobile): hero form stacking + kinetic word sizing"
```

---

## Task 4: `css/mobile-table.css` — Compare Table & Misc Components

**Files:**
- Create: `css/mobile-table.css`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /Users/munawaranjum/Desktop/emironewebv2.0/css
```

Create `/Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-table.css`:

```css
/*
  mobile-table.css
  Compare table iPad fix (extend breakpoint to 860px).
  Stats bar, villain cols, hero body row adjustments.
*/

/* ── COMPARE TABLE — EXTEND TO IPAD ────────── */
/*
  The existing CSS hides the table at 680px.
  iPad (768px) still shows the 5-column table — too wide.
  Override: show mobile cards up to 860px.
*/
@media (max-width: 860px) {
  .compare-table { display: none !important; }
  .mobile-compare { display: flex !important; }
}

/* ── MOBILE COMPARE CARDS — TABLET SPACING ─── */
@media (min-width: 481px) and (max-width: 860px) {
  .mobile-compare {
    display: grid !important;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .mobile-compare { gap: 10px; }
  .mob-col-head { padding: 10px 14px; }
  .mob-col-items { padding: 10px 14px; gap: 8px; }
  .mob-item { font-size: 13px; }
}

/* ── HERO BODY ROW ──────────────────────────── */
@media (max-width: 600px) {
  .hero-body-row {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 28px 0;
  }
}

/* ── STATS BAR ──────────────────────────────── */
@media (max-width: 480px) {
  .stats-bar { grid-template-columns: 1fr 1fr; }
  .stat-cell { padding: 18px 0 18px 16px; }
  .stat-num { font-size: 30px; }
}

/* ── VILLAIN COLS ───────────────────────────── */
@media (max-width: 480px) {
  .villain-cols { grid-template-columns: 1fr; }
  .v-col + .v-col { border-left: none; border-top: 1px solid var(--rule); }
}

/* ── GUIDE LAYOUT ───────────────────────────── */
@media (max-width: 600px) {
  .dns-code { font-size: 10.5px; padding: 16px 14px 18px; }
}

/* ── PILLAR GRID TABLET ─────────────────────── */
@media (min-width: 641px) and (max-width: 860px) {
  .pillar-grid { grid-template-columns: 1fr 1fr; }
}

/* ── HEALTH DRAWER MOBILE ───────────────────── */
@media (max-width: 480px) {
  .hd-inner { padding: 18px 16px 24px; }
  .hd-score-num { font-size: 32px; }
  .hd-commentary { font-size: 14px; }
  .hd-check { font-size: 12.5px; padding: 10px 12px; }
  .hd-cta { font-size: 12.5px; padding: 14px 16px; }
}
```

- [ ] **Step 2: Verify**

```bash
grep -c "compare-table\|mobile-compare\|stats-bar\|villain-cols\|pillar-grid" /Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-table.css
```
Expected: `5`

- [ ] **Step 3: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add css/mobile-table.css
git commit -m "feat(mobile): compare table iPad fix + misc component responsive"
```

---

## Task 5: `css/mobile-smooth.css` — Touch Smoothness

**Files:**
- Create: `css/mobile-smooth.css`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /Users/munawaranjum/Desktop/emironewebv2.0/css
```

Create `/Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-smooth.css`:

```css
/*
  mobile-smooth.css
  Touch interaction quality: removes 300ms tap delay, kill tap flash,
  prevents overscroll bounce, GPU-accelerates key animated elements.
  Applied globally — not behind a media query where noted.
*/

/* ── KILL TAP DELAY + FLASH ─────────────────── */
a,
button,
input,
select,
textarea,
[role="button"],
.btn-score,
.btn-submit,
.btn-reserve,
.btn-cta-xl,
.btn-primary,
.hd-close,
.hd-cta,
.menu-btn,
.mobile-nav-link,
.mobile-nav-cta,
.wordmark,
.wordmark-link,
.nav-cta {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* ── PREVENT OVERSCROLL BOUNCE ──────────────── */
html {
  overscroll-behavior-y: none;
}

/* Keep horizontal overscroll for scroll containers */
.dash-wrap,
.dns-code,
.health-drawer {
  overscroll-behavior-x: contain;
}

/* ── GPU-ACCELERATE ANIMATED ELEMENTS ──────── */
.health-drawer,
.mobile-nav-drawer,
.word-silent,
.word-burning,
.word-or,
.headline-wrap,
.form-wrap,
.hero-stats,
.site-header {
  will-change: transform;
}

/* ── SMOOTH SCROLL CONTAINERS ON IOS ────────── */
.health-drawer {
  -webkit-overflow-scrolling: touch;
}

/* ── PREVENT TEXT SIZE JUMP ON ROTATION ─────── */
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* ── FOCUS RING — VISIBLE BUT NOT JARRING ───── */
@media (hover: none) {
  /* Touch devices: show focus only on keyboard nav, not tap */
  *:focus:not(:focus-visible) {
    outline: none;
  }
}

/* ── INPUT ZOOM PREVENTION ON IOS ───────────── */
/*
  iOS Safari zooms in when an input has font-size < 16px.
  Ensure all inputs are at least 16px on mobile.
*/
@media (max-width: 768px) {
  input,
  select,
  textarea {
    font-size: max(16px, 1em);
  }
}

/* ── BODY SCROLL LOCK HELPER ────────────────── */
/* Used by hamburger menu JS when drawer is open */
body.scroll-locked {
  overflow: hidden;
  position: fixed;
  width: 100%;
}
```

- [ ] **Step 2: Verify**

```bash
grep -c "tap-highlight\|touch-action\|overscroll\|will-change\|text-size-adjust" /Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-smooth.css
```
Expected: `5`

- [ ] **Step 3: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add css/mobile-smooth.css
git commit -m "feat(mobile): tap smoothness, overscroll, GPU acceleration"
```

---

## Task 6: `css/mobile-type.css` — Typography

**Files:**
- Create: `css/mobile-type.css`

- [ ] **Step 1: Create the file**

```bash
mkdir -p /Users/munawaranjum/Desktop/emironewebv2.0/css
```

Create `/Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-type.css`:

```css
/*
  mobile-type.css
  Type scale adjustments for small screens.
  Body 17→16px, tighter label tracking, comfortable line lengths.
*/

@media (max-width: 768px) {
  /* ── BASE SIZE ────────────────────────────── */
  body { font-size: 16px; }

  /* ── LABEL TRACKING ──────────────────────── */
  .label,
  .section-num,
  .pre-label,
  .pre-headline,
  .offer-section-title,
  .time-row-label,
  .v-col-title {
    letter-spacing: 0.12em;
  }

  /* ── PULL QUOTES ─────────────────────────── */
  .villain-pull {
    font-size: clamp(17px, 4vw, 26px);
    padding-left: 16px;
    margin: 36px 0;
  }

  /* ── BODY TEXT LINE HEIGHT ───────────────── */
  .hero-desc,
  .section-sub,
  .villain-intro p,
  .body-desc,
  .p-text,
  .g-text,
  .v-item {
    line-height: 1.6;
  }

  /* ── SECTION HEADING ─────────────────────── */
  .section-h {
    letter-spacing: -0.02em;
    line-height: 1.08;
  }

  /* ── OFFER DOC TITLE ─────────────────────── */
  .offer-doc-title {
    font-size: clamp(20px, 5vw, 28px);
  }

  /* ── STAT NUMBERS ────────────────────────── */
  .stat-num { font-size: 32px; }

  /* ── CTA SECTION ─────────────────────────── */
  .cta-h {
    font-size: clamp(28px, 7vw, 52px);
    letter-spacing: -0.025em;
  }
}

@media (max-width: 480px) {
  /* ── SECTION HEADING ─────────────────────── */
  .section-h {
    font-size: clamp(22px, 6.5vw, 36px);
  }

  /* ── HERO BODY DESC ──────────────────────── */
  .hero-desc { font-size: 15.5px; }

  /* ── PRINCIPLE TEXT ──────────────────────── */
  .p-name { font-size: 18px; }
  .p-text { font-size: 14px; }
  .del-item { font-size: 14px; }
  .bonus-text { font-size: 14px; }
}
```

- [ ] **Step 2: Verify**

```bash
grep -c "@media\|body.*font-size\|section-h\|villain-pull\|letter-spacing" /Users/munawaranjum/Desktop/emironewebv2.0/css/mobile-type.css
```
Expected: `5`

- [ ] **Step 3: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add css/mobile-type.css
git commit -m "feat(mobile): type scale — 17→16px body, tighter label tracking"
```

---

## Task 7: Link CSS files from `index.html` `<head>`

**Files:**
- Modify: `index.html` — `<head>` section

This task runs **after** Tasks 1–6 complete (CSS files must exist).

- [ ] **Step 1: Find the closing `</head>` tag**

```bash
grep -n "</head>" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```

- [ ] **Step 2: Add the 6 link tags**

Find the exact text of the closing `</head>` tag in `index.html`:
```html
</head>
```

Replace with:
```html
<!-- Mobile responsive CSS -->
<link rel="stylesheet" href="css/mobile-smooth.css">
<link rel="stylesheet" href="css/mobile-layout.css">
<link rel="stylesheet" href="css/mobile-nav.css">
<link rel="stylesheet" href="css/mobile-hero.css">
<link rel="stylesheet" href="css/mobile-table.css">
<link rel="stylesheet" href="css/mobile-type.css">
</head>
```

Note: `mobile-smooth.css` loads first so its `will-change` and `touch-action` rules apply before layout rules.

- [ ] **Step 3: Verify all 6 links are present**

```bash
grep -c "css/mobile-" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: `6`

- [ ] **Step 4: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add index.html
git commit -m "feat(mobile): link all 6 mobile CSS files from head"
```

---

## Task 8: Hamburger Menu — HTML + JS in `index.html`

**Files:**
- Modify: `index.html` — header HTML + inline script

- [ ] **Step 1: Find the header structure**

```bash
grep -n "hdr-right\|</header>" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -5
```

- [ ] **Step 2: Add hamburger button to header**

Find this exact string:
```html
    <div class="hdr-right">
```

Replace with:
```html
    <button class="menu-btn" id="menuBtn" aria-label="Open navigation" aria-expanded="false">
      <span class="menu-btn-text">Menu</span>
      <span class="menu-btn-icon" aria-hidden="true">&#9776;</span>
    </button>
    <div class="hdr-right">
```

- [ ] **Step 3: Add mobile nav drawer after `</header>`**

Find this exact string:
```html
</header>

<main id="top">
```

Replace with:
```html
</header>

<!-- ─── MOBILE NAV DRAWER ──────────────────── -->
<div class="mobile-nav-drawer" id="mobileNavDrawer" aria-hidden="true">
  <nav class="mobile-nav-inner">
    <a href="research.html" class="mobile-nav-link">Research</a>
    <a href="#sharia" class="mobile-nav-link">Sharia-aligned</a>
    <a href="book.html" class="mobile-nav-cta">Free audit &#8594;</a>
    <div class="mobile-nav-live">
      <span class="live-dot" aria-hidden="true"></span>
      Infrastructure live
    </div>
  </nav>
</div>

<main id="top">
```

- [ ] **Step 4: Add hamburger JS to inline script**

Find the closing `</script>` of the FIRST inline script block (the non-module one). Run:
```bash
grep -n "^</script>" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -3
```

Read 5 lines before the first result to get context. Then find this pattern near the end of that first script block (it will be before the Timestamp section):

```js
  // Newsletter subscribe (footer widget)
```

Insert the following JS immediately **before** that line:

```js
  // Hamburger menu
  (function(){
    var btn = document.getElementById('menuBtn');
    var drawer = document.getElementById('mobileNavDrawer');
    if (!btn || !drawer) return;

    function openMenu() {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      btn.querySelector('.menu-btn-icon').textContent = '×';
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.querySelector('.menu-btn-icon').textContent = '☰';
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function() {
      if (drawer.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });

    drawer.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) { closeMenu(); }
    });
  })();

```

- [ ] **Step 5: Verify**

```bash
grep -n "menuBtn\|mobileNavDrawer\|mobile-nav-drawer\|menu-btn" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -10
```
Expected: at least 6 lines covering the HTML and JS references

- [ ] **Step 6: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add index.html
git commit -m "feat(mobile): hamburger menu HTML and JS"
```

---

## Task 9: Lenis Touch Guard — disable on touch devices

**Files:**
- Modify: `index.html` — `<script type="module">` block

- [ ] **Step 1: Find the Lenis initialization**

```bash
grep -n "new Lenis\|smoothWheel\|touchMultiplier\|rafLenis\|isTouch" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -10
```

- [ ] **Step 2: Wrap Lenis in touch detection guard**

Find this exact block (it starts with `const lenis = new Lenis`):

```js
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
  });
  window.__lenis = lenis;

  function rafLenis(time) { lenis.raf(time); requestAnimationFrame(rafLenis); }
  requestAnimationFrame(rafLenis);

  lenis.on('scroll', () => { window.dispatchEvent(new Event('scroll')); });
```

Replace with:

```js
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  const lenis = isTouch ? null : new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
  });

  window.__lenis = lenis;

  if (lenis) {
    function rafLenis(time) { lenis.raf(time); requestAnimationFrame(rafLenis); }
    requestAnimationFrame(rafLenis);
    lenis.on('scroll', () => { window.dispatchEvent(new Event('scroll')); });
  }
```

- [ ] **Step 3: Verify**

```bash
grep -n "isTouch\|ontouchstart\|maxTouchPoints\|lenis = isTouch" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -5
```
Expected: 4 lines showing the touch detection and conditional Lenis init

```bash
grep -n "window.__lenis = lenis" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: 1 line (unchanged reference, now can be null on touch)

- [ ] **Step 4: Commit**

```bash
cd /Users/munawaranjum/Desktop/emironewebv2.0
git add index.html
git commit -m "feat(mobile): disable Lenis on touch devices for native scroll"
```

---

## Task 10: Final Verification + Push

- [ ] **Step 1: Check all CSS files exist**

```bash
ls -la /Users/munawaranjum/Desktop/emironewebv2.0/css/
```
Expected: 6 files — `mobile-layout.css`, `mobile-nav.css`, `mobile-hero.css`, `mobile-table.css`, `mobile-smooth.css`, `mobile-type.css`

- [ ] **Step 2: Check all links in index.html**

```bash
grep "css/mobile-" /Users/munawaranjum/Desktop/emironewebv2.0/index.html
```
Expected: 6 `<link>` tags

- [ ] **Step 3: Check no old stubs remain**

```bash
grep -n "window.location.href.*book\|alert.*Demo" /Users/munawaranjum/Desktop/emironewebv2.0/index.html | head -5
```
Expected: 2 lines for finalCtaBtn + reserveBtn (these are intentional)

- [ ] **Step 4: Git status clean**

```bash
git status
git log --oneline -12
```
Expected: clean working tree, 10+ new commits since last push

- [ ] **Step 5: Push**

```bash
git push origin main
```

---

## Self-Review

### Spec Coverage

| Requirement | Task |
|-------------|------|
| Header nav overflow → hamburger on ≤768px | Task 2 (CSS) + Task 8 (HTML+JS) |
| Container padding 32px → 20px/16px mobile | Task 1 |
| Section padding 88px → 56px/44px mobile | Task 1 |
| Hero kinetic padding mobile | Task 1 |
| Hero form stacks vertically on ≤520px | Task 3 |
| Kinetic word floor at 380px | Task 3 |
| Compare table shows card layout up to 860px (iPad) | Task 4 |
| Stats bar 2-col on mobile | Task 4 |
| `-webkit-tap-highlight-color: transparent` on all interactives | Task 5 |
| `touch-action: manipulation` on all interactives | Task 5 |
| `overscroll-behavior-y: none` on html | Task 5 |
| `will-change: transform` on animated elements | Task 5 |
| iOS input zoom prevention (font-size ≥ 16px) | Task 5 |
| Body 17px → 16px on mobile | Task 6 |
| Label letter-spacing tightened | Task 6 |
| All 6 CSS files linked from `<head>` | Task 7 |
| Hamburger button HTML | Task 8 |
| Mobile nav drawer HTML | Task 8 |
| Hamburger open/close JS + Escape key | Task 8 |
| Lenis disabled on touch devices | Task 9 |
| Push to GitHub | Task 10 |

All spec requirements covered. No placeholders. No TBDs.

### Naming Consistency

- `menuBtn` / `mobileNavDrawer` — defined in Task 8 HTML, referenced in Task 8 JS and Task 2 CSS
- `mobile-nav-drawer.open` class — toggled in Task 8 JS, styled in Task 2 CSS
- `isTouch` — defined and used within Task 9 only
- `window.__lenis` — already used in existing codebase; Task 9 preserves the reference (can be null)
- CSS classes `.menu-btn`, `.mobile-nav-drawer`, `.mobile-nav-link`, `.mobile-nav-cta`, `.mobile-nav-live` — defined in Task 2 CSS, used in Task 8 HTML
