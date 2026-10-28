import type { JSX } from "react/jsx-runtime";
import { RoutePath } from "../../common/enums";
import { iconSharedProps } from "../../utils/styles-config";
import {
  LayoutDashboard,
  MapPin,
  Monitor,
  Settings,
  TriangleAlert,
  type LucideProps,
} from "lucide-react";

export type HomeLayoutMenuItemType = {
  key: number;
  icon: JSX.Element;
  label: string;
  path: RoutePath;
};

const getActiveKey = (pathName: string) => {
  const segments = pathName.split("/").filter(Boolean);
  const section = segments[2] ?? segments[segments.length - 1];
  switch (section) {
    case RoutePath.DASHBOARD:
      return 1;
    case RoutePath.TERMINALS:
      return 2;
    case RoutePath.LOCATIONS:
      return 3;
    case RoutePath.INCIDENTS:
      return 4;
    case RoutePath.SETTINGS:
      return 5;
    default:
      return 6;
  }
};

const getItems = (): HomeLayoutMenuItemType[] => {
  const sharedProps: LucideProps = {
    ...iconSharedProps,
  };
  return [
    {
      key: 1,
      icon: <LayoutDashboard {...sharedProps} />,
      label: "Dashboard",
      path: RoutePath.DASHBOARD,
    },
    {
      key: 2,
      icon: <Monitor {...sharedProps} />,
      label: "Terminals",
      path: RoutePath.TERMINALS,
    },
    {
      key: 3,
      icon: <MapPin {...sharedProps} />,
      label: "Locations",
      path: RoutePath.LOCATIONS,
    },
    {
      key: 4,
      icon: <TriangleAlert {...sharedProps} />,
      label: "Incidents",
      path: RoutePath.INCIDENTS,
    },
    {
      key: 5,
      icon: <Settings {...sharedProps} />,
      label: "Settings",
      path: RoutePath.SETTINGS,
    },
  ];
};

export const HomeLayoutConfig = {
  getActiveKey,
  getItems,
};
