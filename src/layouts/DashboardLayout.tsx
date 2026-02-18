import { NavLink, Outlet } from 'react-router-dom';

export function DashboardLayout(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Date Planner</h1>
        <p className="mt-1 text-sm text-slate-600">Save favorites and plan your winery route.</p>
      </div>
      <div className="squircle flex gap-2 border border-brand-100/80 bg-white/75 p-2 text-sm font-medium shadow-[var(--shadow-soft)] backdrop-blur-sm">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `rounded-xl px-3 py-1.5 transition ${isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:text-brand-700'}`
          }
        >
          Saved Wineries
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `rounded-xl px-3 py-1.5 transition ${isActive ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:text-brand-700'}`
          }
        >
          Preferences
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
