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
    <section id="sprint" aria-labelledby="offer-h" style={{ padding: 'clamp(64px, 8vw, 104px) 0', background: 'var(--paper)' }}>
      <div className="w" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,180px) 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--mid)', paddingTop: 8 }}>
          04 — The Offer
        </div>
        <div>
          <h2 id="offer-h" className="reveal" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 300, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 20 }}>
            For firms ready to <em>build the system</em>, not just audit it.
          </h2>
          <div style={{ border: '1px solid var(--rule)', borderRadius: 4, padding: '32px', marginTop: 32, marginBottom: 32 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 16 }}>
              The Sprint — Deliverables
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {deliverables.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--green)', marginTop: 1, flexShrink: 0 }}>—</span>
                  <span style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--rule-2)', fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mid)', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--ink)' }}>Guarantee:</strong> If at Day 14 your domain health score is below 9.5/10 (verified via MXToolbox), we work free until fixed — or you get a full refund.
            </div>
          </div>
          <button
            onClick={() => navigate('/book')}
            style={{
              fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em',
              padding: '14px 28px', background: 'var(--green)', color: 'var(--paper)',
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
