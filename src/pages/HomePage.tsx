import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { wineries } from '@/data/wineries';
import { calculateDistanceMiles, extractUsZipCode, getZipCoordinatesForUsZip } from '@/utils/geo';

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

  return (
    <div className="space-y-6">
      <Card
        title="Find a winery for date night"
        description="Tell us your vibe and we'll help you discover a perfect Georgia wine stop."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-700">
            <span className="font-medium">I'm in the mood for a place around</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Dahlonega, Atlanta, terrace, etc."
              className="field-base"
            />
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-medium">Please show wineries where outside food is</span>
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
            <span className="font-medium">Keep the quality at least</span>
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
            <span className="font-medium">Your ZIP code (where you're starting)</span>
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
                ? 'Optional, but helpful if you want nearest-first recommendations.'
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
