import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div style={{ maxWidth: '680px', margin: '5rem auto', padding: '0 1.5rem' }}>
      <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>404</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--c-fg)', marginBottom: '0.75rem' }}>Сторінку не знайдено.</h1>
      <Link to="/" style={{ fontSize: '0.875rem', color: 'var(--c-muted)' }}>← Повернутись</Link>
    </div>
  );
}
