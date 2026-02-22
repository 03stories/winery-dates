import { getPlaceDetails } from './google_places_client.mjs';
import { getListingFiles, parseListingFile, writeListingFile } from './listings_utils.mjs';

const ORDER = [
  'title',
  'slug',
  'category',
  'city',
  'description',
  'website',
  'phone',
  'address',
  'hours',
  'rating',
  'outsideFoodPolicy',
  'outsideFoodCost',
  'maps',
  'mapsPlaceUrl',
  'googlePlaceId',
  'lastVerified',
  'status',
  'source',
  'featured',
  'updated'
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function extractPlaceIdFromMaps(mapsValue) {
  if (!mapsValue || mapsValue === 'N/A') return undefined;

  const patterns = [/place_id[:=]([A-Za-z0-9_-]+)/i, /query_place_id=([A-Za-z0-9_-]+)/i];
  for (const pattern of patterns) {
    const match = mapsValue.match(pattern);
    if (match) return match[1];
  }

  return undefined;
}

function hoursToString(openingHours) {
  if (!openingHours?.weekday_text?.length) return undefined;
  return openingHours.weekday_text.join(' | ');
}

function mapStatus(businessStatus) {
  if (businessStatus === 'CLOSED_PERMANENTLY') return 'closed';
  return 'active';
}

function applyUpdates(frontmatter, place) {
  const next = { ...frontmatter };
  const changedFields = [];

  const updates = {
    googlePlaceId: place.place_id,
    mapsPlaceUrl: place.url,
    maps: place.url || frontmatter.maps,
    phone: place.formatted_phone_number,
    website: place.website,
    address: place.formatted_address,
    hours: hoursToString(place.opening_hours),
    rating: place.rating,
    status: mapStatus(place.business_status),
    source: frontmatter.source || 'google_places',
    lastVerified: todayIso()
  };

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === null || value === '') continue;
    if (next[key] !== value) {
      next[key] = value;
      changedFields.push(key);
    }
  }

  const userVisibleKeys = [
    'phone',
    'website',
    'address',
    'hours',
    'rating',
    'status',
    'maps',
    'mapsPlaceUrl'
  ];
  if (changedFields.some((key) => userVisibleKeys.includes(key))) {
    next.updated = todayIso();
  }

  return { next, changedFields };
}

const files = await getListingFiles();
let updatedCount = 0;
let unchangedCount = 0;
let closedCount = 0;
let errorCount = 0;

for (const filePath of files) {
  try {
    const listing = await parseListingFile(filePath);
    const placeId =
      listing.frontmatter.googlePlaceId || extractPlaceIdFromMaps(listing.frontmatter.maps);

    if (!placeId) {
      unchangedCount += 1;
      continue;
    }

    const place = await getPlaceDetails(placeId);
    if (!place) {
      unchangedCount += 1;
      continue;
    }

    const { next, changedFields } = applyUpdates(listing.frontmatter, place);

    if (next.status === 'closed') {
      closedCount += 1;
    }

    if (changedFields.length === 0) {
      unchangedCount += 1;
      continue;
    }

    await writeListingFile(filePath, next, listing.body, ORDER);
    updatedCount += 1;
    console.log(`Updated ${filePath}: ${changedFields.join(', ')}`);
  } catch (error) {
    errorCount += 1;
    console.error(`Error refreshing ${filePath}: ${error.message || error}`);
  }
}

console.log(
  `Refresh summary: updated=${updatedCount} unchanged=${unchangedCount} closed=${closedCount} errors=${errorCount}`
);

if (errorCount > 0) {
  process.exitCode = 1;
}
