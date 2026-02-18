const rawSiteUrl = (import.meta.env.SITE_URL || 'http://localhost:4321').trim();
const rawBaseUrl = (import.meta.env.BASE_URL || '/').trim();

export const SITE_URL = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
export const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
export const ADS_ENABLED = import.meta.env.PUBLIC_ADS_ENABLED === 'true';
export const ADSENSE_CLIENT_ID = (import.meta.env.PUBLIC_ADSENSE_CLIENT_ID || '').trim();

function normalizeBasePath(pathname: string) {
  if (!pathname || pathname === '/') return '/';

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
}

export function buildCanonical(path: string, siteUrl: string, baseUrl: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const siteBasePath = normalizeBasePath(new URL(normalizedSiteUrl).pathname);
  const canonicalBasePath = siteBasePath === '/' ? normalizeBasePath(baseUrl) : siteBasePath;

  let pathWithoutBase = normalizedPath;
  if (canonicalBasePath !== '/' && normalizedPath.startsWith(canonicalBasePath)) {
    pathWithoutBase = normalizedPath.slice(canonicalBasePath.length - 1);
  }

  const relativePath = pathWithoutBase.startsWith('/') ? pathWithoutBase.slice(1) : pathWithoutBase;

  const canonicalPath =
    canonicalBasePath === '/' ? `/${relativePath}` : `${canonicalBasePath}${relativePath}`;

  return `${new URL(normalizedSiteUrl).origin}${canonicalPath}`;
}

export function toCanonical(path: string) {
  return buildCanonical(path, SITE_URL, BASE_URL);
}

export function toBasePath(path: string) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${normalizedPath}`;
}
