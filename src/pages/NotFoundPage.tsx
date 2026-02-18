import { Link } from 'react-router-dom';

export function NotFoundPage(): JSX.Element {
  return (
    <div className="squircle border border-brand-100 bg-brand-50/85 p-6 shadow-[var(--shadow-soft)]">
      <h1 className="text-xl font-semibold text-brand-700">404: Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">Check the URL or return to the home page.</p>
      <Link to="/" className="link-accent mt-4 inline-block text-sm">
        Go home
      </Link>
    </div>
  );
}
