export type Coordinates = Readonly<{
  lat: number;
  lng: number;
}>;

type ZippopotamResponse = {
  places?: Array<{
    latitude: string;
    longitude: string;
  }>;
};

const ZIP_CODE_REGEX = /\b(\d{5})(?:-\d{4})?\b/;
const zipCoordinateCache = new Map<string, Promise<Coordinates | null>>();

export function extractUsZipCode(value: string): string | null {
  const match = value.match(ZIP_CODE_REGEX);
  return match?.[1] ?? null;
}

export function normalizeUsZipCode(value: string): string | null {
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length === 5 ? digitsOnly : null;
}

export function calculateDistanceMiles(from: Coordinates, to: Coordinates): number {
  const earthRadiusMiles = 3958.8;
  const latDelta = degToRad(to.lat - from.lat);
  const lngDelta = degToRad(to.lng - from.lng);
  const fromLat = degToRad(from.lat);
  const toLat = degToRad(to.lat);

  const haversine =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos(fromLat) * Math.cos(toLat) * Math.sin(lngDelta / 2) * Math.sin(lngDelta / 2);

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(haversine));
}

export function clearZipCoordinateCache(): void {
  zipCoordinateCache.clear();
}

export function getZipCoordinatesForUsZip(
  zipCode: string,
  signal?: AbortSignal
): Promise<Coordinates | null> {
  const normalizedZip = normalizeUsZipCode(zipCode);

  if (!normalizedZip) {
    return Promise.resolve(null);
  }

  const cachedPromise = zipCoordinateCache.get(normalizedZip);
  if (cachedPromise) {
    return cachedPromise;
  }

  const request = fetchZipCoordinates(normalizedZip, signal).catch((error: unknown) => {
    zipCoordinateCache.delete(normalizedZip);
    throw error;
  });
  zipCoordinateCache.set(normalizedZip, request);
  return request;
}

function degToRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

async function fetchZipCoordinates(
  normalizedZip: string,
  signal?: AbortSignal
): Promise<Coordinates | null> {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${normalizedZip}`, { signal });
    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as ZippopotamResponse;
    const place = body.places?.[0];
    if (!place) {
      return null;
    }

    const lat = Number(place.latitude);
    const lng = Number(place.longitude);
    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      return null;
    }

    return { lat, lng };
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error;
    }

    return null;
  }
}
