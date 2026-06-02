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
    <section aria-labelledby="guide-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper-2)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          02 — How We Work
        </div>
        <div>
          <h2 id="guide-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-3)', fontWeight: 300, lineHeight: 'var(--lh-h2)', letterSpacing: 'var(--track-h2)', color: 'var(--ink)', marginBottom: 'var(--s4)', textWrap: 'balance' }}>
            Infrastructure first. Copy second. <em>Claims always verifiable.</em>
          </h2>
          <p className="reveal reveal-delay-1 measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--s6)' }}>
            Three operating principles. No marketing philosophy.
          </p>
          <div style={{ display: 'grid', gap: 'var(--s5)' }}>
            {principles.map(p => (
              <div key={p.num} className="reveal" style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 'var(--s4)' }}>
                <div className="tnum" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', paddingTop: 4 }}>{p.num}</div>
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-1)', fontWeight: 400, color: 'var(--ink)', marginBottom: 'var(--s2)' }}>{p.title}</div>
                  <p className="measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)' }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
