import { normalizeBasePath } from '@/config/env';

describe('normalizeBasePath', () => {
  it('returns slash when missing', () => {
    expect(normalizeBasePath(undefined)).toBe('/');
  });

  it('normalizes leading and trailing slashes', () => {
    expect(normalizeBasePath('repo')).toBe('/repo/');
    expect(normalizeBasePath('/repo')).toBe('/repo/');
    expect(normalizeBasePath('/repo//path')).toBe('/repo/path/');
  });
});
