export type Category = 'psychology' | 'sociology' | 'travel' | 'reflections';

export interface Post {
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  date: string;
  readTime: number;
  excerpt: string;
  body: string;
  photo: string;
  photoAlt: string;
  featured?: boolean;
}

export const CATEGORIES: Record<Category, string> = {
  psychology:  'Психологія',
  sociology:   'Соціологія',
  travel:      'Подорожі',
  reflections: 'Рефлексія',
};

export const HERO_PHOTO = 'https://neboskhyl.xyz/gallery/20260819_175543.jpg';
export const HERO_CAPTION = '📌 Копенгаген, Данія';

export const posts: Post[] = [
  {
    slug: 'healthy-relationship',
    title: 'Найголовніші здорові стосунки',
    subtitle: 'Твої скриті проблеми важливіші за проблеми інших людей',
    category: 'reflections',
    date: '2026-09-07',
    readTime: 3,
    featured: true,
    photo: 'https://neboskhyl.xyz/gallery/20260817_112815.jpg',
    photoAlt: '',
    excerpt:
      'There is a difference between loneliness and solitude that most people never fully understand until they have lived alone in a city of several million.',
    body: `Часто ми дивимося і не розуміємо, що справжня реальність живе не навколо нас, а в нас самих. Але ми не рідко намагаємося уникати себе самих, закриваючи всі свої потреби іншими людьми. Найважче, що можна побудувати в цьому світі, — це здорові стосунки з самим собою.

Ніхто тобі не дасть універсальної формули, як ці стосунки побудувати. Тобі власноруч доведеться занурюватися у глибини власної свідомості, які ніколи до того не досліджувалися. Доведеться шукати власні цінності, розуміти свої бажання та аналізувати власну поведінку і вносити до неї зміни. Проте найболючіше тільки попереду. Доведеться шукати, аналізувати та робити висновки з минулих травм, що спричинить ретравматизацію, невимовний біль та велику кількість сліз.

Але не можна назвати стосунки з собою здоровими, якщо не будуть пропрацьовані найбільш болючі і невідомі сторони своєї особистості. На жаль, тільки так ми можемо стати такими, якими ми і є. Стати такими, які не будуть переносити свої травми на інших і які будуть почуватися комфортно наодинці.

## Саме це вартує того, щоб почати цей нелегкий шлях.

Завдяки правильним рішенням ми перестанемо завдавати шкоди собі і почнемо краще жити. Ми станемо відвертішими до самих себе, почнемо краще розуміти свої потреби і зможемо побудувати міцні стосунки з іншими людьми, які будуть ґрунтуватися на чомусь більшому, ніж звичайний інтерес.`,
  },
];

export function getPost(slug: string) { return posts.find((p) => p.slug === slug); }
export function getFeaturedPost() { return posts.find((p) => p.featured) ?? posts[0]; }
export function getRecentPosts(n = 4) { return posts.filter((p) => !p.featured).slice(0, n); }
export function img(base: string, w: number, h: number) {
  return `${base}?w=${w}&h=${h}&fit=crop&auto=format`;
}
