import { useNavigate } from 'react-router-dom';

export default function SectionCTA() {
  const navigate = useNavigate();
  return (
    <section aria-label="Call to action" style={{ padding: 'var(--section-y-lg) 0', background: 'var(--ink)', color: 'var(--paper)' }}>
      <div className="w" style={{ maxWidth: 720 }}>
        <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 20 }}>
          Ready to build?
        </div>
        <h2 className="h-cta" style={{ marginBottom: 24 }}>
          Your domain health score in 30 seconds. <em>Your outbound fixed in a sprint.</em>
        </h2>
        <p style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--light)', lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
          Book a 30-minute strategy call. We review your current setup, score it live, and tell you exactly what's broken and what it would take to fix it.
        </p>
        <button
          onClick={() => navigate('/book')}
          style={{
            fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '16px 32px', minHeight: 44,
            background: 'var(--green)', color: 'var(--paper)',
            border: 'none', borderRadius: 3, cursor: 'pointer',
          }}
        >
          Book a Strategy Call
        </button>
        <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--light)', marginTop: 16 }}>
          No commitment. No pitch deck. Just a diagnosis.
        </p>
      </div>
    </section>
  );
}
