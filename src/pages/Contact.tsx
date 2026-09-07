export default function Contact() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3.5rem 1.5rem 5rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, color: 'var(--c-fg)', marginBottom: '0.75rem' }}>
        Контакти
      </h1>
      <p style={{ fontSize: '0.9375rem', color: 'var(--c-muted)', marginBottom: '2.5rem' }}>
        Всі форми для зворотнього зв'язку та підтримки блогу вказані нижче.
      </p>

      <div>
        {[
          {
            label: 'ReWish',
            value: 'Особистий профіль',
            href: 'https://rewish.io/ljEHAA/wishes',
            note: 'Підтримати проект фінансово/надіслати автору подарунок (відділення пошти вказане на сайті)',
          },
          {
            label: 'Email',
            value: 'hello@neboskhyl.xyz',
            href: 'mailto:hello@neboskhyl.xyz',
            note: 'Для пропозицій, коментарів та будь-чого іншого.',
          },
          // {
          //   label: 'RSS Feed',
          //   value: '/rss.xml',
          //   href: '/rss.xml',
          //   note: 'Найкращий спосіб відслідковувати новий контент на сайті. Необхідно лише підписатись на RSS файл у будь-якому фід-рідері.',
          // },
        ].map(({ label, value, href, note }, i, arr) => (
          <div key={label} style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--c-border)', borderTop: i === 0 ? '1px solid var(--c-border)' : 'none' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--c-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
              {label}
            </p>
            <a href={href} style={{ fontSize: '0.9375rem', color: 'var(--c-fg)', fontWeight: 500, display: 'block', marginBottom: '0.375rem' }}>
              {value}
            </a>
            <p style={{ fontSize: '0.8125rem', color: 'var(--c-muted)', lineHeight: 1.65, margin: 0 }}>
              {note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
