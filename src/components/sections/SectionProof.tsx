export default function SectionProof() {
  const domains = [
    { domain: 'emirone.co', score: '10 / 10' },
    { domain: 'tracemail.co', score: '10 / 10' },
    { domain: 'sendvault.co', score: '10 / 10' },
  ];
  const verifyUrl = (d: string) =>
    `https://mxtoolbox.com/SuperTool.aspx?action=mx%3a${encodeURIComponent(d)}&run=toolpage`;
  return (
    <section aria-labelledby="proof-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          06 — Proof of Work
        </div>
        <div>
          <h2 id="proof-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-3)', fontWeight: 300, lineHeight: 'var(--lh-h2)', letterSpacing: 'var(--track-h2)', color: 'var(--ink)', marginBottom: 'var(--s4)', textWrap: 'balance' }}>
            Public infrastructure verification. <em>Check it yourself.</em>
          </h2>
          <p className="reveal reveal-delay-1 measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--s5)' }}>
            Every domain we build scores 10/10. MXToolbox and GlockApps are the arbiters — not our word.
          </p>
          <div style={{ border: '1px solid var(--rule)', borderRadius: 4, overflow: 'hidden' }}>
            <table className="stack-table" style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)', fontSize: 13 }}>
              <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                Domains we have built and their third-party verified deliverability scores
              </caption>
              <thead style={{ background: 'var(--paper-2)' }}>
                <tr>
                  <th scope="col" style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--mid)', fontWeight: 500 }}>Domain</th>
                  <th scope="col" style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--mid)', fontWeight: 500 }}>Auth</th>
                  <th scope="col" style={{ textAlign: 'right', padding: '12px 16px', color: 'var(--mid)', fontWeight: 500 }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((d, i) => (
                  <tr key={d.domain} style={{ borderTop: i > 0 ? '1px solid var(--rule-2)' : undefined }}>
                    <td data-label="Domain" style={{ padding: '14px 16px', color: 'var(--ink)' }}>{d.domain}</td>
                    <td data-label="Auth" style={{ padding: '14px 16px' }}>
                      {['SPF', 'DKIM', 'DMARC'].map(tag => (
                        <span key={tag} style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: 'var(--green)', border: '1px solid var(--green)', borderRadius: 2, padding: '1px 5px', marginRight: 4 }}>{tag}</span>
                      ))}
                    </td>
                    <td data-label="Score" className="tnum" style={{ padding: '14px 16px', textAlign: 'right', color: 'var(--green)', fontWeight: 600 }}>
                      <a
                        href={verifyUrl(d.domain)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--green)', textDecoration: 'none' }}
                      >
                        {d.score} <span style={{ color: 'var(--mid)', fontWeight: 400 }}>↗ verify</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tnum" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mid)', marginTop: 'var(--s3)' }}>
            Last verified 2 Jun 2026 — re-run any row above on MXToolbox.
          </p>
        </div>
      </div>
    </section>
  );
}
