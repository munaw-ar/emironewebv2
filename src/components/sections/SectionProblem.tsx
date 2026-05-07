export default function SectionProblem() {
  const failItems = [
    'SPF soft-fail · DKIM missing · DMARC p=none.',
    'Warming with a tool, not a strategy.',
    'Primary domain used for cold sends.',
    'No MXToolbox baseline before launch.',
  ];
  const passItems = [
    'SPF aligned · DKIM valid · DMARC p=quarantine with reporting.',
    'Secondary domains only. Primary stays clean.',
  ];
  return (
    <section aria-labelledby="villain-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper)' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', paddingTop: 8 }}>
          01 — The Problem
        </div>
        <div>
          <h2 id="villain-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20 }}>
            Your outbound is either <em>silent</em> — or burning your reputation.
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32, maxWidth: 600 }}>
            There isn't a third option in 2026. And your domain doesn't forgive.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {failItems.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mid)', marginTop: 2, flexShrink: 0 }}>—</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
            {passItems.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--green)', marginTop: 2, flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
