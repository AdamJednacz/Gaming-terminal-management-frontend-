import { createBrowserRouter, type RouteObject } from "react-router-dom";

import { RoutePath } from "../common/enums";
import HomeLayout from "../layout/homeLayout/HomeLayout";

export const routes: RouteObject[] = [
  {
    path: RoutePath.HOME,
    element: <HomeLayout />,
    children: [
      { path: RoutePath.DASHBOARD, element: <p>Dashboard</p> },
      { path: RoutePath.LOCATIONS, element: <p>Locations</p> },
      { path: RoutePath.TERMINALS, element: <p>Terminals</p> },
      { path: RoutePath.INCIDENTS, element: <p>Incidents</p> },
      { path: RoutePath.SETTINGS, element: <p>Settings</p> },
    ],
  },

  {
    path: RoutePath.NOT_FOUND,
    element: <p>Not Found</p>,
  },
];

export const router = createBrowserRouter(routes);
