import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import DomainHealthChecker from './DomainHealthChecker';
import HeroStory from './HeroStory';
import HeroFlow from './HeroFlow';
import HeroMesh from './HeroMesh';

const HERO_WORDS = [
  'Your', 'cold', 'email', 'should', 'be',
  'booking', 'calls,', 'not', 'collecting', 'silence.',
  'We', 'build', 'the', 'entire', 'system', 'that', 'does.',
];
// "booking calls, not collecting silence." — the green italic accent phrase
const ACCENT_FROM = 5;
const ACCENT_TO = 9;

export default function Hero() {
  return (
    <section aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'clamp(48px, 6vw, 96px) 0 clamp(36px, 4vw, 64px)',
      background: 'radial-gradient(900px 520px at 88% -8%, rgba(52,211,153,0.12), transparent 60%), var(--paper)',
      borderBottom: '1px solid var(--rule)',
      overflow: 'hidden',
      position: 'relative',
      isolation: 'isolate',
    }}>
      {/* deepest layer: slowly colour-shifting green mesh gradient (monopo) */}
      <HeroMesh />
      {/* signature background motion: emails → the system → calls booked */}
      <HeroFlow />

      {/* Monumental statement — the type IS the composition (monopo) */}
      <div className="w" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-eyebrow" style={{ paddingTop: 0, color: 'var(--green)', marginBottom: 'var(--s4)' }}>
          <a href="#sharia" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationThickness: 1 }}>Sharia-Aligned</a>{' '}· Ethical Cold Email Infrastructure
        </div>
        <h1 className="h-hero h-hero--mono word-reveal" style={{ marginBottom: 'var(--s5)' }}>
          {HERO_WORDS.map((word, i) => {
            const accent = i >= ACCENT_FROM && i <= ACCENT_TO;
            return (
              <span key={i}>
                <span
                  className="w-word"
                  style={{
                    '--i': i,
                    color: accent ? 'var(--green)' : undefined,
                    fontWeight: accent ? 600 : undefined,
                  } as CSSProperties}
                >
                  {/* inner span does the moving; .w-word is the mask it rises out of */}
                  <span>{word}</span>
                </span>{' '}
              </span>
            );
          })}
        </h1>
        <p className="measure-lead" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-1)', color: 'var(--mid)', lineHeight: 'var(--lh-lead)', margin: 0 }}>
          Score your domain free — see exactly what's killing your deliverability before we talk.
        </p>
      </div>

      {/* Hairline divider — monopo's sole structural element */}
      <div className="w" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-rule" />
      </div>

      {/* Action band — domain checker + the animated story card */}
      <div className="w hero-band" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-band-action" data-flow-source>
          <DomainHealthChecker />
          <Link
            to="/research"
            className="hero-research-cta"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 'var(--s4)',
              fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--green)', textDecoration: 'none',
              border: '1px solid var(--green)', borderRadius: 999, padding: '12px 24px', minHeight: 44,
            }}
          >
            See the research <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="hero-aside">
          <HeroStory />
        </div>
      </div>
    </section>
  );
}
