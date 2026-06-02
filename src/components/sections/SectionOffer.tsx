import { useNavigate } from 'react-router-dom';

export default function SectionOffer() {
  const navigate = useNavigate();
  const deliverables = [
    '2–3 secondary sending domains, SPF/DKIM/DMARC hardened and MXToolbox-verified.',
    'A 500-contact target list, ICP-scored 7+ on our weighted signal sheet.',
    'Fully warmed sending inboxes (21-day protocol, monitored daily).',
    'Sequenced copy — 3 touches, written for your ICP, reviewed against deliverability rules.',
    'A live campaign dashboard with reply tracking and domain health scores.',
  ];
  const tiers = [
    { name: 'Diagnostic', price: 'Free', scope: '30-min call — we score your setup live.' },
    { name: 'Sprint', price: 'From $1,000', scope: '2–3 domains, full build, warmed and verified.' },
    { name: 'Ongoing', price: 'Scoped', scope: 'Monitoring & maintenance after the Sprint.' },
  ];
  return (
    <section id="sprint" aria-labelledby="offer-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          04 — The Offer
        </div>
        <div>
          <h2 id="offer-h" className="reveal h-section" style={{ marginBottom: 'var(--s4)' }}>
            For firms ready to <em>build the system</em>, not just audit it.
          </h2>
          <div style={{ border: '1px solid var(--rule)', borderRadius: 4, padding: 'var(--s5)', marginTop: 'var(--s5)', marginBottom: 'var(--s5)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="section-eyebrow" style={{ paddingTop: 0, marginBottom: 'var(--s3)', fontFamily: 'var(--mono)', letterSpacing: '0.12em' }}>
              The Sprint — Deliverables
            </div>
            <div style={{ display: 'grid', gap: 'var(--s3)' }}>
              {deliverables.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', marginTop: 3, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 'var(--step-0)', color: 'var(--ink)', lineHeight: 'var(--lh-body)' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Transparent price ladder */}
            <div style={{ marginTop: 'var(--s5)', paddingTop: 'var(--s4)', borderTop: '1px solid var(--rule-2)', display: 'grid', gap: 'var(--s3)' }}>
              {tiers.map(t => (
                <div key={t.name} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--s2)' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--mid)', minWidth: 88 }}>{t.name}</span>
                  <span style={{ flex: 1, fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)' }}>{t.scope}</span>
                  <span className="tnum" style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-1)', fontWeight: 300, color: 'var(--ink)' }}>{t.price}</span>
                </div>
              ))}
              <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', marginTop: 'var(--s1)' }}>
                — final scope set on the call.
              </p>
            </div>

            {/* Named, falsifiable guarantee */}
            <div style={{ marginTop: 'var(--s5)', paddingTop: 'var(--s4)', borderTop: '1px solid var(--rule-2)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 'var(--s2)' }}>
                The Day-14 Standard
              </div>
              <p className="measure" style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-1)', fontWeight: 300, lineHeight: 'var(--lh-lead)', color: 'var(--ink)' }}>
                9.5/10 on MXToolbox by Day 14 — or we work free until it clears, or full refund. Your choice.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/book')}
            style={{
              fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em',
              padding: '14px 28px', minHeight: 44, background: 'var(--green)', color: 'var(--paper)',
              border: 'none', borderRadius: 3, cursor: 'pointer',
            }}
          >
            Reserve your Sprint →
          </button>
        </div>
      </div>
    </section>
  );
}
