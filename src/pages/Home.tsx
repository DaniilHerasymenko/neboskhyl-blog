import { Link } from 'react-router';
import { posts, CATEGORIES, HERO_PHOTO, HERO_CAPTION, img } from '../data/posts';

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Home() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const recent = posts.slice(0, 5);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
      <section style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5.5vw, 2.875rem)',
          fontWeight: 400,
          color: 'var(--c-fg)',
          lineHeight: 1.18,
          letterSpacing: '-0.01em',
          marginBottom: '1rem',
        }}>
          NEBOSKHYL — Формуємо сенси у щоденному житті.
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--c-muted)', lineHeight: 1.7, maxWidth: '60ch' }}>
          Невеликий особистий блог про власне життя, зміни у ньому, а також подорожі, психологію і багато чого іншого. У блозі висвітлюється тільки особиста думка автора. 100% AI-free zone.
        </p>
      </section>

      <section style={{ marginBottom: '3.5rem' }}>
        <Link to={`/post/${featured.slug}`}>
          <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: 'var(--c-card)', aspectRatio: '16/9' }}>
            <img
              src={img(HERO_PHOTO, 1360, 765)}
              alt="A foggy lake at the edge of a forest — the horizon between known and approaching"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
              className="hero-img"
            />
          </div>
        </Link>
        <p style={{ fontSize: '0.9rem', color: 'var(--c-subtle)', textAlign: 'center', marginTop: '0.625rem', fontStyle: 'italic' }}>
          {HERO_CAPTION} 
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-fg)', marginBottom: '1.25rem', letterSpacing: '0.01em' }}>
          Нещодавні публікації
        </h2>

        <div>
          {recent.map((post, i) => (
            <article key={post.slug}>
              <div style={{ borderTop: i === 0 ? '1px solid var(--c-border)' : 'none' }} />
              <Link to={`/post/${post.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1rem 0', borderBottom: '1px solid var(--c-border)' }} className="post-row">
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>{fmtDate(post.date)}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--c-tag)' }}>#{post.category}</span>
                  </div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--c-fg)', lineHeight: 1.4, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {post.title}
                  </h3>
                </div>

                <div style={{ width: '72px', height: '72px', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--c-card)', flexShrink: 0 }}>
                  <img
                    src={img(post.photo, 144, 144)}
                    alt={post.photoAlt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Link
            to="/archive"
            style={{
              display: 'inline-block',
              padding: '0.5rem 1.75rem',
              border: '1px solid var(--c-btn-border)',
              borderRadius: '999px',
              fontSize: '0.8125rem',
              fontWeight: 400,
              color: 'var(--c-dim)',
              backgroundColor: 'transparent',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            className="view-more"
          >
            Дивитись більше
          </Link>
        </div>
      </section>

      <style>{`
        .hero-img:hover { transform: scale(1.02); }
        .post-row:hover h3 { opacity: 0.7; }
        .view-more:hover { border-color: var(--c-fg) !important; color: var(--c-fg) !important; opacity: 1 !important; }
      `}</style>
    </div>
  );
}
