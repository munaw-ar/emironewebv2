import { useEffect, useRef } from 'react';
import anime from 'animejs';

/**
 * Emir One's story, animated: the journey of a cold email from flagged/spam,
 * through infrastructure hardening + warm-up, to the inbox — delivered ethically.
 * Orchestrated with an anime.js timeline, triggered once on scroll-into-view.
 * Falls back to the finished state under prefers-reduced-motion.
 */
export default function StorySection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>('[data-node]');
    const links = root.querySelectorAll<HTMLElement>('[data-link]');
    const chips = root.querySelectorAll<HTMLElement>('[data-chip]');
    const ring = root.querySelector<SVGCircleElement>('[data-ring]');
    const dayCount = root.querySelector<HTMLElement>('[data-days]');
    const scoreCount = root.querySelector<HTMLElement>('[data-score]');
    const check = root.querySelector<HTMLElement>('[data-check]');

    const CIRC = 163.36; // 2π·26
    const GREEN = '#0D5C38';
    const RED = '#C2410C';

    const setFinal = () => {
      nodes.forEach(n => { n.style.opacity = '1'; n.style.transform = 'none'; });
      links.forEach(l => { l.style.transform = 'scaleX(1)'; });
      chips.forEach(c => { c.style.color = GREEN; c.style.borderColor = GREEN; c.style.background = 'rgba(13,92,56,0.08)'; });
      if (ring) ring.style.strokeDashoffset = '0';
      if (dayCount) dayCount.textContent = '21';
      if (scoreCount) scoreCount.textContent = '10';
      if (check) { check.style.opacity = '1'; check.style.transform = 'none'; }
    };

    const setStart = () => {
      nodes.forEach(n => { n.style.opacity = '0'; n.style.transform = 'translateY(18px) scale(0.94)'; });
      links.forEach(l => { l.style.transform = 'scaleX(0)'; l.style.transformOrigin = 'left'; });
      chips.forEach(c => { c.style.color = RED; c.style.borderColor = RED; c.style.background = 'rgba(194,65,12,0.06)'; });
      if (ring) ring.style.strokeDashoffset = String(CIRC);
      if (dayCount) dayCount.textContent = '0';
      if (scoreCount) scoreCount.textContent = '0';
      if (check) { check.style.opacity = '0'; check.style.transform = 'scale(0.4)'; }
    };

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      const tl = anime.timeline({ easing: 'easeOutExpo', duration: 620 });
      // Stage 1 node
      tl.add({ targets: nodes[0], opacity: [0, 1], translateY: [18, 0], scale: [0.94, 1] });
      // link 1 -> stage 2
      tl.add({ targets: links[0], scaleX: [0, 1], duration: 460 }, '-=240');
      tl.add({ targets: nodes[1], opacity: [0, 1], translateY: [18, 0], scale: [0.94, 1] }, '-=120');
      // chips flip red -> green, sequential
      tl.add({ targets: chips, color: GREEN, borderColor: GREEN, background: 'rgba(13,92,56,0.08)', delay: anime.stagger(140), duration: 380 }, '-=80');
      // link 2 -> stage 3
      tl.add({ targets: links[1], scaleX: [0, 1], duration: 460 }, '-=120');
      tl.add({ targets: nodes[2], opacity: [0, 1], translateY: [18, 0], scale: [0.94, 1] }, '-=120');
      // warm-up ring fill + day counter
      tl.add({ targets: ring, strokeDashoffset: [CIRC, 0], duration: 900, easing: 'easeInOutQuart' }, '-=60');
      tl.add({ targets: { v: 0 }, v: 21, round: 1, duration: 900, easing: 'easeInOutQuart',
        update: (a: any) => { if (dayCount) dayCount.textContent = String(a.animations[0].currentValue); } }, '-=900');
      // link 3 -> stage 4
      tl.add({ targets: links[2], scaleX: [0, 1], duration: 460 }, '-=300');
      tl.add({ targets: nodes[3], opacity: [0, 1], translateY: [18, 0], scale: [0.94, 1] }, '-=120');
      // score count + check
      tl.add({ targets: { v: 0 }, v: 10, round: 1, duration: 620,
        update: (a: any) => { if (scoreCount) scoreCount.textContent = String(a.animations[0].currentValue); } }, '-=200');
      tl.add({ targets: check, opacity: [0, 1], scale: [0.4, 1], easing: 'easeOutBack', duration: 480 }, '-=380');
    };

    if (reduce) { setFinal(); return; }

    setStart();
    let done = false;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting && !done) { done = true; run(); io.disconnect(); }
      }),
      { threshold: 0.35 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const node: React.CSSProperties = { willChange: 'transform, opacity' };

  return (
    <section aria-label="How Emir One delivers" style={{ padding: 'var(--section-y) 0', background: 'var(--paper-2)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', overflow: 'hidden' }}>
      <div className="w">
        <div className="reveal" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', fontWeight: 600, letterSpacing: 'var(--track-caps)', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 'var(--s4)' }}>
          The Story
        </div>
        <h2 className="reveal reveal-delay-1 h-section" style={{ maxWidth: 720, marginBottom: 'var(--s7)' }}>
          From flagged to delivered. <em>The path to the inbox.</em>
        </h2>

        <div className="story-track" ref={rootRef}>
          {/* Stage 1 — Flagged */}
          <div className="story-stage" data-node style={node}>
            <div className="story-badge" style={{ borderColor: '#C2410C', color: '#C2410C' }}>✕</div>
            <div className="story-title">Flagged</div>
            <div className="story-sub">Primary domain, SPF soft-fail, DMARC p=none — straight to spam.</div>
          </div>

          <div className="story-link" data-link aria-hidden="true" />

          {/* Stage 2 — Hardened */}
          <div className="story-stage" data-node style={node}>
            <div className="story-chips">
              {['SPF', 'DKIM', 'DMARC'].map(c => (
                <span key={c} className="story-chip" data-chip>{c} ✓</span>
              ))}
            </div>
            <div className="story-title">Hardened</div>
            <div className="story-sub">Secondary domains, authentication aligned and MXToolbox-verified.</div>
          </div>

          <div className="story-link" data-link aria-hidden="true" />

          {/* Stage 3 — Warmed */}
          <div className="story-stage" data-node style={node}>
            <div className="story-ring" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="64" height="64">
                <circle cx="32" cy="32" r="26" fill="none" stroke="var(--rule)" strokeWidth="4" />
                <circle data-ring cx="32" cy="32" r="26" fill="none" stroke="var(--green)" strokeWidth="4" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset="163.36" transform="rotate(-90 32 32)" />
              </svg>
              <span className="story-ring-num"><span data-days>0</span><small>d</small></span>
            </div>
            <div className="story-title">Warmed</div>
            <div className="story-sub">A 21-day reputation ramp, monitored daily before scale.</div>
          </div>

          <div className="story-link" data-link aria-hidden="true" />

          {/* Stage 4 — Delivered */}
          <div className="story-stage" data-node style={node}>
            <div className="story-badge story-badge--green" style={{ borderColor: 'var(--green)', color: 'var(--green)' }}>
              <span data-check style={{ display: 'inline-flex' }}>✓</span>
            </div>
            <div className="story-title"><span data-score>0</span> / 10 · Delivered</div>
            <div className="story-sub">In the inbox — consent-first, Sharia-aligned, every claim verifiable.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
