import type { CSSProperties } from 'react';
import DomainHealthChecker from './DomainHealthChecker';

const HERO_WORDS = [
  'Your', 'cold', 'email', 'is', 'failing.',
  'We', 'fix', 'the', 'infrastructure,',
  'not', 'the', 'copy.',
];
// "We fix the infrastructure," — the green accent phrase
const ACCENT_FROM = 5;
const ACCENT_TO = 8;

export default function Hero() {
  return (
    <section aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'var(--section-y-lg) 0 var(--section-y)',
      background: 'radial-gradient(900px 520px at 82% -8%, rgba(47,210,127,0.12), transparent 60%), var(--paper)',
      borderBottom: '1px solid var(--rule)',
    }}>
      <div className="w">
        <div className="section-eyebrow" style={{ paddingTop: 0, color: 'var(--green)', marginBottom: 'var(--s4)' }}>
          <a href="#sharia" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 }}>Sharia-Aligned</a>{' '}· Ethical Cold Email Infrastructure
        </div>
        <h1 className="h-hero word-reveal" style={{ maxWidth: 900, marginBottom: 'var(--s5)' }}>
          {HERO_WORDS.map((word, i) => {
            const accent = i >= ACCENT_FROM && i <= ACCENT_TO;
            return (
              <span key={i}>
                <span
                  className="w-word"
                  style={{ '--i': i, color: accent ? 'var(--green)' : undefined } as CSSProperties}
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
        <div style={{ display: 'flex', gap: 0, marginTop: 'var(--s6)', paddingTop: 'var(--s4)', borderTop: '1px solid var(--rule)', flexWrap: 'wrap' }}>
          {[
            { n: '10 / 10', l: 'MXToolbox domain score' },
            { n: '21-day', l: 'Monitored warm-up' },
            { n: 'SPF·DKIM·DMARC', l: 'Hardened on every domain' },
          ].map((stat, i) => (
            <div key={stat.l} style={{ paddingLeft: i ? 'var(--s5)' : 0, marginLeft: i ? 'var(--s5)' : 0, borderLeft: i ? '1px solid var(--rule)' : 'none' }}>
              <div className="tnum" style={{ fontFamily: 'var(--display)', fontSize: 'var(--step-2)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1.2 }}>{stat.n}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', marginTop: 4 }}>{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
