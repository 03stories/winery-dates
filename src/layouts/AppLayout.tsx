import { Link, NavLink, Outlet } from 'react-router-dom';
import { appConfig } from '@/config/env';

export function AppLayout(): JSX.Element {
  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-30 border-b border-brand-100/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="squircle px-3 py-2 text-lg font-bold text-brand-700 transition hover:bg-brand-50"
          >
            Winery Dates
          </Link>
          <nav className="flex items-center gap-2 rounded-2xl border border-brand-100/80 bg-white/70 p-1 text-sm font-medium shadow-[var(--shadow-soft)]">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-3 py-1.5 transition ${isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:text-brand-700'}`
              }
            >
              Directory
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `rounded-xl px-3 py-1.5 transition ${isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:text-brand-700'}`
              }
            >
              Planner
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-brand-100/70 bg-white/75 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500 sm:px-6">
          Winery Dates • Base path: <code>{appConfig.basePath}</code>
        </div>
      </footer>
    </div>
  );
}
