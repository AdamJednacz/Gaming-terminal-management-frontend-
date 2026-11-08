import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import HomeLayout from '../layout/homeLayout/HomeLayout';
import { RoutePath } from '../common/enums/routePath';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import LocationsPage from './LocationsPage';
import TerminalsPage from './TerminalsPage';
import IncidentsPage from './IncidentsPage';
import SettingsPage from './SettingsPage';
import AuthorizationPageLayout from '../layout/authLayout/AuthorizationPageLayout';
import RegisterPage from './RegisterPage';
import ProtectedRoute from '../utils/ProtectedRoute';

export const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute canBeAuthorized={false} canBeUnauthorized={true} />
    ),
    children: [
      {
        element: <AuthorizationPageLayout />,
        children: [
          { path: RoutePath.SIGN_IN, element: <LoginPage /> },
          { path: RoutePath.SIGN_UP, element: <RegisterPage /> },
        ],
      },
    ],
  },

  {
    element: (
      <ProtectedRoute canBeAuthorized={true} canBeUnauthorized={false} />
    ),

    children: [
      {
        path: RoutePath.HOME,
        element: <HomeLayout />,
        children: [
          { path: RoutePath.DASHBOARD, element: <DashboardPage /> },
          { path: RoutePath.LOCATIONS, element: <LocationsPage /> },
          { path: RoutePath.TERMINALS, element: <TerminalsPage /> },
          { path: RoutePath.INCIDENTS, element: <IncidentsPage /> },
          { path: RoutePath.SETTINGS, element: <SettingsPage /> },
        ],
      },
    ],
  },

  {
    path: RoutePath.NOT_FOUND,
    element: <p>Not Found</p>,
  },
];

export const router = createBrowserRouter(routes);
