import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import DomainHealthChecker from './DomainHealthChecker';

const HERO_WORDS = [
  'Your', 'cold', 'email', 'is', 'failing.',
  'We', 'fix', 'the', 'infrastructure,',
  'not', 'the', 'copy.',
];
// "We fix the infrastructure," — the green italic accent phrase
const ACCENT_FROM = 5;
const ACCENT_TO = 8;

const CHECKS = ['SPF', 'DKIM', 'DMARC', 'MX'];

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Gentle scroll parallax on the score card (desktop, motion-allowed only).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 980px)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.08, 44);
        if (cardRef.current) cardRef.current.style.transform = `translate3d(0, ${-offset}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'var(--section-y-lg) 0 var(--section-y)',
      background: 'radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)',
      borderBottom: '1px solid var(--rule)',
      overflow: 'hidden',
    }}>
      <div className="w hero-grid">
        {/* Left — message + action */}
        <div>
          <div className="section-eyebrow" style={{ paddingTop: 0, color: 'var(--green)', marginBottom: 'var(--s4)' }}>
            <a href="#sharia" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 }}>Sharia-Aligned</a>{' '}· Ethical Cold Email Infrastructure
          </div>
          <h1 className="h-hero word-reveal" style={{ maxWidth: 760, marginBottom: 'var(--s5)' }}>
            {HERO_WORDS.map((word, i) => {
              const accent = i >= ACCENT_FROM && i <= ACCENT_TO;
              return (
                <span key={i}>
                  <span
                    className="w-word"
                    style={{
                      '--i': i,
                      color: accent ? 'var(--green)' : undefined,
                      fontStyle: accent ? 'italic' : undefined,
                    } as CSSProperties}
                  >
                    {word}
                  </span>{' '}
                </span>
              );
            })}
          </h1>
          <p className="measure-lead" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-1)', color: 'var(--mid)', lineHeight: 'var(--lh-lead)', marginBottom: 'var(--s6)' }}>
            Score your domain free — see exactly what's killing your deliverability before we talk.
          </p>
          <DomainHealthChecker />
        </div>

        {/* Right — live domain score card (signature visual) */}
        <div className="hero-aside" ref={cardRef} style={{ willChange: 'transform' }}>
          <div className="glass" style={{ padding: 'var(--s5)', maxWidth: 400, marginLeft: 'auto', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--s4)' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 6 }}>
                  DNS Health Report
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 15, color: 'var(--ink)' }}>emirone.co</div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)', border: '1px solid var(--green)', borderRadius: 999, padding: '4px 10px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} className="animate-breathe" /> Live
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingBottom: 'var(--s4)', borderBottom: '1px solid var(--rule)', marginBottom: 'var(--s4)' }}>
              <span className="tnum" style={{ fontFamily: 'var(--display)', fontVariationSettings: '"opsz" 144', fontSize: 64, fontWeight: 400, lineHeight: 1, color: 'var(--ink)' }}>10</span>
              <span style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--mid)' }}>/ 10</span>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {CHECKS.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink)', letterSpacing: '0.04em' }}>{c}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)' }}>
                    Passed
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: 'rgba(13,92,56,0.10)', color: 'var(--green)', fontSize: 11 }}>✓</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--s4)', paddingTop: 'var(--s3)', borderTop: '1px solid var(--rule-2)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mid)' }}>
              Verified · MXToolbox
            </div>
          </div>
        </div>
      </div>

      {/* Full-width metric bar */}
      <div className="w" style={{ display: 'flex', gap: 0, marginTop: 'var(--s7)', paddingTop: 'var(--s4)', borderTop: '1px solid var(--rule)', flexWrap: 'wrap' }}>
        {[
          { n: '10 / 10', l: 'MXToolbox domain score' },
          { n: '21-day', l: 'Monitored warm-up' },
          { n: 'SPF·DKIM·DMARC', l: 'Hardened on every domain' },
        ].map((stat, i) => (
          <div key={stat.l} style={{ paddingLeft: i ? 'var(--s5)' : 0, marginLeft: i ? 'var(--s5)' : 0, borderLeft: i ? '1px solid var(--rule)' : 'none' }}>
            <div className="tnum" style={{ fontFamily: 'var(--display)', fontVariationSettings: '"opsz" 72', fontSize: 'var(--step-2)', fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.2 }}>{stat.n}</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', marginTop: 4 }}>{stat.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
