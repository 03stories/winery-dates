import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { wineries } from '@/data/wineries';
import { calculateDistanceMiles, extractUsZipCode, getZipCoordinatesForUsZip } from '@/utils/geo';

const moodPresets = [
  { label: 'Mountain views', value: 'mountain' },
  { label: 'Patio sunset', value: 'patio' },
  { label: 'Restaurant pairing', value: 'restaurant' },
  { label: 'Atlanta metro', value: 'atlanta' }
] as const;

export function HomePage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(4.5);
  const [outsideFood, setOutsideFood] = useState<'Any' | 'Allowed' | 'Restricted'>('Any');
  const [zipCode, setZipCode] = useState('');
  const [distanceByWineryId, setDistanceByWineryId] = useState<Record<string, number>>({});
  const [zipLookupStatus, setZipLookupStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    'idle'
  );

  useEffect(() => {
    if (zipCode.length !== 5) {
      setZipLookupStatus('idle');
      setDistanceByWineryId({});
      return;
    }

    const abortController = new AbortController();
    let isCancelled = false;

    const loadDistances = async (): Promise<void> => {
      setZipLookupStatus('loading');

      const userCoordinates = await getZipCoordinatesForUsZip(zipCode, abortController.signal);
      if (!userCoordinates) {
        if (!isCancelled) {
          setZipLookupStatus('error');
          setDistanceByWineryId({});
        }
        return;
      }

      const wineryZipById = wineries.map(
        (winery) => [winery.id, extractUsZipCode(winery.address)] as const
      );
      const uniqueWineryZips = Array.from(
        new Set(
          wineryZipById
            .map(([, wineryZip]) => wineryZip)
            .filter((wineryZip): wineryZip is string => wineryZip !== null)
        )
      );

      const zipCoordinatesEntries = await Promise.all(
        uniqueWineryZips.map(async (wineryZip) => {
          const coordinates = await getZipCoordinatesForUsZip(wineryZip, abortController.signal);
          return [wineryZip, coordinates] as const;
        })
      );

      if (isCancelled) {
        return;
      }

      const coordinatesByZip = new Map(zipCoordinatesEntries);
      const nextDistances: Record<string, number> = {};

      wineryZipById.forEach(([wineryId, wineryZip]) => {
        if (!wineryZip) {
          return;
        }

        const wineryCoordinates = coordinatesByZip.get(wineryZip);
        if (!wineryCoordinates) {
          return;
        }

        nextDistances[wineryId] = calculateDistanceMiles(userCoordinates, wineryCoordinates);
      });

      setDistanceByWineryId(nextDistances);
      setZipLookupStatus('ready');
    };

    void loadDistances().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      setZipLookupStatus('error');
      setDistanceByWineryId({});
    });

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [zipCode]);

  const hasDistanceSort = zipCode.length === 5 && zipLookupStatus === 'ready';

  const filtered = useMemo(() => {
    return wineries
      .filter((winery) => {
        const matchesQuery =
          winery.name.toLowerCase().includes(query.toLowerCase()) ||
          winery.address.toLowerCase().includes(query.toLowerCase());
        const matchesRating = winery.rating >= minRating;
        const policyLower = winery.outsideFoodPolicy.toLowerCase();
        const outsideFoodAllowed = !policyLower.includes('no outside');
        const matchesOutsideFood =
          outsideFood === 'Any'
            ? true
            : outsideFood === 'Allowed'
              ? outsideFoodAllowed
              : !outsideFoodAllowed;

        return matchesQuery && matchesRating && matchesOutsideFood;
      })
      .sort((a, b) => {
        if (hasDistanceSort) {
          const distanceA = distanceByWineryId[a.id];
          const distanceB = distanceByWineryId[b.id];
          const hasDistanceA = typeof distanceA === 'number';
          const hasDistanceB = typeof distanceB === 'number';

          if (hasDistanceA && hasDistanceB && distanceA !== distanceB) {
            return distanceA - distanceB;
          }

          if (hasDistanceA && !hasDistanceB) {
            return -1;
          }

          if (!hasDistanceA && hasDistanceB) {
            return 1;
          }
        }

        return b.rating - a.rating;
      });
  }, [distanceByWineryId, hasDistanceSort, minRating, outsideFood, query]);

  const averageRating = useMemo(() => {
    const total = wineries.reduce((sum, winery) => sum + winery.rating, 0);
    return total / wineries.length;
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-panel overflow-hidden rounded-3xl border border-brand-100/90">
        <div className="bg-gradient-to-r from-brand-700 via-brand-500 to-olive-600 px-6 py-8 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Date Night Concierge
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Plan a night that feels effortless, playful, and a little luxurious.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
            Discover winery spots that fit your vibe, distance, and quality bar—so you can spend
            less time scrolling and more time making the night memorable.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-white/90">
            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1">
              {wineries.length}+ curated winery picks
            </span>
            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1">
              Avg rating {averageRating.toFixed(1)}★
            </span>
            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1">
              Filters built for date-night planning
            </span>
          </div>
        </div>
      </section>

      <Card
        title="Find your just-right winery"
        description="Answer a few practical questions and we’ll surface places that match the mood."
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {moodPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => setQuery(preset.value)}
              className="rounded-full border border-brand-100 bg-white px-3 py-1 text-xs font-medium text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-700">
            <span className="font-medium">What kind of setting are you craving?</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Atlanta, Augusta, mountain view, terrace..."
              className="field-base"
            />
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-medium">Do you want picnic flexibility?</span>
            <select
              value={outsideFood}
              onChange={(event) =>
                setOutsideFood(event.target.value as 'Any' | 'Allowed' | 'Restricted')
              }
              className="field-base"
            >
              <option>Any</option>
              <option>Allowed</option>
              <option>Restricted</option>
            </select>
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-medium">How polished should the experience be?</span>
            <p className="mt-1 text-xs text-slate-500">{minRating.toFixed(1)} stars and up</p>
            <input
              type="range"
              min={4.0}
              max={5.0}
              step={0.1}
              value={minRating}
              onChange={(event) => setMinRating(Number(event.target.value))}
              className="mt-2 w-full accent-brand-500"
            />
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-medium">Your ZIP code (where your night starts)</span>
            <input
              value={zipCode}
              onChange={(event) => setZipCode(event.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="e.g. 30339"
              inputMode="numeric"
              maxLength={5}
              className="field-base"
            />
            <p className="mt-1 text-xs text-slate-500">
              {zipCode.length === 0
                ? 'Optional, but powerful if you want nearest-first recommendations.'
                : zipCode.length < 5
                  ? 'Great start — add all 5 digits.'
                  : zipLookupStatus === 'loading'
                    ? "Perfect, we're checking distances now..."
                    : zipLookupStatus === 'error'
                      ? "Hmm, that ZIP didn't work. Try another one?"
                      : 'Sorted by distance (nearest first).'}
            </p>
          </label>
        </div>
      </Card>

      <Card
        title="Date-night decision guide"
        description="Use this quick checklist while comparing wineries."
      >
        <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <li>• Do we want to stay close or make it a scenic drive?</li>
          <li>• Are we bringing a charcuterie board or going all in on in-house options?</li>
          <li>• Is this a relaxed afternoon date or a dressed-up evening stop?</li>
          <li>• Are we prioritizing high ratings or a specific region vibe?</li>
        </ul>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((winery) => (
          <Card
            key={winery.id}
            title={winery.name}
            description={`${winery.rating.toFixed(1)} stars`}
          >
            <div className="space-y-2 text-sm text-slate-700">
              {hasDistanceSort && typeof distanceByWineryId[winery.id] === 'number' ? (
                <p>
                  <strong>Distance:</strong> {distanceByWineryId[winery.id].toFixed(1)} miles away
                </p>
              ) : null}
              <p>
                <strong>Address:</strong> {winery.address}
              </p>
              <p>
                <strong>Hours:</strong> {winery.hours}
              </p>
              <p>
                <strong>Outside food:</strong> {winery.outsideFoodPolicy}
                {winery.outsideFoodCost !== 'N/A' ? ` (${winery.outsideFoodCost})` : ''}
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                <a href={`tel:${winery.phone}`} className="link-accent">
                  {winery.phone}
                </a>
              </p>
              <div className="flex gap-4">
                <a href={winery.website} target="_blank" rel="noreferrer" className="link-accent">
                  Website
                </a>
                <a href={winery.maps} target="_blank" rel="noreferrer" className="link-accent">
                  Map
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card title="No matches yet" description="Try broadening your filters.">
          <p className="text-sm text-slate-700">No wineries matched your current search.</p>
        </Card>
      ) : null}

      <Card title="Plan your date route" description="Save favorites and build a date-night plan.">
        <Link to="/dashboard" className="link-accent text-sm">
          Open planner
        </Link>
      </Card>
    </div>
  );
}
