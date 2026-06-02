import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email: trimmed });
    setStatus(error ? 'error' : 'success');
  };

  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, hsl(38 14% 7%), var(--ink))',
      color: 'var(--paper)',
      padding: '64px 0 40px',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      <div className="w grid-2" style={{ gap: 48 }}>
        <div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 'var(--step-1)', fontWeight: 300, marginBottom: 12 }}>
            Emir One
          </div>
          <p className="measure" style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--paper-dim)', lineHeight: 'var(--lh-body)' }}>
            Ethical cold email infrastructure for B2B firms that measure what matters.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { to: '/privacy-policy', label: 'Privacy' },
              { to: '/terms-of-service', label: 'Terms' },
              { to: '/research', label: 'Research' },
              { to: '/sharia-aligned', label: 'Ethics' },
            ].map(l => (
              <Link key={l.to} to={l.to} className="link-wipe" style={{
                fontFamily: 'var(--body)', fontSize: 12, color: 'var(--paper-dim)',
                letterSpacing: '0.04em',
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--paper-dim)', marginBottom: 12 }}>
            Quarterly Intelligence
          </div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--paper-dim)', marginBottom: 16 }}>
            Deliverability benchmarks and experiment results — once a quarter.
          </p>
          <div aria-live="polite">
            {status === 'success' ? (
              <p style={{ fontFamily: 'var(--body)', fontSize: 'var(--step--1)', color: 'var(--paper)' }}>
                ✓ You're subscribed. Quarterly updates incoming.
              </p>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <label htmlFor="footer-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  placeholder="your@email.com"
                  style={{
                    flex: 1, fontFamily: 'var(--body)', fontSize: 16,
                    padding: '9px 12px', minHeight: 44, background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.18)', borderRadius: 3,
                    color: 'var(--paper)',
                  }}
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                  style={{
                    fontFamily: 'var(--body)', fontSize: 12, fontWeight: 600,
                    letterSpacing: '0.08em', padding: '9px 18px', minHeight: 44,
                    background: 'var(--green)', color: 'var(--paper)',
                    border: 'none', borderRadius: 3, cursor: 'pointer',
                    opacity: status === 'loading' ? 0.6 : 1,
                  }}
                >
                  {status === 'loading' ? '…' : 'Subscribe'}
                </button>
              </div>
            )}
          </div>
          {status === 'error' && (
            <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: '#F0A0A0', marginTop: 8 }}>
              Something went wrong — please try again.
            </p>
          )}
          <p style={{ fontFamily: 'var(--body)', fontSize: 11, color: 'var(--paper-dim)', marginTop: 8 }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="w" style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <span className="tnum" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--paper-dim)' }}>
          © {year} Emir One. All rights reserved.
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--paper-dim)' }}>
          ABN: Available on request
        </span>
      </div>
    </footer>
  );
}
