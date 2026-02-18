export function normalizeBasePath(input: string | undefined): string {
  if (!input) return '/';

  const trimmed = input.trim();
  if (trimmed === '' || trimmed === '/') return '/';

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return withTrailingSlash.replace(/\/{2,}/g, '/');
}

export const appConfig = {
  basePath: normalizeBasePath(import.meta.env.VITE_BASE_PATH),
  apiUrl: import.meta.env.VITE_API_URL ?? ''
};
