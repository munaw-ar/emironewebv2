import { Link } from 'react-router-dom';

export default function SectionEthics() {
  const principles = [
    { title: 'Truthfulness (Sidq)', body: 'Every claim in our outreach is verifiable. No false urgency, no inflated stats, no fabricated social proof.' },
    { title: 'Fairness (Adl)', body: 'We only target firms that genuinely fit the offer. Spray-and-pray is haram — and it destroys deliverability.' },
    { title: 'No harm (La Darar)', body: 'We never contact individuals outside business hours, never use deceptive subject lines, and immediately remove any opt-out.' },
    { title: 'Transparency (Wudhuh)', body: 'Every prospect knows who we are, who we represent, and what we are offering. No mystery, no misdirection.' },
  ];
  return (
    <section id="sharia" aria-labelledby="sharia-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper)' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', paddingTop: 8 }}>
          03 — Ethics &amp; Transparency
        </div>
        <div>
          <h2 id="sharia-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20 }}>
            Sharia-aligned outbound. <em>What that actually means.</em>
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 40 }}>
            Honesty, fairness, and respect for all parties — operationalized in every campaign decision.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
            {principles.map(p => (
              <div key={p.title} style={{ padding: '20px 0', borderTop: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 400, color: 'var(--ink)', marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mid)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
          <Link to="/sharia-aligned" style={{ fontFamily: 'var(--body)', fontSize: 13, fontWeight: 500, color: 'var(--green)', letterSpacing: '0.04em' }}>
            Read the full ethics framework →
          </Link>
        </div>
      </div>
    </section>
  );
}
