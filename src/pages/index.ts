import { lazy } from "react";

export const DashboardPage = lazy(() => import("./dashboard"));
export const LoginPage = lazy(() => import("./login"));
export const NotFoundPage = lazy(() => import("./not-found"));

// User
export const UsersPage = lazy(() => import("./users"));
