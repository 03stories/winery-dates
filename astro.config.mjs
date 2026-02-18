import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

function normalizeBasePath(input) {
  if (!input) return '/';

  const trimmed = input.trim();
  if (trimmed === '' || trimmed === '/') return '/';

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
}

const siteUrl = process.env.SITE_URL || 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
  integrations: [sitemap()],
});
