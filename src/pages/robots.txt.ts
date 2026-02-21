import { BASE_URL, SITE_URL, buildCanonical } from '../config/site';

export function GET() {
  const sitemapUrl = buildCanonical('/sitemap-index.xml', SITE_URL, BASE_URL);

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
