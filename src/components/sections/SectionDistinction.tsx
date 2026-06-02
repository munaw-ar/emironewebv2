type Rating = 'yes' | 'partial' | 'no';

interface Row {
  feature: string;
  emir: Rating;
  agency: Rating;
  inhouse: Rating;
}

export default function SectionDistinction() {
  // Honest, research-backed capability map. Emir One is deliberately "Partial"
  // where the reality is partial (warm-up, ICP) — that is what makes it credible.
  const rows: Row[] = [
    { feature: 'SPF / DKIM / DMARC alignment', emir: 'yes', agency: 'yes', inhouse: 'partial' },
    { feature: 'Secondary domain architecture', emir: 'yes', agency: 'yes', inhouse: 'partial' },
    { feature: 'Warm-up protocol', emir: 'partial', agency: 'partial', inhouse: 'partial' },
    { feature: 'Third-party verified scores', emir: 'yes', agency: 'partial', inhouse: 'no' },
    { feature: 'ICP list scoring', emir: 'partial', agency: 'partial', inhouse: 'yes' },
    { feature: 'Live campaign dashboard', emir: 'yes', agency: 'partial', inhouse: 'no' },
    { feature: 'You own the domains & data', emir: 'yes', agency: 'no', inhouse: 'yes' },
    { feature: 'Sharia-aligned / consent ethics', emir: 'yes', agency: 'no', inhouse: 'no' },
  ];

  const cell = (v: Rating) => {
    if (v === 'yes') return <span style={{ color: 'var(--green)', fontSize: 15, fontWeight: 600 }}>✓</span>;
    if (v === 'partial') return <span style={{ color: 'var(--mid)', fontSize: 12 }}>Partial</span>;
    return <span style={{ color: 'var(--rule)', fontSize: 15 }} aria-label="no">—</span>;
  };

  return (
    <section aria-labelledby="compare-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper-2)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          05 — The Distinction
        </div>
        <div>
          <h2 id="compare-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-3)', fontWeight: 300, lineHeight: 'var(--lh-h2)', letterSpacing: 'var(--track-h2)', color: 'var(--ink)', marginBottom: 'var(--s4)', textWrap: 'balance' }}>
            An honest look at <em>who does what.</em>
          </h2>
          <p className="reveal reveal-delay-1 measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--s6)' }}>
            We're not the answer to everything. Where in-house or a generalist agency genuinely wins, we say so.
          </p>
          <table className="stack-table" style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--body)', fontSize: 13 }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              Capability comparison between Emir One, a typical generalist agency, and an in-house team
            </caption>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--rule)' }}>
                <th scope="col" style={{ textAlign: 'left', padding: '10px 0', color: 'var(--mid)', fontWeight: 500 }}>Capability</th>
                <th scope="col" style={{ textAlign: 'center', padding: '10px 16px', color: 'var(--green)', fontWeight: 600 }}>Emir One</th>
                <th scope="col" style={{ textAlign: 'center', padding: '10px 16px', color: 'var(--mid)', fontWeight: 500 }}>Typical agency</th>
                <th scope="col" style={{ textAlign: 'center', padding: '10px 16px', color: 'var(--mid)', fontWeight: 500 }}>In-house</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.feature} style={{ borderBottom: '1px solid var(--rule-2)' }}>
                  <td data-label="Capability" style={{ padding: '12px 0', color: 'var(--ink)' }}>{row.feature}</td>
                  <td data-label="Emir One" style={{ textAlign: 'center', padding: '12px 16px' }}>{cell(row.emir)}</td>
                  <td data-label="Typical agency" style={{ textAlign: 'center', padding: '12px 16px' }}>{cell(row.agency)}</td>
                  <td data-label="In-house" style={{ textAlign: 'center', padding: '12px 16px' }}>{cell(row.inhouse)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', lineHeight: 'var(--lh-caption)', marginTop: 'var(--s4)' }}>
            “Partial” means honestly partial. Warm-up, for instance, is partial for everyone — bot warm-up is increasingly filter-detected, so no provider should claim it as solved. Where we differ is ownership and ethics: your domains are registered to you from day one, and consent-first, Sharia-aligned outreach isn't standard anywhere else.
          </p>
        </div>
      </div>
    </section>
  );
}
