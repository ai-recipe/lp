const SITE_URL = 'https://slaycal.app';

const pages = [
  {
    url: `${SITE_URL}/`,
    lastmod: '2025-01-01',
    changefreq: 'monthly',
    priority: '1.0',
    alternates: [
      { hreflang: 'en', href: `${SITE_URL}/` },
      { hreflang: 'tr', href: `${SITE_URL}/tr/` },
      { hreflang: 'x-default', href: `${SITE_URL}/` },
    ],
  },
  {
    url: `${SITE_URL}/tr/`,
    lastmod: '2025-01-01',
    changefreq: 'monthly',
    priority: '0.9',
    alternates: [
      { hreflang: 'en', href: `${SITE_URL}/` },
      { hreflang: 'tr', href: `${SITE_URL}/tr/` },
      { hreflang: 'x-default', href: `${SITE_URL}/` },
    ],
  },
];

function buildAlternate(alt: { hreflang: string; href: string }) {
  return `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}"/>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
${p.alternates.map(buildAlternate).join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>`;

export async function GET() {
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
