const rawSiteUrl = (import.meta.env.SITE_URL || 'http://localhost:4321').trim();

export const SITE_URL = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
export const BASE_PATH = import.meta.env.BASE_URL || '/';
export const ADS_ENABLED = import.meta.env.PUBLIC_ADS_ENABLED === 'true';
export const ADSENSE_CLIENT_ID = (import.meta.env.PUBLIC_ADSENSE_CLIENT_ID || '').trim();

export function withBase(path: string) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_PATH}${normalizedPath}`;
}

export function toCanonical(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
