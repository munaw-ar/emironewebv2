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
          <div className="glass" style={{ padding: 'var(--s5)', marginTop: 'var(--s5)', marginBottom: 'var(--s5)' }}>
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
            className="cta"
            style={{
              fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em',
              padding: '15px 32px', minHeight: 48,
            }}
          >
            Reserve your Sprint →
          </button>
        </div>
      </div>
    </section>
  );
}
