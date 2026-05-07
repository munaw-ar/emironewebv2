export default function SectionProof() {
  const domains = [
    { domain: 'emirone.co', score: '10 / 10' },
    { domain: 'tracemail.co', score: '10 / 10' },
    { domain: 'sendvault.co', score: '10 / 10' },
  ];
  return (
    <section aria-labelledby="proof-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper)' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', paddingTop: 8 }}>
          06 — Proof of Work
        </div>
        <div>
          <h2 id="proof-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20 }}>
            Public infrastructure verification. <em>Check it yourself.</em>
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32 }}>
            Every domain we build scores 10/10. MXToolbox and GlockApps are the arbiters — not our word.
          </p>
          <div style={{ border: '1px solid var(--rule)', borderRadius: 4, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)', fontSize: 13 }}>
              <thead style={{ background: 'var(--paper-2)' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--mid)', fontWeight: 500 }}>Domain</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--mid)', fontWeight: 500 }}>Auth</th>
                  <th style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--mid)', fontWeight: 500 }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((d, i) => (
                  <tr key={d.domain} style={{ borderTop: i > 0 ? '1px solid var(--rule-2)' : undefined }}>
                    <td style={{ padding: '14px 16px', color: 'var(--ink)' }}>{d.domain}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {['SPF', 'DKIM', 'DMARC'].map(tag => (
                        <span key={tag} style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: 'var(--green)', border: '1px solid var(--green)', borderRadius: 2, padding: '1px 5px', marginRight: 4 }}>{tag}</span>
                      ))}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--green)', fontWeight: 600 }}>{d.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
