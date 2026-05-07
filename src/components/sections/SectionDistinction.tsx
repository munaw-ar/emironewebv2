export default function SectionDistinction() {
  const rows = [
    { feature: 'SPF/DKIM/DMARC setup', emirOne: true, agency: false, inhouse: false },
    { feature: 'Domain warm-up protocol', emirOne: true, agency: false, inhouse: false },
    { feature: 'Secondary domain strategy', emirOne: true, agency: false, inhouse: false },
    { feature: 'Third-party verified scores', emirOne: true, agency: false, inhouse: false },
    { feature: 'Sharia-aligned practices', emirOne: true, agency: false, inhouse: false },
    { feature: 'Live campaign dashboard', emirOne: true, agency: false, inhouse: true },
    { feature: 'ICP-scored target list', emirOne: true, agency: true, inhouse: false },
  ];
  const tick = (v: boolean) => (
    <span style={{ color: v ? 'var(--green)' : 'var(--rule)', fontSize: 16 }}>{v ? '✓' : '—'}</span>
  );
  return (
    <section aria-labelledby="compare-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper-2)' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', paddingTop: 8 }}>
          05 — The Distinction
        </div>
        <div>
          <h2 id="compare-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 40 }}>
            What you actually get that <em>you can't buy anywhere else.</em>
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--body)', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--rule)' }}>
                <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--mid)', fontWeight: 500 }}>Feature</th>
                <th style={{ textAlign: 'center', padding: '10px 16px', color: 'var(--green)', fontWeight: 600 }}>Emir One</th>
                <th style={{ textAlign: 'center', padding: '10px 16px', color: 'var(--mid)', fontWeight: 500 }}>Agency</th>
                <th style={{ textAlign: 'center', padding: '10px 16px', color: 'var(--mid)', fontWeight: 500 }}>In-house</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.feature} style={{ borderBottom: '1px solid var(--rule-2)' }}>
                  <td style={{ padding: '12px 0', color: 'var(--ink)' }}>{row.feature}</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px' }}>{tick(row.emirOne)}</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px' }}>{tick(row.agency)}</td>
                  <td style={{ textAlign: 'center', padding: '12px 16px' }}>{tick(row.inhouse)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
