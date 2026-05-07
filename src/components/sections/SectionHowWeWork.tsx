export default function SectionHowWeWork() {
  const principles = [
    {
      num: '01',
      title: 'Infrastructure before copy.',
      body: 'No message survives a broken sending stack. SPF, DKIM, DMARC, domain warm-up — these come first, always.',
    },
    {
      num: '02',
      title: 'Everything verifiable.',
      body: 'Every claim we make about your deliverability is backed by a third-party tool you can check yourself. MXToolbox, GlockApps, Mail-Tester.',
    },
    {
      num: '03',
      title: 'One primary domain. Never touched.',
      body: 'Cold outreach runs on secondary domains only. Your brand domain stays clean for transactional email and brand reputation.',
    },
  ];
  return (
    <section aria-labelledby="guide-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper-2)' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', paddingTop: 8 }}>
          02 — How We Work
        </div>
        <div>
          <h2 id="guide-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20 }}>
            Infrastructure first. Copy second. <em>Claims always verifiable.</em>
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 40 }}>
            Three operating principles. No marketing philosophy.
          </p>
          <div style={{ display: 'grid', gap: 28 }}>
            {principles.map(p => (
              <div key={p.num} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 20 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mid)', paddingTop: 3 }}>{p.num}</div>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 400, color: 'var(--ink)', marginBottom: 8 }}>{p.title}</div>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
