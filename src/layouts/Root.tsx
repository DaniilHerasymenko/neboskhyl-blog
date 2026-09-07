import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useTheme } from '../hooks/useTheme';

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" /><line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" /><line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const NAV = [
  { to: '/archive', label: 'Блог' },
  { to: '/about',   label: 'Історія' },
  { to: '/contact', label: 'Контакти' },
];

const navLink: React.CSSProperties = {
  fontSize: '0.875rem',
  fontWeight: 400,
  color: 'var(--c-dim)',
  textDecoration: 'none',
  transition: 'color 0.15s',
};
const navLinkActive: React.CSSProperties = {
  ...navLink,
  color: 'var(--c-fg)',
  fontWeight: 500,
};

export default function Root() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--c-bg)', color: 'var(--c-fg)' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid var(--c-border)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'var(--c-bg)', transition: 'background-color 0.2s' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem', height: '3.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          <Link to="/" onClick={() => setOpen(false)} style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-fg)', letterSpacing: '-0.01em' }}>
            NEBOSKHYL
          </Link>

          {/* Desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desk-nav">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} style={({ isActive }) => isActive ? navLinkActive : navLink}>{label}</NavLink>
            ))}
            <button onClick={toggle} aria-label="Toggle theme" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-muted)', padding: '0.25rem', display: 'flex', alignItems: 'center', lineHeight: 1 }}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile */}
          <div style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }} className="mob-nav">
            <button onClick={toggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-muted)', display: 'flex', padding: '0.25rem' }}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-fg)', display: 'flex', padding: '0.25rem' }}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ borderTop: '1px solid var(--c-border)', backgroundColor: 'var(--c-bg)', padding: '0.5rem 1.5rem 1rem' }}>
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)} style={({ isActive }) => ({
                ...(isActive ? navLinkActive : navLink),
                display: 'block',
                padding: '0.65rem 0',
                borderBottom: '1px solid var(--c-border-sub)',
                fontSize: '0.9375rem',
              })}>
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--c-border)', marginTop: '4rem' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2.5rem 1.5rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }} className="footer-grid">
          <div>
            <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--c-fg)', marginBottom: '0.5rem' }}>NEBOSKHYL</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--c-muted)', lineHeight: 1.65, maxWidth: '32ch' }}>
              Формуємо сенси у щоденному житті. Копіювати матеріал без вказання на джерело заборонено.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'flex-end' }}>
            {[
              // { label: 'RSS ↗', href: '/rss.xml' },
              { label: 'Архів статей', to: '/archive' },
              { label: 'Контакти', to: '/contact' },
            ].map(({ label, href, to }: { label: string; href?: string; to?: string }) =>
              to ? (
                <Link key={label} to={to} style={{ fontSize: '0.8125rem', color: 'var(--c-muted)' }}>{label}</Link>
              ) : (
                <a key={label} href={href} style={{ fontSize: '0.8125rem', color: 'var(--c-muted)' }}>{label}</a>
              )
            )}
          </div>
        </div>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '1rem 1.5rem 1.5rem', borderTop: '1px solid var(--c-border-sub)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--c-subtle)' }}>© {new Date().getFullYear()} NEBOSKHYL</span>
        </div>
      </footer>

      <style>{`
        .desk-nav { display: flex !important; }
        .mob-nav  { display: none  !important; }
        @media (max-width: 600px) {
          .desk-nav { display: none  !important; }
          .mob-nav  { display: flex  !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
