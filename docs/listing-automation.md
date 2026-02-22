# Listing automation

## Required secrets and variables

- `GOOGLE_PLACES_API_KEY` (GitHub Actions secret): required for refresh + discovery calls.
- `DISCOVERY_DEFAULT_STATE` (optional repo variable): defaults to `GA`.

## Local usage

```bash
npm run data:weekly
```

Individual commands:

- `npm run data:refresh`
- `npm run data:discover`
- `npm run data:validate`

> The Google Places scripts require `GOOGLE_PLACES_API_KEY` in your environment.

## Adding a new discovery seed city

Edit `data/discovery_seeds.json` and append a seed object:

```json
{ "name": "Athens", "lat": 33.9519, "lng": -83.3576, "radiusMeters": 30000 }
```

You can also update the `keywords` array in the same file for broader or narrower discovery.

## Auto-updated vs editorial fields

The automation scripts can update these fields from Google Places data:

- `phone`
- `website`
- `address`
- `hours`
- `rating`
- `maps` / `mapsPlaceUrl`
- `googlePlaceId`
- `status`
- `lastVerified`
- `updated` (only when user-visible fields change)
- `source` (set to `google_places` when missing)

Editorial or manually maintained fields include:

- `title`, `category`, `city`, `description`
- `outsideFoodPolicy`, `outsideFoodCost`
- `featured`
- listing body content
