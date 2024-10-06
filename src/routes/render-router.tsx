import { FC, useMemo } from "react";

import { Navigate, useRoutes } from "react-router-dom";

import { useNavigationMenu } from "./navigation";
import PrivateRoute from "./private-route";
import { LOGIN_PATH } from "@/features/auth";
import LayoutComponent from "@/layout";
import { LoginPage, NotFoundPage } from "@/pages";

const RenderRouter: FC = () => {
  const { routeList } = useNavigationMenu();

  const routes = useMemo(
    () => [
      {
        path: LOGIN_PATH,
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <LayoutComponent />,
        children: [
          {
            path: "",
            element: <Navigate to="dashboard" />,
          },
          ...routeList,
          {
            path: "*",
            element: (
              <PrivateRoute>
                <NotFoundPage />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
    [routeList],
  );

  const element = useRoutes(routes);

  return element;
};

export default RenderRouter;
