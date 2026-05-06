# Mobile Responsive & Buttery Smooth — Design Spec

## Summary

Full mobile/tablet overhaul of `emironewebv2/index.html`. Six categories of fixes, delivered as individual CSS files under `css/` (linked from `index.html`) plus targeted JS changes. No new pages, no new dependencies.

---

## Architecture

All responsive CSS goes into separate files under a new `css/` directory, one per concern. This allows parallel implementation and keeps `index.html`'s `<style>` block from growing further. Each file is linked from `<head>` after the main `<style>` block.

```
css/
  mobile-layout.css   — container padding, section spacing, .w breakpoints
  mobile-nav.css      — hamburger menu, collapsible header nav
  mobile-hero.css     — hero kinetic form stacking, kinetic word sizing
  mobile-table.css    — compare table breakpoint fix, stats bar
  mobile-smooth.css   — touch-action, tap highlight, overscroll, will-change
  mobile-type.css     — body font size, letter-spacing adjustments
```

**Breakpoints used consistently:**
- `max-width: 860px` — iPad landscape, large tablet
- `max-width: 768px` — iPad portrait
- `max-width: 600px` — large phone, small tablet
- `max-width: 480px` — phone (iPhone SE and up)

**JS changes** — Lenis module script in `index.html`: detect touch device and skip Lenis initialization so native iOS momentum scroll runs uninterrupted.

---

## Fix 1 — Hamburger Nav (`css/mobile-nav.css` + `index.html` header HTML)

### Behavior
- Below 768px: hide `.hdr-right` inline links, show a `<button id="menuBtn">` with "Menu" text + ☰ glyph
- Clicking opens `.mobile-nav-drawer` — a panel that slides down below the header
- Drawer contains: Research, Sharia-aligned, live-dot line, and a "Free audit →" CTA link to `book.html`
- Clicking any link or clicking the button again closes the drawer
- Body gets `overflow: hidden` while drawer is open
- Drawer uses `transform: translateY(-100%)` → `translateY(0)` with `transition: transform 0.3s`

### HTML additions to `index.html` header
Add inside `.hdr` (after `.hdr-right`):
```html
<button class="menu-btn" id="menuBtn" aria-label="Open navigation" aria-expanded="false">
  <span class="menu-btn-text">Menu</span>
  <span class="menu-btn-icon" aria-hidden="true">☰</span>
</button>
```

Add immediately after `</header>`:
```html
<div class="mobile-nav-drawer" id="mobileNavDrawer" aria-hidden="true">
  <nav class="mobile-nav-inner">
    <a href="research.html" class="mobile-nav-link">Research</a>
    <a href="#sharia" class="mobile-nav-link">Sharia-aligned</a>
    <a href="book.html" class="mobile-nav-cta">Free audit →</a>
    <div class="mobile-nav-live">
      <span class="live-dot" aria-hidden="true"></span>
      Infrastructure live
    </div>
  </nav>
</div>
```

### JS addition (inline script in `index.html`)
```js
var menuBtn = document.getElementById('menuBtn');
var mobileNavDrawer = document.getElementById('mobileNavDrawer');
if (menuBtn && mobileNavDrawer) {
  menuBtn.addEventListener('click', function() {
    var isOpen = mobileNavDrawer.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuBtn.querySelector('.menu-btn-icon').textContent = isOpen ? '×' : '☰';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNavDrawer.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNavDrawer.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.querySelector('.menu-btn-icon').textContent = '☰';
      document.body.style.overflow = '';
    });
  });
}
```

### CSS (`css/mobile-nav.css`)
- `.menu-btn`: `display: none` by default; on ≤768px → `display: flex`
- `.hdr-right a` (the Research/Sharia links): hidden on ≤768px, live-dot and "Infrastructure live" also hidden
- `.mobile-nav-drawer`: `position: fixed; top: 62px; left: 0; right: 0; z-index: 49; background: var(--paper); border-bottom: 1px solid var(--rule); transform: translateY(-100%); transition: transform 0.3s var(--ease); pointer-events: none`
- `.mobile-nav-drawer.open`: `transform: translateY(0); pointer-events: auto`
- Links: `display: block; padding: 16px 20px; font-size: 16px; border-bottom: 1px solid var(--rule-2); color: var(--ink); text-decoration: none`
- CTA: `background: var(--ink); color: var(--paper); padding: 16px 20px; font-weight: 600`

---

## Fix 2 — Container & Section Spacing (`css/mobile-layout.css`)

```css
@media (max-width: 768px) {
  .w { padding: 0 20px; }
  .section { padding: 56px 0; }
  .section-header { gap: 16px; margin-bottom: 36px; }
  .hero-kinetic { padding: 60px 20px 60px; }
}

@media (max-width: 480px) {
  .w { padding: 0 16px; }
  .section { padding: 44px 0; }
  .hero-kinetic { padding: 48px 16px 48px; }
}
```

Also: hero stats bar on mobile:
```css
@media (max-width: 480px) {
  .hero-stats { gap: 24px; flex-wrap: wrap; justify-content: center; }
}
```

Offer section padding on mobile:
```css
@media (max-width: 600px) {
  .offer-doc-head { padding: 20px; }
  .offer-body { padding: 20px; }
  .guarantee { padding: 20px; }
  .time-row { padding: 16px 18px; }
}
```

