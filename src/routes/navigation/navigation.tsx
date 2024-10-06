import { useMemo } from "react";

import { cloneDeep } from "lodash";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

import { TNavigationMenu, TypeRoutes } from "./types";
import { CUSTOMER_NAME, CUSTOMERS_PATH } from "@/features/customer";
import {
  CreateCustomerPage,
  CustomerDetailsPage,
  CustomersPage,
  DashboardPage,
} from "@/pages";
import PrivateRoute from "@/routes/private-route";
import { capitalizeFirstLetter } from "@/utils";

const navigationMenus: TNavigationMenu[] = [
  {
    key: "/dashboard",
    label: "Dashboard",
    element: <DashboardPage />,
    icon: <MdDashboard size={18} />,
  },
  {
    key: CUSTOMERS_PATH,
    label: `Danh sách ${CUSTOMER_NAME}`,
    element: <CustomersPage />,
    icon: <FaUser size={18} />,
    children: [
      {
        key: "/:id",
        element: <CustomerDetailsPage />,
      },
      {
        key: "/create",
        element: <CreateCustomerPage />,
      },
    ],
  },
];

const getRoutes = (arr: TypeRoutes[], nav: TNavigationMenu, basePath = "") => {
  if (nav.children) {
    for (const n of nav.children) {
      getRoutes(arr, n, basePath + nav.key);
    }
  }
  if (!nav.element) return;

  arr.push({
    path: basePath + nav.key,
    element: nav.element && <PrivateRoute>{nav.element}</PrivateRoute>,
  });
  return arr;
};

const addLink = (nav: TNavigationMenu, path: string) => {
  return nav.children ? (
    capitalizeFirstLetter(nav.label!)
  ) : (
    <Link to={path}>{capitalizeFirstLetter(nav.label!)}</Link>
  );
};

const getShowNavigation = (
  nav: TNavigationMenu,
  basePath = "",
): TNavigationMenu | undefined => {
  const cloneNav = cloneDeep(nav);
  if (!nav.label) return;
  if (nav.children) {
    const arr: TNavigationMenu[] = [];
    for (const n of nav.children) {
      const formatN = getShowNavigation(n, basePath + nav.key);
      if (formatN) arr.push(formatN);
    }

    cloneNav.children = arr.length > 0 ? arr : undefined;
    if (!(cloneNav.children || cloneNav.element)) return;
  }

  const searchParams = cloneNav.defaultSearchParams
    ? "?" + new URLSearchParams(cloneNav.defaultSearchParams).toString()
    : "";

  return {
    key: basePath + cloneNav.key,
    icon: cloneNav.icon,
    title: capitalizeFirstLetter(cloneNav.label!),
    label: addLink(cloneNav, basePath + cloneNav.key + searchParams),
    children: cloneNav.children,
    element: cloneNav.element,
  };
};

export const useNavigationMenu = () => {
  return useMemo(() => {
    const menuList: TNavigationMenu[] = [];
    const routeList: TypeRoutes[] = [];

    for (const nav of navigationMenus) {
      const nav1 = cloneDeep(nav);
      const n = getShowNavigation(nav1, undefined);
      n && menuList.push(n);

      const nav2 = cloneDeep(nav);
      getRoutes(routeList, nav2);
    }
    return { menuList, routeList };
  }, []);
};
