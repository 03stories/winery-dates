import { getListingFiles, listingSlug, parseListingFile } from './listings_utils.mjs';

const REQUIRED_FIELDS = ['title', 'category', 'city', 'description'];

function isValidUrl(value) {
  if (!value || value === 'N/A') return true;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

const files = await getListingFiles();
const slugToPath = new Map();
const errors = [];

for (const filePath of files) {
  let listing;
  try {
    listing = await parseListingFile(filePath);
  } catch (error) {
    errors.push(String(error.message || error));
    continue;
  }

  const slug = listingSlug(listing);

  if (!slug) {
    errors.push(`${filePath}: missing slug (frontmatter slug or filename).`);
  }

  if (slugToPath.has(slug)) {
    errors.push(`${filePath}: duplicate slug '${slug}' also used by ${slugToPath.get(slug)}.`);
  } else {
    slugToPath.set(slug, filePath);
  }

  for (const field of REQUIRED_FIELDS) {
    const value = listing.frontmatter[field];
    if (typeof value !== 'string' || !value.trim()) {
      errors.push(`${filePath}: missing required field '${field}'.`);
    }
  }

  for (const field of ['website', 'maps', 'mapsPlaceUrl']) {
    const value = listing.frontmatter[field];
    if (value !== undefined && !isValidUrl(value)) {
      errors.push(`${filePath}: field '${field}' must be a valid URL or 'N/A'.`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Listing validation failed with ${errors.length} issue(s):`);
  for (const issue of errors) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`Validated ${files.length} listing files.`);
