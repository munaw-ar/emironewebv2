import type { CSSProperties } from 'react';
import DomainHealthChecker from './DomainHealthChecker';
import HeroStory from './HeroStory';

const HERO_WORDS = [
  'Your', 'cold', 'email', 'is', 'failing.',
  'We', 'fix', 'the', 'infrastructure,',
  'not', 'the', 'copy.',
];
// "We fix the infrastructure," — the green italic accent phrase
const ACCENT_FROM = 5;
const ACCENT_TO = 8;

export default function Hero() {
  return (
    <section aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'clamp(36px, 5vw, 72px) 0 clamp(28px, 4vw, 52px)',
      background: 'radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)',
      borderBottom: '1px solid var(--rule)',
      overflow: 'hidden',
    }}>
      <div className="w hero-grid">
        {/* Left — message + action */}
        <div>
          <div className="section-eyebrow" style={{ paddingTop: 0, color: 'var(--green)', marginBottom: 'var(--s3)' }}>
            <a href="#sharia" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 }}>Sharia-Aligned</a>{' '}· Ethical Cold Email Infrastructure
          </div>
          <h1 className="h-hero word-reveal" style={{ maxWidth: 760, marginBottom: 'var(--s4)' }}>
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
          <p className="measure-lead" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-1)', color: 'var(--mid)', lineHeight: 'var(--lh-lead)', marginBottom: 'var(--s4)' }}>
            Score your domain free — see exactly what's killing your deliverability before we talk.
          </p>
          <DomainHealthChecker />
        </div>

        {/* Right — animated "path to the inbox" story (signature visual) */}
        <div className="hero-aside">
          <HeroStory />
        </div>
      </div>

      {/* Full-width metric bar */}
      <div className="w hero-stats" style={{ marginTop: 'var(--s4)', paddingTop: 'var(--s3)', borderTop: '1px solid var(--rule)' }}>
        {[
          { n: '10 / 10', l: 'MXToolbox domain score' },
          { n: '21-day', l: 'Monitored warm-up' },
          { n: 'SPF·DKIM·DMARC', l: 'Hardened on every domain' },
        ].map((stat) => (
          <div key={stat.l} className="hero-stat">
            <div className="tnum" style={{ fontFamily: 'var(--display)', fontVariationSettings: '"opsz" 72', fontSize: 'var(--step-2)', fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--ink)', lineHeight: 1.2 }}>{stat.n}</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', marginTop: 4 }}>{stat.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
