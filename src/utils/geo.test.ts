import {
  calculateDistanceMiles,
  clearZipCoordinateCache,
  extractUsZipCode,
  getZipCoordinatesForUsZip,
  normalizeUsZipCode
} from '@/utils/geo';

describe('geo utilities', () => {
  beforeEach(() => {
    clearZipCoordinateCache();
    vi.restoreAllMocks();
  });

  it('extracts a ZIP code from an address', () => {
    expect(extractUsZipCode('100 Rue Charlemagne Dr, Braselton, GA 30517')).toBe('30517');
    expect(extractUsZipCode('No ZIP here')).toBeNull();
  });

  it('normalizes ZIP inputs', () => {
    expect(normalizeUsZipCode('30339')).toBe('30339');
    expect(normalizeUsZipCode('30339-1201')).toBeNull();
    expect(normalizeUsZipCode('abc')).toBeNull();
  });

  it('calculates distance between coordinates', () => {
    const atlanta = { lat: 33.749, lng: -84.388 };
    const braselton = { lat: 34.1093, lng: -83.7624 };
    const distance = calculateDistanceMiles(atlanta, braselton);

    expect(distance).toBeGreaterThan(40);
    expect(distance).toBeLessThan(50);
  });

  it('fetches and caches ZIP coordinates', async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          places: [{ latitude: '34.0901', longitude: '-118.4065' }]
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const first = await getZipCoordinatesForUsZip('90210');
    const second = await getZipCoordinatesForUsZip('90210');

    expect(first).toEqual({ lat: 34.0901, lng: -118.4065 });
    expect(second).toEqual(first);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
