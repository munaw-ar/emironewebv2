import DomainHealthChecker from './DomainHealthChecker';

export default function Hero() {
  return (
    <section aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'var(--section-y-lg) 0 var(--section-y)',
      background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
    }}>
      <div className="w">
        <div className="section-eyebrow" style={{ paddingTop: 0, color: 'var(--green)', marginBottom: 'var(--s4)' }}>
          <a href="#sharia" style={{ color: 'inherit', textDecoration: 'none' }}>Sharia-Aligned</a>{' '}· Ethical Cold Email Infrastructure
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-5)', fontWeight: 300, lineHeight: 'var(--lh-display)', letterSpacing: 'var(--track-display)', color: 'var(--ink)', maxWidth: 820, marginBottom: 'var(--s5)', textWrap: 'balance' }}>
          Your cold email is failing. <em>We fix the infrastructure,</em> not the copy.
        </h1>
        <p className="measure-lead" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-1)', color: 'var(--mid)', lineHeight: 'var(--lh-lead)', marginBottom: 'var(--s6)' }}>
          Score your domain free — see exactly what's killing your deliverability before we talk. Sprints start at $1,000.
        </p>
        <DomainHealthChecker />
        <div style={{ display: 'flex', gap: 'var(--s5)', marginTop: 'var(--s6)', paddingTop: 'var(--s4)', borderTop: '1px solid var(--rule)', flexWrap: 'wrap' }}>
          {[
            { n: '10 / 10', l: 'MXToolbox domain score' },
            { n: '21-day', l: 'Monitored warm-up' },
            { n: 'SPF·DKIM·DMARC', l: 'Hardened on every domain' },
          ].map(stat => (
            <div key={stat.l}>
              <div className="tnum" style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-2)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.2 }}>{stat.n}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', marginTop: 2 }}>{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
