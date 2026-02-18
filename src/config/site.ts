const rawSiteUrl = (import.meta.env.SITE_URL || 'http://localhost:4321').trim();
const rawBaseUrl = (import.meta.env.BASE_URL || '/').trim();

export const SITE_URL = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
export const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;
export const ADS_ENABLED = import.meta.env.PUBLIC_ADS_ENABLED === 'true';
export const ADSENSE_CLIENT_ID = (import.meta.env.PUBLIC_ADSENSE_CLIENT_ID || '').trim();
export const ADSENSE_PUBLISHER_ID = (
  import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID || ADSENSE_CLIENT_ID.replace(/^ca-/, '')
).trim();

const slotIdsByName: Record<string, string> = {
  'home-top': (import.meta.env.PUBLIC_ADSENSE_SLOT_HOME_TOP || '').trim(),
  'listing-inline': (import.meta.env.PUBLIC_ADSENSE_SLOT_LISTING_INLINE || '').trim()
};

export function getAdSlotId(slotName: string) {
  return slotIdsByName[slotName] || '';
}

export function toCanonical(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function toBasePath(path: string) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${normalizedPath}`;
}
