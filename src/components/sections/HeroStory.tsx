import { useEffect, useRef, useState } from 'react';
import anime, { type AnimeInstance } from 'animejs';
import { Ban, Target, ShieldCheck, MailCheck } from 'lucide-react';

/**
 * The hero's signature animation: an auto-playing "story" of Emir One —
 * a cold email's path to the inbox. Five stages cross-fade story-style, with
 * progress segments that fill across each stage (Instagram-stories pattern).
 * Tap / click / Enter / Space advances to the next stage smoothly; when the
 * active segment fills it auto-advances on its own and loops. Falls back to
 * the final (Delivered) stage under prefers-reduced-motion.
 */
const STAGES = [
  { key: 'flagged',   title: 'Flagged',              sub: 'Primary domain, SPF soft-fail, DMARC p=none — straight to spam.' },
  { key: 'targeted',  title: 'Targeted',             sub: 'ICP-scored 7+ on a weighted signal sheet, manually verified — quality over volume.' },
  { key: 'hardened',  title: 'Hardened',             sub: 'Secondary domains, SPF · DKIM · DMARC aligned and MXToolbox-verified.' },
  { key: 'warmed',    title: 'Warmed',               sub: 'A 21-day reputation ramp, monitored daily before scale.' },
  { key: 'delivered', title: '10 / 10 · Delivered',  sub: 'In the inbox — consent-first, Sharia-aligned, every claim verifiable.' },
];

const STAGE_MS = 2600;
const RED = '#C2410C';
const GREEN = '#0D5C38';
const CIRC = 138.23; // 2π·22

