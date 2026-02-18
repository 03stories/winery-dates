import { NavLink, Outlet } from 'react-router-dom';

export function DashboardLayout(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Nested routes live under <code>/dashboard</code>.
        </p>
      </div>
      <div className="flex gap-3 border-b border-slate-200 pb-3 text-sm font-medium">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => (isActive ? 'text-brand-700' : 'text-slate-600')}
        >
          Overview
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) => (isActive ? 'text-brand-700' : 'text-slate-600')}
        >
          Settings
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
