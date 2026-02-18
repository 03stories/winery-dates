import { Link, NavLink, Outlet } from 'react-router-dom';
import { appConfig } from '@/config/env';

export function AppLayout(): JSX.Element {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-lg font-bold text-brand-700">
            Web App Template
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'text-brand-700' : 'text-slate-600')}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'text-brand-700' : 'text-slate-600')}
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500 sm:px-6">
          Base path: <code>{appConfig.basePath}</code>
        </div>
      </footer>
    </div>
  );
}
