const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

function assertApiKey() {
  if (!API_KEY) {
    throw new Error('Missing GOOGLE_PLACES_API_KEY environment variable.');
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = 3) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const response = await fetch(url);

    if (response.status !== 429) {
      return response;
    }

    if (attempt === retries) {
      return response;
    }

    const waitMs = 1000 * 2 ** attempt;
    await sleep(waitMs);
  }

  throw new Error('Failed to fetch Google Places response.');
}

async function fetchJson(url) {
  const response = await fetchWithRetry(url);

  if (!response.ok) {
    throw new Error(`Google Places HTTP ${response.status}`);
  }

  const payload = await response.json();

  if (payload.status && payload.status !== 'OK' && payload.status !== 'ZERO_RESULTS') {
    throw new Error(
      `Google Places API error: ${payload.status} ${payload.error_message || ''}`.trim()
    );
  }

  return payload;
}

export async function getPlaceDetails(placeId) {
  assertApiKey();
  const params = new URLSearchParams({
    place_id: placeId,
    key: API_KEY,
    fields: [
      'place_id',
      'name',
      'formatted_address',
      'formatted_phone_number',
      'website',
      'opening_hours',
      'rating',
      'business_status',
      'url',
      'editorial_summary',
      'user_ratings_total'
    ].join(',')
  });

  const payload = await fetchJson(`${BASE_URL}/details/json?${params.toString()}`);
  return payload.result;
}

export async function textSearchPlaces({ query, location, radiusMeters }) {
  assertApiKey();
  const params = new URLSearchParams({
    query,
    key: API_KEY,
    location: `${location.lat},${location.lng}`,
    radius: String(radiusMeters)
  });

  const payload = await fetchJson(`${BASE_URL}/textsearch/json?${params.toString()}`);
  return payload.results || [];
}
