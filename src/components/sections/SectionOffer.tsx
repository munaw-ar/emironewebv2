import { useNavigate } from 'react-router-dom';

export default function SectionOffer() {
  const navigate = useNavigate();
  const deliverables = [
    { title: 'Sending domains', body: '2–3 secondary sending domains, SPF/DKIM/DMARC hardened and MXToolbox-verified.' },
    { title: 'Target list', body: 'A 500-contact target list, ICP-scored 7+ on our weighted signal sheet.' },
    { title: 'Warmed inboxes', body: 'Fully warmed sending inboxes (21-day protocol, monitored daily).' },
    { title: 'Sequenced copy', body: 'Sequenced copy — 3 touches, written for your ICP, reviewed against deliverability rules.' },
    { title: 'Live dashboard', body: 'A live campaign dashboard with reply tracking and domain health scores.' },
  ];

  return (
    <section id="sprint" aria-labelledby="offer-h" style={{ padding: 'var(--section-y) 0', background: 'var(--paper)' }}>
      <div className="w section-grid">
        <div className="section-eyebrow">
          <span className="sec-num">02</span>The Offer
        </div>
        <div>
          <h2 id="offer-h" className="reveal h-section" style={{ marginBottom: 'var(--s5)' }}>
            For firms ready to <em>build the system</em>, not just audit it.
          </h2>

          <div className="reveal section-eyebrow" style={{ paddingTop: 0, marginBottom: 'var(--s4)', fontFamily: 'var(--mono)', letterSpacing: '0.12em' }}>
            The Sprint — Deliverables
          </div>

          <div className="grid-2" style={{ marginBottom: 'var(--s6)' }}>
            {deliverables.map((d, i) => {
              const dir = i % 2 === 0 ? 'dir-left' : 'dir-right';
              const delay = ['', 'reveal-delay-1', 'reveal-delay-2'][Math.min(Math.floor(i / 2), 2)];
              return (
                <div key={i} className={`reveal glass ${dir} ${delay}`} style={{ padding: 'var(--s5)' }}>
                  <div className="tnum" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--light)' }}>0{i + 1}</div>
                  <div style={{ fontFamily: 'var(--display)', fontVariationSettings: '"opsz" 40', fontSize: 'var(--step-1)', fontWeight: 400, color: 'var(--ink)', margin: 'var(--s2) 0' }}>{d.title}</div>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--mid)', lineHeight: 'var(--lh-body)' }}>{d.body}</p>
                </div>
              );
            })}

            {/* The Day-14 Standard — green capstone card */}
            <div className="reveal glass dir-right reveal-delay-2" style={{ padding: 'var(--s5)', background: 'rgba(13,92,56,0.05)', borderColor: 'var(--green)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 'var(--s2)' }}>
                The Day-14 Standard
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-1)', fontWeight: 300, lineHeight: 'var(--lh-lead)', color: 'var(--ink)' }}>
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
