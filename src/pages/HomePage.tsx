import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { wineries } from '@/data/wineries';

export function HomePage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(4.5);
  const [outsideFood, setOutsideFood] = useState<'Any' | 'Allowed' | 'Restricted'>('Any');

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
      .sort((a, b) => b.rating - a.rating);
  }, [minRating, outsideFood, query]);

  return (
    <div className="space-y-5">
      <Card
        title="Find a winery for date night"
        description="Georgia winery directory with real details, ratings, and outside-food policies."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm text-slate-700">
            Search
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, city, or address"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm text-slate-700">
            Outside food
            <select
              value={outsideFood}
              onChange={(event) =>
                setOutsideFood(event.target.value as 'Any' | 'Allowed' | 'Restricted')
              }
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option>Any</option>
              <option>Allowed</option>
              <option>Restricted</option>
            </select>
          </label>
          <label className="text-sm text-slate-700">
            Minimum rating ({minRating.toFixed(1)}+)
            <input
              type="range"
              min={4.0}
              max={5.0}
              step={0.1}
              value={minRating}
              onChange={(event) => setMinRating(Number(event.target.value))}
              className="mt-2 w-full"
            />
          </label>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((winery) => (
          <Card
            key={winery.id}
            title={winery.name}
            description={`${winery.rating.toFixed(1)} stars`}
          >
            <div className="space-y-2 text-sm text-slate-700">
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
                <strong>Phone:</strong> <a href={`tel:${winery.phone}`}>{winery.phone}</a>
              </p>
              <div className="flex gap-3">
                <a
                  href={winery.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-700"
                >
                  Website
                </a>
                <a href={winery.maps} target="_blank" rel="noreferrer" className="text-brand-700">
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
        <Link to="/dashboard" className="text-sm font-semibold text-brand-700">
          Open planner
        </Link>
      </Card>
    </div>
  );
}
