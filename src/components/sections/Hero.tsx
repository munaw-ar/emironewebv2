import DomainHealthChecker from './DomainHealthChecker';

export default function Hero() {
  return (
    <section aria-label="Hero: Free Deliverability Health Score" style={{
      padding: 'clamp(72px, 10vw, 120px) 0 clamp(56px, 8vw, 96px)',
      background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
    }}>
      <div className="w">
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 20 }}>
          <a href="#sharia" style={{ color: 'inherit', textDecoration: 'none' }}>Sharia-Aligned</a>{' '}· Ethical Cold Email Infrastructure
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5.5vw, 68px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--ink)', maxWidth: 820, marginBottom: 28 }}>
          Your cold email is failing. <em>We fix the infrastructure,</em> not the copy.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'var(--mid)', maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
          Score your domain free — see exactly what's killing your deliverability before we talk.
        </p>
        <DomainHealthChecker />
        <div style={{ display: 'flex', gap: 32, marginTop: 52, paddingTop: 28, borderTop: '1px solid var(--rule)', flexWrap: 'wrap' }}>
          {[
            { n: '98.7%', l: 'Inbox placement' },
            { n: 'Sprint', l: 'Full build time' },
            { n: '0 / 92', l: 'Blacklists' },
          ].map(stat => (
            <div key={stat.l}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', lineHeight: 1.2 }}>{stat.n}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mid)', marginTop: 2 }}>{stat.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
