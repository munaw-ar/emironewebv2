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
    <section aria-labelledby="villain-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          <span className="sec-num">01</span>The Problem
        </div>
        <div>
          <h2 id="villain-h" className="reveal h-section" style={{ marginBottom: 'var(--s4)' }}>
            Your outbound is either <em>silent</em> — or burning your reputation.
          </h2>
          <p className="reveal reveal-delay-1 measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--s5)' }}>
            There isn't a third option in 2026. And your domain doesn't forgive.
          </p>
          <div className="grid-2">
            {failItems.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--mid)', marginTop: 3, flexShrink: 0 }}>—</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
            {passItems.map((text, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--green)', marginTop: 3, flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--ink)', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
