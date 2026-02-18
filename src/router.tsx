import { createBrowserRouter } from 'react-router-dom';
import { appConfig } from '@/config/env';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardOverviewPage } from '@/pages/DashboardOverviewPage';
import { DashboardSettingsPage } from '@/pages/DashboardSettingsPage';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const routerBaseName = appConfig.basePath === '/' ? '/' : appConfig.basePath.replace(/\/$/, '');

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'dashboard',
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardOverviewPage /> },
            { path: 'settings', element: <DashboardSettingsPage /> }
          ]
        },
        { path: '*', element: <NotFoundPage /> }
      ]
    }
  ],
  { basename: routerBaseName }
);