---

## Fix 3 — Hero Form & Kinetic Words (`css/mobile-hero.css`)

### Hero form stacking
```css
@media (max-width: 480px) {
  .form-inner { flex-direction: column; }
  .domain-input { border-right: 1.5px solid var(--ink); border-bottom: none; width: 100%; }
  .btn-score { width: 100%; justify-content: center; padding: 14px 18px; }
}
```

### Kinetic word sizing (already uses clamp but needs floor check)
```css
@media (max-width: 380px) {
  .word-silent, .word-burning {
    font-size: clamp(52px, 14vw, 72px);
    letter-spacing: -0.03em;
  }
}
```

### Headline wrap on mobile
```css
@media (max-width: 600px) {
  .kin-headline {
    font-size: clamp(28px, 7vw, 48px);
    line-height: 1.1;
  }
  .form-wrap { max-width: 100%; }
}
```

---

## Fix 4 — Compare Table & Stats Bar (`css/mobile-table.css`)

The existing `.mobile-compare` breakpoint is 680px — misses iPad (768px). Extend it:

```css
/* Widen the breakpoint so iPad sees the card layout */
@media (max-width: 860px) {
  .compare-table { display: none; }
  .mobile-compare { display: flex !important; }
}
/* Reset the existing 680px rule that may conflict */
@media (min-width: 681px) and (max-width: 860px) {
  .mobile-compare { display: flex !important; }
  .compare-table { display: none !important; }
}
```

Stats bar — on iPad it's 4 columns which is fine, but on mobile:
```css
@media (max-width: 480px) {
  .stats-bar { grid-template-columns: 1fr 1fr; }
  .stat-cell { padding: 18px 0 18px 16px; }
}
```

Villain cols on mobile:
```css
@media (max-width: 480px) {
  .villain-cols { grid-template-columns: 1fr; }
}
```

---

## Fix 5 — Touch Smoothness (`css/mobile-smooth.css`)

```css
/* Kill 300ms tap delay on all interactive elements */
a, button, input, select, textarea,
[role="button"], .btn-score, .btn-submit, .btn-reserve,
.hd-close, .hd-cta, .menu-btn {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

/* Prevent overscroll bounce on iOS */
html {
  overscroll-behavior: none;
}

/* GPU-accelerate animated elements */
.health-drawer,
.mobile-nav-drawer,
.word-silent, .word-burning, .word-or,
.headline-wrap, .form-wrap, .hero-stats {
  will-change: transform;
}

/* Ensure smooth scrolling on iOS for scroll containers */
.health-drawer,
.mobile-nav-drawer {
  -webkit-overflow-scrolling: touch;
}

/* Prevent text size adjustment on orientation change */
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
```

---

## Fix 6 — Typography (`css/mobile-type.css`)

```css
@media (max-width: 768px) {
  body { font-size: 16px; }

  /* Tighten label tracking slightly */
  .label, .section-num, .pre-label, .pre-headline,
  .offer-section-title, .dns-bar-label {
    letter-spacing: 0.12em;
  }

  /* Section headings — slightly tighter */
  .section-h { letter-spacing: -0.02em; }

  /* Body text paragraphs — tighten line height slightly */
  .hero-desc, .body-desc, .villain-intro p, .section-sub {
    line-height: 1.6;
  }

  /* Villain pull quote — smaller on mobile */
  .villain-pull {
    font-size: clamp(18px, 4vw, 26px);
    padding-left: 18px;
  }
}

@media (max-width: 480px) {
  /* Smaller section numbers */
  .section-h {
    font-size: clamp(22px, 6vw, 38px);
  }
}
```

---

## Fix 7 — Lenis Touch Disable (JS in `index.html`)

In the `<script type="module">` block, find the `new Lenis({...})` call and wrap the whole Lenis initialization in a touch detection guard:

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

if (lenis) {
  function rafLenis(time) { lenis.raf(time); requestAnimationFrame(rafLenis); }
  requestAnimationFrame(rafLenis);
  lenis.on('scroll', () => { window.dispatchEvent(new Event('scroll')); });
}

window.__lenis = lenis;
```

This means on touch devices (iPhones, iPads), Lenis is completely skipped and native momentum scroll runs. On desktop (mouse/trackpad), Lenis still runs for the polished smooth wheel experience.

The `window.__lenis` reference is used elsewhere in the codebase — setting it to `null` on touch is safe since the finalCtaBtn already falls back to native scrollIntoView.

---

## Files Changed / Created

| File | Action |
|------|--------|
| `css/mobile-layout.css` | Create |
| `css/mobile-nav.css` | Create |
| `css/mobile-hero.css` | Create |
| `css/mobile-table.css` | Create |
| `css/mobile-smooth.css` | Create |
| `css/mobile-type.css` | Create |
| `index.html` `<head>` | Add 6 `<link>` tags for CSS files |
| `index.html` header HTML | Add hamburger button + mobile nav drawer |
| `index.html` inline script | Add hamburger JS |
| `index.html` module script | Wrap Lenis in touch guard |

---

## Out of Scope
- Dark mode
- Offline/PWA
- Animated page transitions
- Any layout changes to `book.html` or `research.html` (separate task)
