import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { wavePaths } from '@/data/wavePaths';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const lwStyle: React.CSSProperties = {
  fill: 'none',
  stroke: '#2FD27F',
  strokeWidth: 0.65,
  strokeLinecap: 'round',
  vectorEffect: 'non-scaling-stroke',
  opacity: 0.6,
};

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close the drawer if the viewport grows back to desktop
  useEffect(() => { if (!isMobile) setMobileOpen(false); }, [isMobile]);

  const navLinks = [
    { href: '/research', label: 'Research' },
    { href: '/sharia-aligned', label: 'Sharia-Aligned' },
    { href: '/how-we-make-it', label: 'How We Make It' },
  ];

  const Logo = (
    <Link to="/" aria-label="Emir One home" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
      <svg
        viewBox="0 0 280 95"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: 44, width: 'auto', overflow: 'visible' }}
        role="img"
        aria-label="Emir One"
      >
        <g id="logo-wave">
          {wavePaths.map((d, i) => (
            <path key={i} style={lwStyle} d={d} />
          ))}
        </g>
        <line
          x1="14" y1="49" x2="182" y2="49"
          stroke="var(--ink)" strokeWidth="0.85"
          style={{ fill: 'none' }}
        />
        <text
          x="168" y="68"
          fontFamily="'Great Vibes',cursive"
          fontSize="32"
          fill="var(--ink)"
        >one</text>
        <text
          x="14" y="38"
          fontFamily="'Libre Baskerville',Georgia,serif"
          fontSize="36"
          fontWeight="400"
          letterSpacing="10"
          fill="var(--ink)"
        >EMIR</text>
      </svg>
    </Link>
  );

  const cta = (
    <Link to="/book" className="cta" style={{
      fontFamily: 'var(--body)', fontSize: 11, fontWeight: 600,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: 'var(--paper)', background: 'var(--green)',
      padding: '9px 18px', borderRadius: 3, textDecoration: 'none',
      display: 'inline-flex', alignItems: 'center', minHeight: 38,
    }}>
      Book a Call
    </Link>
  );

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(11,12,16,0.72)', borderBottom: '1px solid var(--rule)',
        WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)',
      }}>
        <div className="w" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--nav-h)' }}>
          {Logo}

          {!isMobile && (
            <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} style={{
                  fontFamily: 'var(--body)', fontSize: 13, fontWeight: 500,
                  letterSpacing: '0.02em', textDecoration: 'none',
                  color: location.pathname.startsWith(link.href) ? 'var(--green)' : 'var(--ink)',
                }}>
                  {link.label}
                </Link>
              ))}
              {cta}
            </nav>
          )}

          {isMobile && (
            <button
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileOpen}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, minWidth: 44, minHeight: 44, marginRight: -10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round">
                {mobileOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
                }
              </svg>
            </button>
          )}
        </div>
      </header>

      {isMobile && mobileOpen && (
        <nav aria-label="Mobile navigation" style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, bottom: 0,
          background: 'var(--paper)', zIndex: 99, padding: '32px 20px',
          borderTop: '1px solid var(--rule)', overflowY: 'auto',
          height: 'calc(100dvh - var(--nav-h))',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} to={link.href} style={{
              display: 'block', fontFamily: 'var(--body)', fontSize: 18, fontWeight: 500,
              color: 'var(--ink)', textDecoration: 'none', padding: '16px 0',
              borderBottom: '1px solid var(--rule-2)',
            }}>
              {link.label}
            </Link>
          ))}
          <Link to="/book" style={{
            display: 'block', marginTop: 32, fontFamily: 'var(--body)', fontSize: 13,
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--paper)', background: 'var(--green)',
            padding: '16px 0', borderRadius: 3, textDecoration: 'none', textAlign: 'center',
          }}>
            Book a Call
          </Link>
        </nav>
      )}
    </>
  );
}
