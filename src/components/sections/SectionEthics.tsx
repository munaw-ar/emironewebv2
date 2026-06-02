import { Link } from 'react-router-dom';

export default function SectionEthics() {
  const principles = [
    { title: 'Truthfulness (Sidq)', body: 'Every claim in our outreach is verifiable. No false urgency, no inflated stats, no fabricated social proof.' },
    { title: 'Fairness (Adl)', body: 'We only target firms that genuinely fit the offer. Spray-and-pray is haram — and it destroys deliverability.' },
    { title: 'No harm (La Darar)', body: 'We never contact individuals outside business hours, never use deceptive subject lines, and immediately remove any opt-out.' },
    { title: 'Transparency (Wudhuh)', body: 'Every prospect knows who we are, who we represent, and what we are offering. No mystery, no misdirection.' },
  ];
  return (
    <section id="sharia" aria-labelledby="sharia-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          03 — Ethics &amp; Transparency
        </div>
        <div>
          <h2 id="sharia-h" className="reveal h-section" style={{ marginBottom: 'var(--s4)' }}>
            Sharia-aligned outbound. <em>What that actually means.</em>
          </h2>
          <p className="reveal reveal-delay-1 measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)', marginBottom: 'var(--s6)' }}>
            Honesty, fairness, and respect for all parties — operationalized in every campaign decision.
          </p>
          <div className="grid-2" style={{ marginBottom: 'var(--s6)' }}>
            {principles.map(p => (
              <div key={p.title} style={{ padding: 'var(--s4) 0', borderTop: '1px solid var(--rule)' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-1)', fontWeight: 400, color: 'var(--ink)', marginBottom: 'var(--s2)' }}>{p.title}</div>
                <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--mid)', lineHeight: 'var(--lh-body)' }}>{p.body}</p>
              </div>
            ))}
          </div>
          <Link to="/sharia-aligned" className="link-wipe" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', fontWeight: 500, color: 'var(--green)', letterSpacing: '0.04em' }}>
            Read the full ethics framework →
          </Link>
        </div>
      </div>
    </section>
  );
}
