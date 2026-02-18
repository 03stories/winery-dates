import { Link } from 'react-router-dom';

export function NotFoundPage(): JSX.Element {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
      <h1 className="text-xl font-semibold text-amber-900">404: Page not found</h1>
      <p className="mt-2 text-sm text-amber-800">Check the URL or return to the home page.</p>
      <Link to="/" className="mt-4 inline-block text-sm font-medium text-amber-900 underline">
        Go home
      </Link>
    </div>
  );
}
