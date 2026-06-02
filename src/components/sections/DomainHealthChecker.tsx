import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomainHealth, getCommentary, type DnsResult } from '@/hooks/useDomainHealth';

function CheckRow({ glyph, label, text, status }: {
  glyph: string; label: string; text: string; status: 'pass' | 'fail' | 'warn' | 'unknown';
}) {
  const color = status === 'pass' ? 'var(--green)'
    : status === 'warn' ? '#B45309'
    : status === 'fail' ? '#DC2626'
    : 'var(--mid)';
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--rule-2)', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color, minWidth: 18, flexShrink: 0 }}>{glyph}</span>
      <div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--body)', fontSize: 13, color: 'var(--mid)' }}> — {text}</span>
      </div>
    </div>
  );
}

function HealthDrawer({ domain, results, onClose }: {
  domain: string; results: DnsResult | null; onClose: () => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const score = results?.score ?? null;
  const commentary = results
    ? getCommentary(score!, results)
    : 'Could not reach DNS — check your connection and try again.';

  const goToBook = () => {
    const params = new URLSearchParams({ domain, source: 'health_drawer' });
    if (score !== null) params.set('score', String(score));
    navigate(`/book?${params.toString()}`);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(12,11,9,0.5)', zIndex: 200 }}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label={`DNS Health Report for ${domain}`}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 480,
          background: 'var(--paper)', zIndex: 201, overflowY: 'auto', padding: 'var(--s5)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 4 }}>
              DNS Health Report
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 300, color: 'var(--ink)' }}>
              {domain}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close health report"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--mid)', fontSize: 24, lineHeight: 1, minWidth: 44, minHeight: 44, marginRight: -10, marginTop: -10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '24px 0 8px' }}>
          <span className="tnum" style={{ fontFamily: 'var(--serif)', fontSize: 56, fontWeight: 300, lineHeight: 1, color: 'var(--ink)' }}>
            {score !== null ? score : '—'}
          </span>
          <span style={{ fontFamily: 'var(--body)', fontSize: 18, color: 'var(--mid)' }}>/10</span>
        </div>
        <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'var(--mid)', marginBottom: 24, lineHeight: 1.6 }}>
          {commentary}
        </p>

        {results && (
          <div style={{ margin: '0 0 28px' }}>
            <CheckRow
              glyph={results.spf.found ? '✓' : '✗'}
              label="SPF"
              text={results.spf.found ? (results.spf.value || 'Record found') : 'No SPF record found'}
              status={results.spf.found ? 'pass' : 'fail'}
            />
            <CheckRow
              glyph={results.dmarc.found ? (results.dmarc.policy === 'none' ? '⚠' : '✓') : '✗'}
              label="DMARC"
              text={results.dmarc.found
                ? `p=${results.dmarc.policy}${results.dmarc.policy === 'none' ? ' — upgrade to quarantine or reject' : ''}`
                : 'No DMARC record found'}
              status={results.dmarc.found ? (results.dmarc.policy === 'none' ? 'warn' : 'pass') : 'fail'}
            />
            <CheckRow
              glyph={results.mx.found ? '✓' : '✗'}
              label="MX"
              text={results.mx.found
                ? `${results.mx.count} record${results.mx.count !== 1 ? 's' : ''} found`
                : 'No MX records found'}
              status={results.mx.found ? 'pass' : 'fail'}
            />
            <CheckRow
              glyph={results.dkim.found ? '✓' : '—'}
              label="DKIM"
              text={results.dkim.found ? 'Selector detected' : 'Selector not found — check manually'}
              status={results.dkim.found ? 'pass' : 'unknown'}
            />
          </div>
        )}

        <button
          onClick={goToBook}
          className="cta"
          style={{
            width: '100%', fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.08em', padding: '15px 0', minHeight: 48,
          }}
        >
          Book a free strategy call →
        </button>
      </div>
    </>
  );
}

export default function DomainHealthChecker() {
  const [input, setInput] = useState('');
  const { check, isChecking, domain, results, drawerOpen, closeDrawer } = useDomainHealth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    check(input);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', gap: 0, width: '100%', maxWidth: 440 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="yourdomain.com"
          inputMode="url"
          autoComplete="off"
          aria-label="Your domain"
          disabled={isChecking}
          style={{
            flex: 1, minWidth: 0, fontFamily: 'var(--mono)', fontSize: 16, minHeight: 48,
            padding: '12px 20px', background: 'var(--paper)',
            border: '1px solid var(--rule)', borderRight: 'none',
            borderRadius: '999px 0 0 999px', color: 'var(--ink)',
          }}
        />
        <button
          type="submit"
          className="cta"
          disabled={isChecking}
          style={{
            fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.06em', padding: '12px 24px', minHeight: 48,
            borderRadius: '0 999px 999px 0',
            whiteSpace: 'nowrap',
          }}
        >
          {isChecking ? 'Checking…' : 'Score my domain →'}
        </button>
      </form>
      <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'var(--mid)', marginTop: 8 }}>
        Free audit. No signup. Results in &lt; 30 seconds.
      </p>
      {drawerOpen && (
        <HealthDrawer domain={domain} results={results} onClose={closeDrawer} />
      )}
    </>
  );
}
