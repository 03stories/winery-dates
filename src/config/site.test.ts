import { buildCanonical } from '@/config/site';

describe('buildCanonical', () => {
  it('uses base path when site url has root path', () => {
    expect(buildCanonical('/listing/fox', 'https://03stories.github.io', '/winery-dates/')).toBe(
      'https://03stories.github.io/winery-dates/listing/fox'
    );
  });

  it('avoids doubling base path when route already includes it', () => {
    expect(
      buildCanonical('/winery-dates/listing/fox', 'https://03stories.github.io', '/winery-dates/')
    ).toBe('https://03stories.github.io/winery-dates/listing/fox');
  });

  it('prefers SITE_URL pathname for github pages project urls', () => {
    expect(
      buildCanonical('/winery-dates/listing/fox', 'https://03stories.github.io/winery-dates', '/')
    ).toBe('https://03stories.github.io/winery-dates/listing/fox');
  });

  it('uses root canonical paths for custom domains', () => {
    expect(buildCanonical('/listing/fox', 'https://yourdomain.com', '/')).toBe(
      'https://yourdomain.com/listing/fox'
    );
  });
});
