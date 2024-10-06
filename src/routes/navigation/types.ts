import { ReactElement } from "react";

type TNavigationChild = {
  key: string;
  icon?: ReactElement;
  title?: string | ReactElement;
  label?: string | ReactElement;
  element?: ReactElement;
  defaultSearchParams?: Record<string, string>;
};

export type TNavigationMenu = TNavigationChild & {
  children?: TNavigationMenu[];
};

type RouteChild = {
  path: string;
  element: ReactElement;
};

export type TypeRoutes = RouteChild & {
  children?: RouteChild[];
};
