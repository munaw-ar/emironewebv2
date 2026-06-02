import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Ban, Target, ShieldCheck, MailCheck } from 'lucide-react';

/**
 * The hero's signature animation: an auto-playing "story" of Emir One —
 * a cold email's path to the inbox. Five stages cross-fade on a looping
 * anime.js timeline with story-style progress segments. Replaces the static
 * DNS report card. Falls back to the final (Delivered) stage under
 * prefers-reduced-motion.
 */
const STAGES = [
  { key: 'flagged',   title: 'Flagged',              sub: 'Primary domain, SPF soft-fail, DMARC p=none — straight to spam.' },
  { key: 'targeted',  title: 'Targeted',             sub: 'ICP-scored 7+ on a weighted signal sheet, manually verified — quality over volume.' },
  { key: 'hardened',  title: 'Hardened',             sub: 'Secondary domains, SPF · DKIM · DMARC aligned and MXToolbox-verified.' },
  { key: 'warmed',    title: 'Warmed',               sub: 'A 21-day reputation ramp, monitored daily before scale.' },
  { key: 'delivered', title: '10 / 10 · Delivered',  sub: 'In the inbox — consent-first, Sharia-aligned, every claim verifiable.' },
];

const STAGE_MS = 2200;
const RED = '#C2410C';
const GREEN = '#0D5C38';

export default function HeroStory() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const panels = el.querySelectorAll<HTMLElement>('[data-panel]');
    const fills = el.querySelectorAll<HTMLElement>('[data-fill]');
    const ring = el.querySelector<SVGCircleElement>('[data-ring]');
    const days = el.querySelector<HTMLElement>('[data-days]');
    const score = el.querySelector<HTMLElement>('[data-score]');
    const CIRC = 138.23; // 2π·22

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      panels.forEach((p, i) => { p.style.opacity = i === panels.length - 1 ? '1' : '0'; });
      fills.forEach(f => { f.style.transform = 'scaleX(1)'; });
      if (ring) ring.style.strokeDashoffset = '0';
      if (days) days.textContent = '21';
      if (score) score.textContent = '10';
      return;
    }

    const tl = anime.timeline({ loop: true, easing: 'easeOutExpo', autoplay: true });

    STAGES.forEach((_, i) => {
      const at = i * STAGE_MS;
      // progress segment fills across the stage
      tl.add({ targets: fills[i], scaleX: [0, 1], duration: STAGE_MS - 120, easing: 'linear' }, at);
      // panel in
      tl.add({ targets: panels[i], opacity: [0, 1], translateY: [16, 0], scale: [0.96, 1], duration: 520 }, at);

      if (i === 3 && ring) {
        tl.add({ targets: ring, strokeDashoffset: [CIRC, 0], duration: STAGE_MS - 500, easing: 'easeInOutQuart' }, at + 200);
        tl.add({ targets: { v: 0 }, v: 21, round: 1, duration: STAGE_MS - 500, easing: 'easeInOutQuart',
          update: (a: any) => { if (days) days.textContent = String(a.animations[0].currentValue); } }, at + 200);
      }
      if (i === 4 && score) {
        tl.add({ targets: { v: 0 }, v: 10, round: 1, duration: 700,
          update: (a: any) => { if (score) score.textContent = String(a.animations[0].currentValue); } }, at + 250);
      }
      // panel out (all but the last hold a beat longer before loop)
      if (i < STAGES.length - 1) {
        tl.add({ targets: panels[i], opacity: [1, 0], translateY: [0, -14], duration: 400, easing: 'easeInQuad' }, at + STAGE_MS - 280);
      } else {
        // last stage holds, then fade before loop restart
        tl.add({ targets: panels[i], opacity: [1, 0], duration: 450, easing: 'easeInQuad' }, at + STAGE_MS + 700);
        tl.add({ targets: fills, scaleX: 0, duration: 350, easing: 'easeInQuad' }, at + STAGE_MS + 700);
      }
    });

    return () => { anime.remove(panels); anime.remove(fills); if (ring) anime.remove(ring); };
  }, []);

  const node = (active: boolean) => ({
    width: 52, height: 52, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: `1.5px solid ${active ? GREEN : RED}`, color: active ? GREEN : RED,
    background: active ? 'rgba(13,92,56,0.08)' : 'rgba(194,65,12,0.06)',
  }) as React.CSSProperties;

  const titleStyle: React.CSSProperties = { fontFamily: 'var(--display)', fontVariationSettings: '"opsz" 40', fontSize: 'var(--step-2)', fontWeight: 400, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' };
  const subStyle: React.CSSProperties = { fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', lineHeight: 'var(--lh-body)' };

  return (
    <div className="glass hero-story" ref={root} style={{ padding: 'var(--s5)', maxWidth: 420, marginLeft: 'auto', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s3)' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>The path to the inbox</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)' }}>
          <span className="animate-breathe" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} /> Live
        </span>
      </div>

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
        {STAGES.map((s) => (
          <div key={s.key} data-panel style={{ position: 'absolute', inset: 0, opacity: 0, display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
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