export default function HeroStory() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // advance-to-next-stage handle, populated once the timeline is wired up
  const nextRef = useRef<() => void>(() => {});

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fills = Array.from(el.querySelectorAll<HTMLElement>('[data-fill]'));
    const ring = el.querySelector<SVGCircleElement>('[data-ring]');
    const days = el.querySelector<HTMLElement>('[data-days]');
    const score = el.querySelector<HTMLElement>('[data-score]');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(STAGES.length - 1);
      fills.forEach(f => { f.style.transform = 'scaleX(1)'; });
      if (ring) ring.style.strokeDashoffset = '0';
      if (days) days.textContent = '21';
      if (score) score.textContent = '10';
      return;
    }

    let current = 0;
    let fillAnim: AnimeInstance | null = null;
    let counterTarget: { v: number } | null = null;

    const runStage = (index: number) => {
      // stop whatever is in flight
      anime.remove(fills);
      if (counterTarget) { anime.remove(counterTarget); counterTarget = null; }

      // progress segments: everything before the active stage reads as done
      fills.forEach((f, i) => { f.style.transform = i < index ? 'scaleX(1)' : 'scaleX(0)'; });

      current = index;
      setActive(index); // CSS handles the smooth panel crossfade

      // reset + replay the stage-specific flourishes each visit
      if (STAGES[index].key === 'warmed' && ring && days) {
        ring.style.strokeDashoffset = String(CIRC);
        days.textContent = '0';
        anime({ targets: ring, strokeDashoffset: [CIRC, 0], duration: STAGE_MS - 600, easing: 'easeInOutQuart' });
        counterTarget = { v: 0 };
        anime({ targets: counterTarget, v: 21, round: 1, duration: STAGE_MS - 600, easing: 'easeInOutQuart',
          update: () => { if (days && counterTarget) days.textContent = String(counterTarget.v); } });
      }
      if (STAGES[index].key === 'delivered' && score) {
        score.textContent = '0';
        counterTarget = { v: 0 };
        anime({ targets: counterTarget, v: 10, round: 1, duration: 800, easing: 'easeOutExpo',
          update: () => { if (score && counterTarget) score.textContent = String(counterTarget.v); } });
      }

      // the active segment fills across the dwell, then auto-advances + loops
      fillAnim = anime({
        targets: fills[index],
        scaleX: [0, 1],
        duration: STAGE_MS,
        easing: 'linear',
        complete: () => runStage((index + 1) % STAGES.length),
      });
    };

    nextRef.current = () => runStage((current + 1) % STAGES.length);
    runStage(0);

    return () => {
      anime.remove(fills);
      if (ring) anime.remove(ring);
      if (counterTarget) anime.remove(counterTarget);
      if (fillAnim) fillAnim.pause();
      nextRef.current = () => {};
    };
  }, []);

  const advance = () => nextRef.current();

  const node = (isActive: boolean) => ({
    width: 52, height: 52, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: `1.5px solid ${isActive ? GREEN : RED}`, color: isActive ? GREEN : RED,
    background: isActive ? 'rgba(13,92,56,0.08)' : 'rgba(194,65,12,0.06)',
  }) as React.CSSProperties;

  const titleStyle: React.CSSProperties = { fontFamily: 'var(--display)', fontVariationSettings: '"opsz" 40', fontSize: 'var(--step-2)', fontWeight: 400, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' };
  const subStyle: React.CSSProperties = { fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', lineHeight: 'var(--lh-body)' };

  return (
    <div
      className="glass hero-story"
      data-flow-system
      ref={root}
      role="button"
      tabIndex={0}
      aria-label="Tap to see the next stage of the deliverability story"
      onClick={advance}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); } }}
      style={{ padding: 'var(--s5)', maxWidth: 380, marginLeft: 0, marginRight: 'auto', boxShadow: 'var(--shadow-lg)', cursor: 'pointer' }}
    >
      {/* story progress segments */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 'var(--s4)' }}>
        {STAGES.map((_, i) => (
          <span key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--rule)', overflow: 'hidden' }}>
            <i data-fill style={{ display: 'block', width: '100%', height: '100%', background: 'var(--green)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
          </span>
        ))}
      </div>

      {/* stage viewport */}
      <div style={{ position: 'relative', height: 184 }}>
        {STAGES.map((s, i) => (
          <div
            key={s.key}
            data-panel
            data-active={i === active ? 'true' : undefined}
            style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}
          >
            {/* visual */}
            {s.key === 'flagged' && <span style={node(false)}><Ban size={22} strokeWidth={2} /></span>}
            {s.key === 'targeted' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={node(true)}><Target size={22} strokeWidth={2} /></span>
                <div style={{ display: 'grid', gap: 4 }}>
                  {['Acme Co · score 9', 'Northwind · score 8'].map(t => (
                    <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mid)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: 'var(--green)' }}>✓</span>{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {s.key === 'hardened' && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                {['SPF', 'DKIM', 'DMARC'].map(c => (
                  <span key={c} style={{ flex: '1 1 0', maxWidth: 108, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.02em', color: GREEN, border: `1px solid ${GREEN}`, background: 'rgba(13,92,56,0.06)', borderRadius: 12, padding: '12px 6px' }}>
                    <ShieldCheck size={16} strokeWidth={2} />
                    {c}
                  </span>
                ))}
              </div>
            )}
            {s.key === 'warmed' && (
              <div style={{ position: 'relative', width: 56, height: 56 }}>
                <svg viewBox="0 0 56 56" width="56" height="56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="var(--rule)" strokeWidth="4" />
                  <circle data-ring cx="28" cy="28" r="22" fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeDasharray="138.23" strokeDashoffset="138.23" transform="rotate(-90 28 28)" />
                </svg>
                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: 18, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
                  <span data-days>0</span><small style={{ fontSize: 10, color: 'var(--mid)' }}>d</small>
                </span>
              </div>
            )}
            {s.key === 'delivered' && <span style={node(true)}><MailCheck size={22} strokeWidth={2} /></span>}

            <div>
              <div style={titleStyle}>
                {s.key === 'delivered' ? <><span data-score>0</span> / 10 · Delivered</> : s.title}
              </div>
              <p style={{ ...subStyle, marginTop: 4 }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
