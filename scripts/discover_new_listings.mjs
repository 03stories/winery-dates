import { promises as fs } from 'node:fs';
import path from 'node:path';
import { getPlaceDetails, textSearchPlaces } from './google_places_client.mjs';
import {
  LISTINGS_DIR,
  getListingFiles,
  listingSlug,
  parseListingFile,
  toKebabCase,
  writeListingFile
} from './listings_utils.mjs';

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

function hoursToString(openingHours) {
  if (!openingHours?.weekday_text?.length) return 'N/A';
  return openingHours.weekday_text.join(' | ');
}

function parseCity(address, fallbackCity) {
  if (!address) return fallbackCity;
  const parts = address.split(',').map((part) => part.trim());
  return parts[1] || fallbackCity;
}

function createDescription(place, passesQuality) {
  const summary = place.editorial_summary?.overview;
  if (summary) return summary;

  const suffix = passesQuality
    ? 'Check current hours and offerings before your visit.'
    : 'Needs review before publishing.';
  return `${place.name} is a winery listing sourced from Google Places. ${suffix}`;
}

function uniqueSlug(baseSlug, existingSlugs, city, placeId) {
  let candidate = baseSlug;
  if (!existingSlugs.has(candidate)) return candidate;

  candidate = `${baseSlug}-${toKebabCase(city)}`;
  if (!existingSlugs.has(candidate)) return candidate;

  const hash = placeId.slice(-6).toLowerCase();
  candidate = `${baseSlug}-${hash}`;
  let idx = 1;
  while (existingSlugs.has(candidate)) {
    candidate = `${baseSlug}-${hash}-${idx}`;
    idx += 1;
  }

  return candidate;
}

const configRaw = await fs.readFile(path.resolve('data/discovery_seeds.json'), 'utf8');
const { seeds, keywords } = JSON.parse(configRaw);
const discoveryState = process.env.DISCOVERY_DEFAULT_STATE || 'GA';

const files = await getListingFiles();
const existing = [];
for (const filePath of files) {
  existing.push(await parseListingFile(filePath));
}

const existingSlugs = new Set(existing.map((entry) => listingSlug(entry)));
const existingTitles = new Set(
  existing.map((entry) => String(entry.frontmatter.title || '').toLowerCase())
);
const existingPlaceIds = new Set(
  existing.map((entry) => entry.frontmatter.googlePlaceId).filter(Boolean)
);

const candidates = new Map();
for (const seed of seeds) {
  for (const keyword of keywords) {
    const query = `${seed.name} ${discoveryState} ${keyword}`;
    const results = await textSearchPlaces({
      query,
      location: { lat: seed.lat, lng: seed.lng },
      radiusMeters: seed.radiusMeters
    });

    for (const item of results) {
      if (item.place_id) {
        candidates.set(item.place_id, { ...item, seed });
      }
    }
  }
}

let createdCount = 0;
let skippedCount = 0;

for (const candidate of candidates.values()) {
  if (
    existingPlaceIds.has(candidate.place_id) ||
    existingTitles.has(candidate.name.toLowerCase())
  ) {
    skippedCount += 1;
    continue;
  }

  const details = await getPlaceDetails(candidate.place_id);
  if (!details?.name) {
    skippedCount += 1;
    continue;
  }

  const rating = details.rating;
  const ratingsTotal = details.user_ratings_total;
  const passesQuality =
    (typeof rating === 'number' &&
      rating >= 4 &&
      typeof ratingsTotal === 'number' &&
      ratingsTotal >= 15) ||
    rating === undefined ||
    ratingsTotal === undefined;

  if (!passesQuality) {
    skippedCount += 1;
    continue;
  }

  const city = parseCity(details.formatted_address, candidate.seed.name);
  const baseSlug = toKebabCase(details.name);
  const slug = uniqueSlug(baseSlug, existingSlugs, city, details.place_id);

  const frontmatter = {
    title: details.name,
    slug,
    category: 'Wineries',
    city,
    description: createDescription(details, passesQuality),
    website: details.website || 'N/A',
    phone: details.formatted_phone_number || 'N/A',
    address: details.formatted_address || 'N/A',
    hours: hoursToString(details.opening_hours),
    rating: details.rating,
    outsideFoodPolicy: 'N/A',
    outsideFoodCost: 'N/A',
    maps: details.url || `https://www.google.com/maps/place/?q=place_id:${details.place_id}`,
    mapsPlaceUrl:
      details.url || `https://www.google.com/maps/place/?q=place_id:${details.place_id}`,
    googlePlaceId: details.place_id,
    lastVerified: todayIso(),
    status: details.business_status === 'CLOSED_PERMANENTLY' ? 'closed' : 'active',
    source: 'google_places',
    featured: false,
    updated: todayIso()
  };

  const filePath = path.join(LISTINGS_DIR, `${slug}.md`);
  const body = `${details.name} is listed in ${city}. Verify details before visiting.`;

  await writeListingFile(filePath, frontmatter, body, ORDER);
  existingSlugs.add(slug);
  existingTitles.add(details.name.toLowerCase());
  existingPlaceIds.add(details.place_id);
  createdCount += 1;
  console.log(`Created ${path.relative(process.cwd(), filePath)}`);
}

console.log(
  `Discovery summary: created=${createdCount} skipped=${skippedCount} candidates=${candidates.size}`
);
