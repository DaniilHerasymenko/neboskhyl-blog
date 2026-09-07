import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { posts, CATEGORIES, type Category, img } from '../data/posts';

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

const ALL = 'all';
type Filter = Category | typeof ALL;

export default function Archive() {
  const [params, setParams] = useSearchParams();
  const initCat = params.get('cat') as Filter | null;
  const [filter, setFilter] = useState<Filter>(initCat && initCat in CATEGORIES ? initCat : ALL);

  useEffect(() => {
    const c = params.get('cat');
    if (c && c in CATEGORIES) setFilter(c as Category);
    else setFilter(ALL);
  }, [params]);

  const setFilter_ = (v: Filter) => {
    setFilter(v);
    v === ALL ? setParams({}) : setParams({ cat: v });
  };

  const visible = filter === ALL ? posts : posts.filter((p) => p.category === filter);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--c-fg)', marginBottom: '0.25rem' }}>
          {filter === ALL ? 'Блог' : CATEGORIES[filter as Category]}
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--c-muted)' }}>{visible.length} дописів</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--c-border)', marginBottom: '2rem', overflowX: 'auto' }}>
        {([['all', 'All'] as const, ...Object.entries(CATEGORIES) as [Category, string][]]).map(([val, label]) => {
          const active = filter === val;
          return (
            <button key={val} onClick={() => setFilter_(val as Filter)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.5rem 1rem',
              fontSize: '0.8125rem',
              fontWeight: active ? 500 : 400,
              color: active ? 'var(--c-fg)' : 'var(--c-muted)',
              borderBottom: active ? '1.5px solid var(--c-fg)' : '1.5px solid transparent',
              marginBottom: '-1px',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s',
            }}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      <div>
        {visible.map((post, i) => (
          <article key={post.slug}>
            <div style={{ borderTop: i === 0 ? '1px solid var(--c-border)' : 'none' }} />
            <Link to={`/post/${post.slug}`} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', padding: '1.125rem 0', borderBottom: '1px solid var(--c-border)' }} className="post-row">
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-muted)' }}>{fmtDate(post.date)}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-tag)' }}>#{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--c-subtle)' }}>{post.readTime} min</span>
                </div>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--c-fg)', lineHeight: 1.4, marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--c-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {post.subtitle}
                </p>
              </div>
              <div style={{ width: '72px', height: '72px', borderRadius: '6px', overflow: 'hidden', backgroundColor: 'var(--c-card)', flexShrink: 0 }}>
                <img src={img(post.photo, 144, 144)} alt={post.photoAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Link>
          </article>
        ))}
      </div>

      <style>{`
        .post-row:hover h2 { opacity: 0.65; }
      `}</style>
    </div>
  );
}
