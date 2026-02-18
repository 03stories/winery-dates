import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

function normalizeBasePath(basePath = '/') {
  const trimmed = basePath.trim();

  if (!trimmed || trimmed === '/') {
    return '/';
  }

  const withoutSlashes = trimmed.replace(/^\/+|\/+$/g, '');
  return `/${withoutSlashes}/`;
}

const siteUrl = process.env.SITE_URL || 'http://localhost:4321';
const basePath = normalizeBasePath(process.env.VITE_BASE_PATH);

export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [sitemap()]
});
