const SITE_URL = 'https://slaycal.app';
const LASTMOD = '2025-04-15';

type Alt = { hreflang: string; href: string };
type Page = {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
  alternates?: Alt[];
};

// Home pages — one per supported locale, all cross-linked via hreflang.
const localeHomes: { code: string; path: string; priority: string }[] = [
  { code: 'en', path: '/', priority: '1.0' },
  { code: 'tr', path: '/tr/', priority: '0.9' },
  { code: 'es', path: '/es/', priority: '0.8' },
  { code: 'fr', path: '/fr/', priority: '0.8' },
  { code: 'de', path: '/de/', priority: '0.8' },
  { code: 'pt-br', path: '/pt-br/', priority: '0.8' },
  { code: 'ru', path: '/ru/', priority: '0.8' },
  { code: 'ja', path: '/ja/', priority: '0.8' },
  { code: 'ko', path: '/ko/', priority: '0.8' },
  { code: 'it', path: '/it/', priority: '0.8' },
];

const homeAlternates: Alt[] = [
  ...localeHomes.map(l => ({ hreflang: l.code, href: `${SITE_URL}${l.path}` })),
  { hreflang: 'x-default', href: `${SITE_URL}/` },
];

// Calculator paths that exist in both EN and TR.
const calculatorPaths = [
  { slug: '/calculators', priority: '0.9' },
  { slug: '/bmi-calculator', priority: '0.9' },
  { slug: '/calorie-calculator', priority: '0.9' },
  { slug: '/macro-calculator', priority: '0.9' },
  { slug: '/body-fat-calculator', priority: '0.9' },
];

// Blog posts (EN only for now).
const blogPaths = [
  { slug: '/blog', priority: '0.8', changefreq: 'weekly' },
  { slug: '/blog/how-many-calories-should-i-eat', priority: '0.7', changefreq: 'monthly' },
  { slug: '/blog/what-is-bmi', priority: '0.7', changefreq: 'monthly' },
  { slug: '/blog/best-foods-for-muscle-gain', priority: '0.7', changefreq: 'monthly' },
  { slug: '/blog/how-to-lose-weight-without-counting-calories', priority: '0.7', changefreq: 'monthly' },
];

const pages: Page[] = [];

// Locale home pages (all cross-referenced via hreflang).
for (const l of localeHomes) {
  pages.push({
    url: `${SITE_URL}${l.path}`,
    lastmod: LASTMOD,
    changefreq: 'monthly',
    priority: l.priority,
    alternates: homeAlternates,
  });
}

// Calculator pages (EN + TR variants with hreflang cross-links).
for (const c of calculatorPaths) {
  const enHref = `${SITE_URL}${c.slug}`;
  const trHref = `${SITE_URL}/tr${c.slug}`;
  const alternates: Alt[] = [
    { hreflang: 'en', href: enHref },
    { hreflang: 'tr', href: trHref },
    { hreflang: 'x-default', href: enHref },
  ];
  pages.push({
    url: enHref,
    lastmod: LASTMOD,
    changefreq: 'monthly',
    priority: c.priority,
    alternates,
  });
  pages.push({
    url: trHref,
    lastmod: LASTMOD,
    changefreq: 'monthly',
    priority: c.priority,
    alternates,
  });
}

// Blog pages (EN only).
for (const b of blogPaths) {
  pages.push({
    url: `${SITE_URL}${b.slug}`,
    lastmod: LASTMOD,
    changefreq: b.changefreq,
    priority: b.priority,
  });
}

// Legal pages.
pages.push({
  url: `${SITE_URL}/privacy`,
  lastmod: LASTMOD,
  changefreq: 'yearly',
  priority: '0.3',
});
pages.push({
  url: `${SITE_URL}/terms`,
  lastmod: LASTMOD,
  changefreq: 'yearly',
  priority: '0.3',
  alternates: [
    { hreflang: 'en', href: `${SITE_URL}/terms` },
    { hreflang: 'tr', href: `${SITE_URL}/tr/terms` },
    { hreflang: 'x-default', href: `${SITE_URL}/terms` },
  ],
});
pages.push({
  url: `${SITE_URL}/tr/terms`,
  lastmod: LASTMOD,
  changefreq: 'yearly',
  priority: '0.3',
  alternates: [
    { hreflang: 'en', href: `${SITE_URL}/terms` },
    { hreflang: 'tr', href: `${SITE_URL}/tr/terms` },
    { hreflang: 'x-default', href: `${SITE_URL}/terms` },
  ],
});

function buildAlternate(alt: Alt) {
  return `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`;
}

function buildUrlEntry(p: Page) {
  const altBlock = p.alternates && p.alternates.length > 0
    ? '\n' + p.alternates.map(buildAlternate).join('\n')
    : '';
  return `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${altBlock}
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(buildUrlEntry).join('\n')}
</urlset>`;

export async function GET() {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
