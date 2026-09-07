import { useParams, Link } from 'react-router';
import { useState, useEffect, useRef } from 'react';
import { getPost, CATEGORIES, posts, img } from '../data/posts';

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
}

function renderInline(text: string): React.ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*')
      ? <em key={i} style={{ fontStyle: 'italic', color: 'var(--c-dim)' }}>{part.slice(1, -1)}</em>
      : part
  );
}

function Body({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((raw, i) => {
        const p = raw.trim();
        if (!p) return null;
        if (p.startsWith('## ')) {
          return (
            <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 400, color: 'var(--c-fg)', marginTop: '2.75rem', marginBottom: '0.875rem', lineHeight: 1.3 }}>
              {p.slice(3)}
            </h2>
          );
        }
        if (p.startsWith('> ')) {
          const lines = p.split('\n').map(l => l.replace(/^> /, ''));
          const hasAttrib = lines.at(-1)?.startsWith('—');
          return (
            <blockquote key={i} style={{ margin: '2rem 0', paddingLeft: '1.25rem', borderLeft: '2px solid var(--c-border)' }}>
              {lines.slice(0, hasAttrib ? -1 : undefined).map((l, j) => (
                <p key={j} style={{ fontStyle: 'italic', color: 'var(--c-dim)', margin: '0 0 0.5rem', fontSize: '0.9375rem', lineHeight: 1.75 }}>{l}</p>
              ))}
              {hasAttrib && <p style={{ fontSize: '0.8125rem', color: 'var(--c-muted)', margin: '0.5rem 0 0', fontStyle: 'normal' }}>{lines.at(-1)}</p>}
            </blockquote>
          );
        }
        return (
          <p key={i} style={{ fontSize: '1rem', color: 'var(--c-body)', lineHeight: 1.85, margin: '0 0 1.5rem' }}>
            {renderInline(p)}
          </p>
        );
      })}
    </>
  );
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  const [pct, setPct] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      setPct(Math.min(100, Math.max(0, (-r.top + window.innerHeight * 0.5) / el.offsetHeight * 100)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  if (!post) return (
    <div style={{ maxWidth: '680px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--c-muted)', marginBottom: '1rem' }}>Essay not found.</p>
      <Link to="/archive" style={{ color: 'var(--c-fg)', fontSize: '0.875rem' }}>← Back to blog</Link>
    </div>
  );

  const idx = posts.findIndex(p => p.slug === post.slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <div>
      {/* Progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '2px', width: `${pct}%`, backgroundColor: 'var(--c-fg)', zIndex: 100, transition: 'width 0.1s linear', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>

        {/* Article header */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>{fmtDate(post.date)}</span>
            <span style={{ color: 'var(--c-ghost)' }}>·</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--c-tag)' }}>#{post.category}</span>
            <span style={{ color: 'var(--c-ghost)' }}>·</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>{post.readTime} хв.</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: 400, color: 'var(--c-fg)', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--c-muted)', fontStyle: 'italic', margin: 0 }}>
            {post.subtitle}
          </p>
        </header>

        {/* Hero image */}
        <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: 'var(--c-card)', aspectRatio: '16/9', marginBottom: '2.5rem' }}>
          <img
            src={img(post.photo, 1360, 765)}
            alt={post.photoAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Body */}
        <div ref={bodyRef} style={{ maxWidth: '80ch' }}>
          <Body text={post.body} />
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--c-border)', margin: '3rem 0 2rem' }} />

        {/* Next post */}
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: '1rem', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Наступне</p>
          <Link to={`/post/${next.slug}`} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--c-card)', flexShrink: 0 }}>
              <img src={img(next.photo, 128, 128)} alt={next.photoAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--c-tag)', marginBottom: '0.25rem' }}>#{next.category}</p>
              <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--c-fg)', lineHeight: 1.35 }}>{next.title}</p>
            </div>
          </Link>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <Link to="/archive" style={{ fontSize: '0.8125rem', color: 'var(--c-muted)' }}>← Всі пости</Link>
        </div>
      </div>
    </div>
  );
}
